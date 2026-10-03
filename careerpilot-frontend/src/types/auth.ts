export interface User {
  id: number;
  name: string;
  email: string;
  role: 'STUDENT' | 'STAFF' | 'SUPER_ADMIN';
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  userId: number;
  email: string;
  name: string;
  role: 'STUDENT' | 'STAFF' | 'SUPER_ADMIN';
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: string;
}
