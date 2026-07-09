export interface DecodedUser {
  id: string;
  email: string;
  role: "ADMIN" | "EDITOR";
  exp?: number;
}

export function decodeToken(token: string): DecodedUser | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    const parsed = JSON.parse(jsonPayload);

    // Support standard NestJS JWT structure (sub is userId)
    return {
      id: parsed.sub || parsed.id || "",
      email: parsed.email || "",
      role: parsed.role || "EDITOR",
      exp: parsed.exp,
    };
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;

  // Current time in seconds
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
}
