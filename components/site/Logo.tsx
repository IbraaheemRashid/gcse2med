import Link from "next/link";

/**
 * Wordmark placeholder. TODO(client): replace with the supplied logo asset —
 * the "2" is set in accent yellow so the mark reads at small sizes until then.
 */
export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      href="/"
      className="inline-flex items-baseline text-xl font-extrabold tracking-tight"
      aria-label="GCSE2MED home"
    >
      <span className={inverse ? "text-white" : "text-brand-700"}>GCSE</span>
      <span className={inverse ? "text-accent-300" : "text-accent-500"}>2</span>
      <span className={inverse ? "text-white" : "text-brand-700"}>MED</span>
    </Link>
  );
}
