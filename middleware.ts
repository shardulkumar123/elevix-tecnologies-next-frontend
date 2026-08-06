import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  const { pathname } = request.nextUrl;

  const isAdminSubdomain = host?.startsWith("admin.");

  // Handle admin subdomain routing
  if (isAdminSubdomain) {
    if (pathname.startsWith("/admin")) {
      // If URL is admin.domain.com/admin/login, strip extra /admin to prevent /admin/admin/login
      const newPath = pathname.replace(/^\/admin/, "") || "/";
      return NextResponse.rewrite(new URL(`/admin${newPath}`, request.url));
    }
    return NextResponse.rewrite(new URL(`/admin${pathname === "/" ? "" : pathname}`, request.url));
  }

  // Handle maintenance mode check
  const maintenanceModeCookie = request.cookies.get("elevix_maintenance_mode")?.value;
  const isMaintenanceActive = maintenanceModeCookie === "true";

  const isAdminRoute = pathname.startsWith("/admin");
  const isMaintenanceRoute = pathname === "/maintenance";

  if (isMaintenanceActive && !isAdminRoute && !isMaintenanceRoute) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  if (!isMaintenanceActive && isMaintenanceRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV !== "production";

  // Strict CSP removing 'unsafe-inline' & 'unsafe-eval' from script-src in production
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${isDev ? "'unsafe-eval'" : ""};
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob: https:;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    connect-src 'self' https: wss:;
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|static|images|favicon.ico|.*\\..*).*)"],
};
