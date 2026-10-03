import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('careerpilot_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('careerpilot_refresh_token');
        if (refreshToken) {
          const res = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
          const { accessToken, refreshToken: newRefreshToken } = res.data;

          localStorage.setItem('careerpilot_token', accessToken);
          localStorage.setItem('careerpilot_refresh_token', newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        }
      } catch {
        localStorage.removeItem('careerpilot_token');
        localStorage.removeItem('careerpilot_refresh_token');
        localStorage.removeItem('careerpilot_user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
