import { NextResponse } from 'next/server';

// Security headers for every page and API response.
// If you add a new third-party script (e.g. analytics), add its domain
// to script-src / connect-src below or the browser will block it.
const RAZORPAY = 'https://*.razorpay.com';

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${RAZORPAY}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self' ${RAZORPAY}`,
  `frame-src ${RAZORPAY}`,
  `form-action 'self' ${RAZORPAY}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

export function middleware() {
  const res = NextResponse.next();
  res.headers.set('Content-Security-Policy', csp);
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.headers.set(
    'Permissions-Policy',
    `camera=(), microphone=(), geolocation=(), payment=(self "${'https://api.razorpay.com'}" "${'https://checkout.razorpay.com'}")`
  );
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|fonts/).*)'],
};
