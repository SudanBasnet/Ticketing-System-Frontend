import { api } from "./api";

export const forgotPassword = async (email) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};

export const resetPassword = async ({ token, password }) => {
  const response = await api.post("/auth/reset-password", { token, password });
  return response.data;
};

export const verifyEmail = async (token) => {
  const response = await api.post("/auth/verify-email", { token });
  return response.data;
};

export const resendVerification = async () => {
  const response = await api.post("/auth/resend-verification");
  return response.data;
};
