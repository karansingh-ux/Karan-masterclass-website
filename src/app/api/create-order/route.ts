import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID?.trim();
    const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: 'Razorpay credentials are not configured on the server.' },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const amount = Number(body.amount);
    const currency =
      typeof body.currency === 'string' && body.currency.trim()
        ? body.currency.trim()
        : 'INR';
    const receipt =
      typeof body.receipt === 'string' && body.receipt.trim()
        ? body.receipt.trim()
        : `receipt_${Date.now()}`;

    if (!Number.isFinite(amount) || amount < 100) {
      return NextResponse.json(
        { error: 'Amount must be at least 100 paise (₹1).' },
        { status: 400 }
      );
    }

    const authHeader = `Basic ${btoa(`${keyId}:${keySecret}`)}`;
    const res = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount),
        currency,
        receipt,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.status === 401) {
      return NextResponse.json(
        { error: 'Razorpay authentication failed.' },
        { status: 401 }
      );
    }

    if (!res.ok || !data?.id) {
      return NextResponse.json(
        { error: data?.error?.description || 'Failed to create Razorpay order.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      order_id: data.id,
      key_id: keyId,
      amount: data.amount,
      currency: data.currency,
    });
  } catch (err: unknown) {
    const error = err as { message?: string };
    return NextResponse.json(
      { error: error?.message || 'Failed to create Razorpay order.' },
      { status: 500 }
    );
  }
}
