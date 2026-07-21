import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
const TOKEN_KEY = "ticketing-system-access-token";

export const getAccessToken = () => localStorage.getItem(TOKEN_KEY);

export const setAccessToken = (token) => {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
};

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isPublicAuthRequest = [
      "/auth/login",
      "/auth/register",
      "/auth/refresh-token",
      "/auth/forgot-password",
      "/auth/reset-password",
      "/auth/verify-email",
    ].some((path) => originalRequest?.url?.endsWith(path));

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      !isPublicAuthRequest &&
      getAccessToken()
    ) {
      originalRequest._retry = true;
      const response = await axios.post(
        `${API_URL}/auth/refresh-token`,
        {},
        { withCredentials: true },
      );
      setAccessToken(response.data.data.accessToken);
      originalRequest.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
      return api(originalRequest);
    }

    return Promise.reject(error);
  },
);

export const apiMessage = (error, fallback = "Something went wrong.") =>
  error.response?.data?.message ||
  (error.request ? "Cannot reach the API. Check that the backend is running and CORS origin matches." : fallback);
