import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    const res = await fetch('https://aiforui.dev/api/customers-count', {
      next: { revalidate: 60 },
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch (e) {
    // fallback
  }
  return NextResponse.json({ count: 2820 });
}
