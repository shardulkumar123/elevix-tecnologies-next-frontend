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

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
