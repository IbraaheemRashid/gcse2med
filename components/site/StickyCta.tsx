"use client";

import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";

/**
 * A persistent call to action on small screens only.
 *
 * The sticky header keeps booking reachable on every breakpoint, but the
 * primary action is the free assessment, and on a phone that button is a long
 * way up the page by the time anyone has read enough to want it.
 *
 * Hidden where it would compete with the page's own job: on the assessment
 * flow itself, and on /book and /contact, where the visitor is already doing
 * the thing this would send them to.
 */
const HIDDEN_ON = ["/assessment", "/book", "/contact"];

export function StickyCta() {
  const pathname = usePathname();
  if (HIDDEN_ON.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return null;
  }

  return (
    <div
      /* pb keeps it clear of the iOS home indicator; the wrapper is
         pointer-events-none so the strip either side of the bar does not
         swallow taps on the page beneath it. */
      className="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
    >
      <div className="pointer-events-auto mx-auto flex max-w-md items-center gap-3 rounded-full border border-ink-200 bg-white/95 p-1.5 pl-4 shadow-lift backdrop-blur">
        <p className="min-w-0 flex-1 text-[13px] font-semibold leading-tight text-ink-800">
          Find out where your child stands
        </p>
        <ButtonLink href="/assessment" size="sm" className="shrink-0">
          Free assessment
        </ButtonLink>
      </div>
    </div>
  );
}
