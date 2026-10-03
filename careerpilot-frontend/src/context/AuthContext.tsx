import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthResponse } from '../types/auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (authData: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('careerpilot_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('careerpilot_token');
  });

  const login = (authData: AuthResponse) => {
    const userData: User = {
      id: authData.userId,
      name: authData.name,
      email: authData.email,
      role: authData.role,
    };
    setUser(userData);
    setToken(authData.accessToken);
    localStorage.setItem('careerpilot_token', authData.accessToken);
    localStorage.setItem('careerpilot_refresh_token', authData.refreshToken);
    localStorage.setItem('careerpilot_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('careerpilot_token');
    localStorage.removeItem('careerpilot_refresh_token');
    localStorage.removeItem('careerpilot_user');
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('careerpilot_token', token);
    } else {
      localStorage.removeItem('careerpilot_token');
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
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
