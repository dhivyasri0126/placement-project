import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import type { User, AuthResponse } from '../types/auth';
import { apiClient, setAuthToken, registerAuthCallbacks, unregisterAuthCallbacks } from '../api/client';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (authData: AuthResponse) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Calculates the proactive refresh delay before token expiration.
 *
 * @param expiresInMs Token validity in milliseconds from the backend.
 * @returns Delay in milliseconds before triggering the refresh request.
 *
 * Formula Rationale:
 * - Buffer: min(60,000ms, lifetime * 0.20).
 *   Refreshing 1 minute (or 20% for short tokens) prior to expiry avoids 401 errors
 *   caused by clock skew, in-flight latency, or concurrent requests.
 * - Guard: max(lifetime - buffer, 5,000ms) to ensure non-negative delay and prevent rapid loops.
 */
export const calculateRefreshDelay = (expiresInMs?: number): number => {
  const lifetime = expiresInMs && expiresInMs > 0 ? expiresInMs : 15 * 60 * 1000;
  const buffer = Math.min(60 * 1000, lifetime * 0.2);
  const delay = lifetime - buffer;
  return Math.max(delay, 5000);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // In-memory token strictly stored in React state (mitigates XSS)
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const refreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
      refreshTimeoutRef.current = null;
    }
  }, []);

  const handleAuthFailure = useCallback(() => {
    clearTimer();
    setToken(null);
    setAuthToken(null);
    setUser(null);

    // Clean up any legacy localStorage tokens from older versions
    localStorage.removeItem('careerpilot_token');
    localStorage.removeItem('careerpilot_refresh_token');
    localStorage.removeItem('careerpilot_user');
  }, [clearTimer]);

  const scheduleSilentRefresh = useCallback((expiresInMs?: number) => {
    clearTimer();
    const delay = calculateRefreshDelay(expiresInMs);

    refreshTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await apiClient.post<AuthResponse>('/auth/refresh');
        handleAuthSuccess(response.data);
      } catch {
        handleAuthFailure();
      }
    }, delay);
  }, [clearTimer, handleAuthFailure]);

  const handleAuthSuccess = useCallback((authData: AuthResponse) => {
    const userData: User = {
      id: authData.userId,
      name: authData.name,
      email: authData.email,
      role: authData.role,
    };

    setToken(authData.accessToken);
    setAuthToken(authData.accessToken);
    setUser(userData);

    scheduleSilentRefresh(authData.expiresIn);
  }, [scheduleSilentRefresh]);

  const login = useCallback((authData: AuthResponse) => {
    handleAuthSuccess(authData);
  }, [handleAuthSuccess]);

  const logout = useCallback(async () => {
    try {
      // Backend /auth/logout invalidates the HttpOnly cookie by setting Max-Age=0
      await apiClient.post('/auth/logout');
    } catch {
      // Ignore network errors on logout to ensure client state is always cleared
    } finally {
      handleAuthFailure();
    }
  }, [handleAuthFailure]);

  // Synchronize with Axios interceptor events and trigger silent refresh on initial application mount
  useEffect(() => {
    registerAuthCallbacks(handleAuthSuccess, handleAuthFailure);

    let isMounted = true;

    const initializeAuth = async () => {
      try {
        // App initialization: check if browser has a valid HttpOnly refresh token cookie
        const response = await apiClient.post<AuthResponse>('/auth/refresh');
        if (isMounted) {
          handleAuthSuccess(response.data);
        }
      } catch {
        if (isMounted) {
          handleAuthFailure();
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
      unregisterAuthCallbacks();
      clearTimer();
    };
  }, [handleAuthSuccess, handleAuthFailure, clearTimer]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
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
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
