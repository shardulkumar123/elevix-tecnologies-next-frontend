import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  const { pathname } = request.nextUrl;

  const isAdminSubdomain = host?.startsWith("admin.");

  // Handle admin subdomain routing
  if (isAdminSubdomain) {
    let targetPath = `/admin${pathname === "/" ? "" : pathname}`;
    if (pathname.startsWith("/admin")) {
      const newPath = pathname.replace(/^\/admin/, "") || "/";
      targetPath = `/admin${newPath === "/" ? "" : newPath}`;
    }

    const response = NextResponse.rewrite(new URL(targetPath, request.url));
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    return response;
  }

  // Handle maintenance mode check (applies only to root landing page /)
  const maintenanceModeCookie = request.cookies.get("elevix_maintenance_mode")?.value;
  const isMaintenanceActive = maintenanceModeCookie === "true";

  const isLandingPage = pathname === "/";
  const isMaintenanceRoute = pathname === "/maintenance";

  if (isMaintenanceActive && isLandingPage) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  if (!isMaintenanceActive && isMaintenanceRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV !== "production";

  // Content Security Policy
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob: https:;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    connect-src 'self' https: wss: http: ws:;
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
