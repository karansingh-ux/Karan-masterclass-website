import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: 'Razorpay credentials are not configured on the server.' },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const amount = Number(body.amount);
    const currency = typeof body.currency === 'string' && body.currency.trim() ? body.currency.trim() : 'INR';
    const receipt = typeof body.receipt === 'string' && body.receipt.trim()
      ? body.receipt.trim()
      : `receipt_${Date.now()}`;

    if (!Number.isFinite(amount) || amount < 100) {
      return NextResponse.json(
        { error: 'Amount must be at least 100 paise (₹1).' },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(amount),
      currency,
      receipt,
    });

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err: unknown) {
    const error = err as { statusCode?: number; error?: { description?: string }; message?: string };
    if (error?.statusCode === 401) {
      return NextResponse.json(
        { error: 'Razorpay authentication failed.' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: error?.error?.description || error?.message || 'Failed to create Razorpay order.' },
      { status: 500 }
    );
  }
}
