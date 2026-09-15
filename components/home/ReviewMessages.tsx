import type { Review } from "@/content/reviews";

/** A horizontal row keeps the student messages readable without burying pricing. */
export function ReviewMessages({ reviews }: { reviews: Review[] }) {
  return (
    <>
      <p id="review-scroll-hint" className="mt-5 text-sm text-ink-500">Scroll across to read more student messages →</p>
      <div tabIndex={0} role="region" aria-label="Student testimonials" aria-describedby="review-scroll-hint" className="mt-5 overflow-x-auto rounded-2xl pb-5 snap-x snap-mandatory">
        <ul className="flex items-stretch gap-5">
          {reviews.map((review, index) => (
            <li key={review.id} className={`flex w-[86%] shrink-0 snap-start flex-col rounded-2xl border p-6 sm:w-[46%] lg:w-[31.5%] ${index % 2 === 0 ? "border-brand-100 bg-white" : "border-brand-200 bg-brand-50"}`}>
              <div className="mb-4 flex items-center gap-3">
                <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-lg font-semibold text-brand-700">{review.author[0]}</span>
                <div><p className="font-semibold text-brand-950">{review.author}</p><p className="mt-0.5 text-xs text-ink-500">{review.relation}</p></div>
              </div>
              {review.rating ? <p className="mb-3 text-brand-700" aria-label={`${review.rating} out of 5, as stated in this student's message`}><span aria-hidden="true">{"★".repeat(review.rating)}</span></p> : null}
              <blockquote className="grow text-base leading-relaxed text-ink-700">“{review.quote}”</blockquote>
              {review.subject ? <p className="mt-5 border-t border-brand-100 pt-4 text-xs font-semibold text-brand-700">{review.subject}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
