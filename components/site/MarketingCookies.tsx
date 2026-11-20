"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { MARKETING_COOKIE } from "@/lib/meta-pixel";

type Choice = "allow" | "decline";

declare global {
  interface Window {
    fbq?: (command: string, value: string) => void;
  }
}

const choiceEvent = "gcse2med-cookie-choice";
const maxAge = 180 * 24 * 60 * 60;
let initialized = false;
let lastPage: string | null = null;

function readChoice(): Choice | null {
  const value = document.cookie.split("; ").find((item) => item.startsWith(`${MARKETING_COOKIE}=`));
  if (value === `${MARKETING_COOKIE}=allow`) return "allow";
  if (value === `${MARKETING_COOKIE}=decline`) return "decline";
  return null;
}

function subscribe(notify: () => void) {
  window.addEventListener(choiceEvent, notify);
  window.addEventListener("focus", notify);
  window.addEventListener("pageshow", notify);
  return () => {
    window.removeEventListener(choiceEvent, notify);
    window.removeEventListener("focus", notify);
    window.removeEventListener("pageshow", notify);
  };
}

function syncPageView() {
  if (readChoice() !== "allow") {
    if (lastPage !== null) window.fbq?.("consent", "revoke");
    lastPage = null;
    return;
  }

  if (lastPage === window.location.pathname) return;
  if (!initialized) {
    const base = document.getElementById("meta-pixel-base");
    if (!base?.textContent) return;
    const script = document.createElement("script");
    script.textContent = base.textContent;
    document.head.appendChild(script);
    if (!window.fbq) return;
    initialized = true;
  } else {
    if (lastPage === null) window.fbq?.("consent", "grant");
    window.fbq?.("track", "PageView");
  }
  lastPage = window.location.pathname;
}

export function MarketingCookies() {
  const pathname = usePathname();
  const choice = useSyncExternalStore(subscribe, readChoice, () => undefined);
  const [editing, setEditing] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const showChoices = editing || (choice === null && !dismissed);

  useEffect(() => {
    syncPageView();
  }, [choice, pathname]);

  function save(value: Choice) {
    const secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${MARKETING_COOKIE}=${value}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
    syncPageView();
    window.dispatchEvent(new Event(choiceEvent));
    setDismissed(true);
    setEditing(false);
  }

  const buttonStyle = "rounded-lg border border-ink-300 bg-white px-4 py-2 text-sm font-semibold text-ink-900 hover:bg-ink-50";
  return (
    <>
      <button type="button" className="underline hover:text-brand-700" onClick={() => setEditing(true)}>
        Cookie settings
      </button>
      {showChoices && (
        <section
          aria-labelledby="marketing-cookie-title"
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-lg rounded-card border border-ink-200 bg-white p-5 text-left text-ink-900 shadow-lg"
        >
          <h2 id="marketing-cookie-title" className="text-lg font-bold">Optional advertising cookies</h2>
          <p className="mt-2 text-sm leading-relaxed">
            Can we share the pages you visit with Meta (Facebook and Instagram) to see how our ads perform?
            You can use every assessment either way. If you’re under 13, choose “Keep off”.
            {" "}<Link href="/privacy#advertising-cookies" className="underline" onClick={() => { setDismissed(true); setEditing(false); }}>Privacy policy</Link>
          </p>
          {editing && choice && (
            <p className="mt-2 text-sm">Advertising cookies are currently {choice === "allow" ? "on" : "off"}.</p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className={buttonStyle} onClick={() => save("decline")}>
              {choice === "allow" ? "Turn off" : "Keep off"}
            </button>
            <button type="button" className={buttonStyle} onClick={() => save("allow")}>I’m 13 or older and agree</button>
          </div>
        </section>
      )}
    </>
  );
}
