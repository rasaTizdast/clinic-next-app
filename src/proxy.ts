import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (process.env.NODE_ENV !== "development" || !request.headers.get("origin")) {
    return NextResponse.next();
  }

  const backendOrigin = (process.env.SITE_API_PROXY_TARGET ?? "http://localhost:8000").replace(/\/$/, "");
  const headers = new Headers(request.headers);
  headers.set("origin", backendOrigin);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: "/api/:path*",
};
