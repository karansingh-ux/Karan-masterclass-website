import { NextResponse } from 'next/server';
import { workshopConfig } from '../../../config/workshopConfig';
import { isSameOrigin } from '../../../lib/security';

export const runtime = 'edge';

async function hmacSha256Hex(secret: string, payload: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sigBuffer = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
  return Array.from(new Uint8Array(sigBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function timingSafeEqualStr(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function POST(request: Request) {
  try {
    if (!isSameOrigin(request)) {
      return NextResponse.json({ verified: false, error: 'Forbidden.' }, { status: 403 });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();
    if (!keySecret) {
      return NextResponse.json(
        { verified: false, error: 'Razorpay secret key is not configured.' },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body as {
      razorpay_order_id?: string;
      razorpay_payment_id?: string;
      razorpay_signature?: string;
    };

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { verified: false, error: 'Missing required payment verification fields.' },
        { status: 400 }
      );
    }

    const expectedSignature = await hmacSha256Hex(
      keySecret,
      `${razorpay_order_id}|${razorpay_payment_id}`
    );

    if (!timingSafeEqualStr(expectedSignature, razorpay_signature)) {
      return NextResponse.json(
        { verified: false, error: 'Invalid payment signature.' },
        { status: 400 }
      );
    }

    // Signature is valid. Also confirm with Razorpay that this order was for
    // the full workshop price and is actually paid.
    const keyId = process.env.RAZORPAY_KEY_ID?.trim();
    if (keyId) {
      const orderRes = await fetch(
        `https://api.razorpay.com/v1/orders/${encodeURIComponent(razorpay_order_id)}`,
        { headers: { Authorization: `Basic ${btoa(`${keyId}:${keySecret}`)}` } }
      );
      const order = await orderRes.json().catch(() => ({}));
      const expected = Math.round(workshopConfig.price.amount * 100);
      if (
        !orderRes.ok ||
        order?.amount !== expected ||
        order?.currency !== 'INR' ||
        Number(order?.amount_paid) < expected
      ) {
        return NextResponse.json(
          { verified: false, error: 'Payment could not be confirmed. If money was deducted, please email us.' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({
      verified: true,
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
    });
  } catch {
    return NextResponse.json(
      { verified: false, error: 'Payment verification failed.' },
      { status: 500 }
    );
  }
}
