"use client";

import { Button } from "@/components/ui/Button";
import { useBooking } from "./BookingProvider";
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof Button>, "onClick" | "children"> & {
  /** Where on the page this button lives — recorded with the funnel event. */
  source: string;
  children?: React.ReactNode;
};

export function BookButton({ source, children, ...rest }: Props) {
  const booking = useBooking();
  return (
    <Button onClick={() => booking.open(source)} {...rest}>
      {children ?? "Book a free consultation"}
    </Button>
  );
}
