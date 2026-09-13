import Link from "next/link";
import { Container } from "@/components/ui/Layout";
import { footerNav, site } from "@/content/site";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    /* pb on small screens clears the fixed StickyCta bar, which would otherwise
       sit over the legal line at the very bottom of the page. */
    <footer className="mt-auto border-t border-ink-200 bg-ink-50 pb-20 lg:pb-0">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-600">
              {site.strapline}
            </p>
            <p className="mt-4 text-sm text-ink-600">
              <a href={`mailto:${site.email}`} className="hover:text-brand-700 hover:underline">
                {site.email}
              </a>
              {site.phone ? (
                <>
                  <br />
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-brand-700 hover:underline">
                    {site.phone}
                  </a>
                </>
              ) : null}
            </p>
          </div>

          {Object.entries(footerNav).map(([heading, links]) => (
            <div key={heading}>
              <h2 className="text-sm font-semibold text-ink-900">{heading}</h2>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-600 hover:text-brand-700 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-200 pt-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.legalName}. All rights reserved.
          </p>
          <p>
            Tuition is delivered online in small groups. Grade guarantee subject to{" "}
            <Link href="/guarantee-terms" className="underline hover:text-brand-700">
              terms and conditions
            </Link>
            .
          </p>
        </div>
      </Container>
    </footer>
  );
}
