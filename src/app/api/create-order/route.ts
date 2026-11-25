import { NextResponse } from 'next/server';
import { workshopConfig } from '../../../config/workshopConfig';
import { isSameOrigin } from '../../../lib/security';

export const runtime = 'edge';

// The price is decided here on the server, never by the browser.
// Anything the browser sends (amount, currency) is ignored.
const PRICE_PAISE = Math.round(workshopConfig.price.amount * 100);
const CURRENCY = 'INR';

export async function POST(request: Request) {
  try {
    if (!isSameOrigin(request)) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID?.trim();
    const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: 'Payments are temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    const receipt = `ws_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`;

    const res = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${keyId}:${keySecret}`)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: PRICE_PAISE,
        currency: CURRENCY,
        receipt,
        notes: { product: workshopConfig.title },
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data?.id) {
      console.error('Razorpay order creation failed', res.status, data?.error?.code);
      return NextResponse.json(
        { error: 'Could not start payment. Please try again.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      order_id: data.id,
      key_id: keyId,
      amount: data.amount,
      currency: data.currency,
    });
  } catch {
    return NextResponse.json(
      { error: 'Could not start payment. Please try again.' },
      { status: 500 }
    );
  }
}
