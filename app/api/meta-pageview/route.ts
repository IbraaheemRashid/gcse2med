import type { NextRequest } from "next/server";
import { MARKETING_COOKIE, META_PIXEL_ID } from "@/lib/meta-pixel";

export function GET(request: NextRequest) {
  const headers = new Headers({ "Cache-Control": "private, no-store", Vary: "Cookie" });
  if (request.cookies.get(MARKETING_COOKIE)?.value !== "allow") {
    return new Response(null, { status: 204, headers });
  }

  headers.set("Location", `https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`);
  return new Response(null, { status: 302, headers });
}
