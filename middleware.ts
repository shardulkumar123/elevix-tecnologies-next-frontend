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

  const response = NextResponse.next();

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https: wss: http://localhost:* ws://localhost:*; frame-ancestors 'none'; object-src 'none'; upgrade-insecure-requests;"
  );
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|static|images|favicon.ico|.*\\..*).*)"],
};
