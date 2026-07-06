import { useEffect, useMemo, useState } from "react";

import { AuthContext } from "./auth-context";
import { api, apiMessage, setAccessToken } from "../services/api";

const SESSION_KEY = "ticketing-system-user";

const getStoredUser = () => {
  const storedUser = localStorage.getItem(SESSION_KEY);

  return storedUser ? JSON.parse(storedUser) : null;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const hydrateSession = async () => {
      try {
        const response = await api.post("/auth/refresh-token");
        setAccessToken(response.data.data.accessToken);
        const sessionUser = response.data.data.user;
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
        setUser(sessionUser);
      } catch {
        setAccessToken(null);
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
      } finally {
        setIsAuthLoading(false);
      }
    };

    hydrateSession();
  }, []);

  const login = async ({ email, password }) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const sessionUser = response.data.data.user;
      setAccessToken(response.data.data.accessToken);
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
      setUser(sessionUser);
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        message: apiMessage(error, "Invalid email or password."),
      };
    }
  };

  const register = async ({ name, email, password }) => {
    try {
      const response = await api.post("/auth/register", { name, email, password });
      const sessionUser = response.data.data.user;
      setAccessToken(response.data.data.accessToken);
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
      setUser(sessionUser);
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        message: apiMessage(error, "Registration failed."),
      };
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setAccessToken(null);
      localStorage.removeItem(SESSION_KEY);
      setUser(null);
    }
  };

  const clearSession = () => {
    setAccessToken(null);
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const setSessionUser = (nextUser) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthLoading,
      login,
      register,
      logout,
      clearSession,
      setSessionUser,
    }),
    [user, isAuthLoading],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
