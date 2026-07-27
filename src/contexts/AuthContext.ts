import { createContext, createElement, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type AuthContextValue = {
  token: string | null;
  currentUserId: string | null;
  isLoggedIn: boolean;
  login: (nextToken: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const decodeTokenPayload = (token: string): Record<string, unknown> | null => {
  try {
    const [, payload] = token.split('.');

    if (!payload) {
      return null;
    }

    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
    const paddedPayload = normalizedPayload.padEnd(Math.ceil(normalizedPayload.length / 4) * 4, '=');
    const decodedPayload = atob(paddedPayload);

    return JSON.parse(decodedPayload) as Record<string, unknown>;
  } catch {
    return null;
  }
};

const getCurrentUserIdFromToken = (token: string | null): string | null => {
  if (!token) {
    return null;
  }

  const payload = decodeTokenPayload(token);
  const candidateUserId = payload?.userId ?? payload?.user_id ?? payload?.id ?? payload?.sub;

  if (typeof candidateUserId === 'string' || typeof candidateUserId === 'number') {
    return String(candidateUserId);
  }

  return null;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const currentUserId = getCurrentUserIdFromToken(token);

  const login = (nextToken: string) => {
    localStorage.setItem('token', nextToken);
    setToken(nextToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const value = useMemo(
    () => ({
      token,
      currentUserId,
      isLoggedIn: Boolean(token),
      login,
      logout,
    }),
    [currentUserId, token],
  );

  return createElement(AuthContext.Provider, { value }, children);
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
