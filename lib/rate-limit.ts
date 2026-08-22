import "server-only";

/**
 * Small in-memory sliding-window limiter for the public POST routes.
 *
 * Deliberately not distributed: on serverless each instance keeps its own
 * counters, so this raises the cost of casual abuse rather than guaranteeing a
 * global limit. Combined with Turnstile that is the right trade-off at this
 * traffic level — swap in Upstash Redis if the site ever needs a hard cap.
 */
type Bucket = { hits: number[]; };

const buckets = new Map<string, Bucket>();
const MAX_KEYS = 5_000;

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { hits: [] };

  bucket.hits = bucket.hits.filter((hit) => now - hit < windowMs);

  if (bucket.hits.length >= limit) {
    const oldest = bucket.hits[0];
    buckets.set(key, bucket);
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000)),
    };
  }

  bucket.hits.push(now);
  buckets.set(key, bucket);

  // Crude bound on memory: drop the oldest keys once the map gets large.
  if (buckets.size > MAX_KEYS) {
    const excess = buckets.size - MAX_KEYS;
    let removed = 0;
    for (const existing of buckets.keys()) {
      if (removed >= excess) break;
      buckets.delete(existing);
      removed += 1;
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

/** Best-effort client IP from the proxy headers Vercel sets. */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
