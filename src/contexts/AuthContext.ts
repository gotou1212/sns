import { createContext, createElement, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type AuthContextValue = {
  token: string | null;
  isLoggedIn: boolean;
  login: (nextToken: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

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
      isLoggedIn: Boolean(token),
      login,
      logout,
    }),
    [token],
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
