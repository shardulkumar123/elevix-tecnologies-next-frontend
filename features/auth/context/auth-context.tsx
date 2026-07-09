"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { LOCAL_STORAGE_KEYS } from "@/constants";

import { DecodedUser, decodeToken, isTokenExpired } from "../utils/jwt";

interface AuthContextType {
  user: DecodedUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<DecodedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const logout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
    setToken(null);
    setUser(null);
    setIsLoading(false);
    router.push("/admin/login");
  }, [router]);

  const login = useCallback((newToken: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.token, newToken);
    setToken(newToken);
    const decoded = decodeToken(newToken);
    setUser(decoded);
    setIsLoading(false);
  }, []);

  // Initialize auth state from localStorage on load
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem(LOCAL_STORAGE_KEYS.token);
        if (storedToken) {
          if (isTokenExpired(storedToken)) {
            console.warn("Stored token is expired. Logging out.");
            logout();
          } else {
            setToken(storedToken);
            const decoded = decodeToken(storedToken);
            setUser(decoded);
          }
        }
      } catch (e) {
        console.error("Failed to initialize auth state:", e);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [logout]);

  // Periodic token expiration check
  useEffect(() => {
    if (!token) return;

    const checkExpiration = () => {
      if (isTokenExpired(token)) {
        logout();
      }
    };

    const interval = setInterval(checkExpiration, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [token, logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
