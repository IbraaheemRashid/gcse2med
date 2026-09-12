"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { bookingUrl, site } from "@/content/site";
import { Button, ButtonLink } from "@/components/ui/Button";

type BookingContextValue = {
  open: (source?: string) => void;
  close: () => void;
  isOpen: boolean;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking(): BookingContextValue {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used inside <BookingProvider>");
  }
  return context;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const open = useCallback((source = "unknown") => {
    lastFocused.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
    // Fire-and-forget funnel event; harmless when analytics is not loaded.
    window.dispatchEvent(
      new CustomEvent("gcse2med:booking-open", { detail: { source } }),
    );
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    lastFocused.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    closeRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }
      // Keep tabbing inside the dialog.
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  return (
    <BookingContext.Provider value={{ open, close, isOpen }}>
      {children}
      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink-900/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-dialog-title"
            className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-lift sm:rounded-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-ink-200 px-6 py-4">
              <div>
                <h2 id="booking-dialog-title" className="text-lg font-bold">
                  Book your free consultation
                </h2>
                <p className="mt-1 text-sm text-ink-600">
                  About fifteen minutes. No obligation, and no sales script.
                </p>
              </div>
              <Button
                ref={closeRef}
                variant="ghost"
                size="sm"
                onClick={close}
                aria-label="Close booking dialog"
                className="shrink-0"
              >
                Close
              </Button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              {bookingUrl ? (
                <iframe
                  src={bookingUrl}
                  title="Consultation booking calendar"
                  className="h-[70vh] w-full border-0 sm:h-[620px]"
                  loading="lazy"
                />
              ) : (
                <BookingFallback onNavigate={close} />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </BookingContext.Provider>
  );
}

/**
 * Shown when NEXT_PUBLIC_BOOKING_URL is unset. Better an honest route to a
 * human than an iframe pointing at nothing.
 */
function BookingFallback({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="px-6 py-10 text-center">
      <p className="text-base leading-relaxed text-ink-700">
        Online booking is being set up. In the meantime, send us a message and we
        will come back with times that work around your child&apos;s school day.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/contact" onClick={onNavigate}>
          Send a message
        </ButtonLink>
        <Link
          href={`mailto:${site.email}`}
          className="inline-flex items-center px-4 py-2.5 text-[15px] font-semibold leading-6 text-brand-700 hover:underline"
        >
          {site.email}
        </Link>
      </div>
    </div>
  );
}
