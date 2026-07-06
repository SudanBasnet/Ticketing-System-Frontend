import { api } from "./api";

export const getProfile = async () => {
  const response = await api.get("/users/me");
  return response.data.data.user;
};

export const updateProfile = async (payload) => {
  const response = await api.patch("/users/me", payload);
  return response.data.data.user;
};

export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await api.patch("/users/me/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.data.user;
};

export const changePassword = async ({ currentPassword, newPassword }) => {
  const response = await api.patch("/users/me/password", {
    currentPassword,
    newPassword,
  });
  return response.data;
};

export const deleteAccount = async () => {
  const response = await api.delete("/users/me");
  return response.data;
};

export const listUsers = async (params = {}) => {
  const response = await api.get("/users", { params });
  return {
    users: response.data.data,
    meta: response.data.meta,
  };
};

export const updateUserRole = async (userId, role) => {
  const response = await api.patch(`/users/${userId}/role`, { role });
  return response.data.data.user;
};

export const updateUserStatus = async (userId, status) => {
  const response = await api.patch(`/users/${userId}/status`, { status });
  return response.data.data.user;
};
