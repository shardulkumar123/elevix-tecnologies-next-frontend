import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  const { pathname } = request.nextUrl;

  // Handle admin subdomain routing
  if (host?.startsWith("admin.")) {
    return NextResponse.rewrite(new URL("/admin", request.url));
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

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
