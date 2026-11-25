import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { seats } = await req.json();
    return NextResponse.json({
      success: true,
      checkoutUrl: `https://buy.polar.sh/polar_cl_WjojARrFH6Q6aicLCwGmMLFXDLa7yWAy0KPwn3pClmY?seats=${seats || 5}`
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
