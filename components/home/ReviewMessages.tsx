"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Review } from "@/content/reviews";

/**
 * Parent reviews as a message thread, per the client's request that they
 * "pop up on the screen like messages" as the page scrolls.
 *
 * The brief's plan for reviews before Trustpilot exists is screenshots of real
 * messages, so presenting them as messages is the honest shape as well as the
 * requested one — and `Review.screenshot` finally gets rendered here.
 *
 * Every bubble is in the DOM and readable from the first paint; the effect only
 * adds a small entrance. Parking content at opacity 0 behind an observer means
 * a reader who lands mid-page, a crawler, or anyone whose observer never fires
 * sees an empty section.
 */
export function ReviewMessages({ reviews }: { reviews: Review[] }) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bubbles = Array.from(list.querySelectorAll<HTMLElement>("[data-bubble]"));
    bubbles.forEach((el) => el.classList.add("translate-y-3", "opacity-0"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("translate-y-3", "opacity-0");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" },
    );
    bubbles.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reviews]);

  return (
    <ul ref={listRef} className="mx-auto mt-12 flex max-w-xl flex-col gap-5">
      {reviews.map((review, index) => (
        <li
          key={review.id}
          data-bubble
          className={`flex transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
            index % 2 === 0 ? "justify-start" : "justify-end"
          }`}
          style={{ transitionDelay: `${Math.min(index, 4) * 60}ms` }}
        >
          <div className="max-w-[85%] sm:max-w-[78%]">
            <div
              className={`rounded-2xl px-4 py-3 shadow-card ${
                index % 2 === 0
                  ? "rounded-bl-sm bg-white ring-1 ring-inset ring-ink-200"
                  : "rounded-br-sm bg-brand-600 text-white"
              }`}
            >
              {review.rating ? (
                <p
                  className={index % 2 === 0 ? "text-accent-500" : "text-accent-300"}
                  aria-label={`${review.rating} out of 5`}
                >
                  <span aria-hidden="true">{"★".repeat(review.rating)}</span>
                </p>
              ) : null}

              <blockquote
                className={`text-[15px] leading-relaxed ${
                  review.rating ? "mt-1.5" : ""
                } ${index % 2 === 0 ? "text-ink-700" : "text-white"}`}
              >
                {review.quote}
              </blockquote>

              {review.screenshot ? (
                <div className="mt-3 overflow-hidden rounded-lg ring-1 ring-inset ring-ink-900/10">
                  <Image
                    src={review.screenshot}
                    alt={`The original message from ${review.author}`}
                    width={800}
                    height={600}
                    sizes="(min-width: 640px) 28rem, 85vw"
                    className="h-auto w-full"
                  />
                </div>
              ) : null}
            </div>

            <p
              className={`mt-1.5 text-xs text-ink-500 ${
                index % 2 === 0 ? "text-left" : "text-right"
              }`}
            >
              {review.author} &middot; {review.relation}
              {review.subject ? ` · ${review.subject}` : ""}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
