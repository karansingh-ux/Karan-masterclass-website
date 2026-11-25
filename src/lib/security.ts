// Only accept API calls made from this site's own pages.
// Browsers always send an Origin header on POST requests, so a request
// from another website (or a missing/foreign Origin) is rejected.
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}
