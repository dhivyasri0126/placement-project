import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import type { AuthResponse } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

// In-memory access token storage (isolated from XSS, not in localStorage)
let inMemoryAccessToken: string | null = null;

// Callbacks to synchronize with React AuthContext state
type TokenUpdateCallback = (authData: AuthResponse) => void;
type AuthErrorCallback = () => void;

let onTokenUpdate: TokenUpdateCallback | null = null;
let onAuthError: AuthErrorCallback | null = null;

export const setAuthToken = (token: string | null) => {
  inMemoryAccessToken = token;
};

export const getAuthToken = (): string | null => {
  return inMemoryAccessToken;
};

export const registerAuthCallbacks = (
  onUpdate: TokenUpdateCallback,
  onError: AuthErrorCallback
) => {
  onTokenUpdate = onUpdate;
  onAuthError = onError;
};

export const unregisterAuthCallbacks = () => {
  onTokenUpdate = null;
  onAuthError = null;
};

// Axios instance with credentials enabled so HttpOnly cookies are transmitted
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Injects in-memory Access Token into Authorization header
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (inMemoryAccessToken && config.headers) {
      config.headers.Authorization = `Bearer ${inMemoryAccessToken}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Concurrency queue for handling multiple 401s during token refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

// Response Interceptor: Catches 401, invokes silent refresh via HttpOnly cookie, replays request
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Do not attempt to refresh on auth endpoints (prevents infinite refresh loops)
    const isAuthEndpoint =
      originalRequest?.url?.includes('/auth/login') ||
      originalRequest?.url?.includes('/auth/register') ||
      originalRequest?.url?.includes('/auth/refresh') ||
      originalRequest?.url?.includes('/auth/logout');

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry && !isAuthEndpoint) {
      if (isRefreshing) {
        // Refresh already in-flight; queue this request
        return new Promise<AxiosResponse>((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(apiClient(originalRequest));
            },
            reject: (err: unknown) => {
              reject(err);
            },
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Send POST to /auth/refresh with credentials; HttpOnly cookie is attached by browser
        const response = await axios.post<AuthResponse>(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAuthData = response.data;
        const newAccessToken = newAuthData.accessToken;

        setAuthToken(newAccessToken);
        if (onTokenUpdate) {
          onTokenUpdate(newAuthData);
        }

        processQueue(null, newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        setAuthToken(null);
        if (onAuthError) {
          onAuthError();
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
