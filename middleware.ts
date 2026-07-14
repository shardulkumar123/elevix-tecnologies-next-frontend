import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isComingSoon = process.env.NEXT_PUBLIC_COMING_SOON === "true";

  if (isComingSoon) {
    const { pathname } = request.nextUrl;

    // Allow requests to:
    // - /coming-soon
    // - static files inside _next (CSS, JS, media)
    // - API routes
    // - static assets with extensions (like favicon.ico, logo, images)
    if (
      pathname.startsWith("/coming-soon") ||
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api") ||
      pathname.includes(".")
    ) {
      return NextResponse.next();
    }

    // Redirect everything else to /coming-soon
    return NextResponse.redirect(new URL("/coming-soon", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
