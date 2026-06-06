import { useMemo, useState } from "react";

import { AuthContext } from "./auth-context";

const SESSION_KEY = "ticketing-system-user";
const USERS_KEY = "ticketing-system-users";

const getStoredUser = () => {
  const storedUser = localStorage.getItem(SESSION_KEY);

  return storedUser ? JSON.parse(storedUser) : null;
};

const getStoredUsers = () => {
  const storedUsers = localStorage.getItem(USERS_KEY);

  return storedUsers ? JSON.parse(storedUsers) : [];
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);

  const login = ({ email, password }) => {
    const users = getStoredUsers();
    const matchedUser = users.find(
      (storedUser) =>
        storedUser.email === email && storedUser.password === password,
    );

    if (!matchedUser) {
      return {
        ok: false,
        message: "Invalid email or password.",
      };
    }

    const sessionUser = {
      name: matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.role,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);

    return { ok: true };
  };

  const register = ({ name, email, password }) => {
    const users = getStoredUsers();
    const existingUser = users.find((storedUser) => storedUser.email === email);

    if (existingUser) {
      return {
        ok: false,
        message: "An account already exists with this email.",
      };
    }

    const newUser = {
      name,
      email,
      password,
      role: "Service Desk Agent",
    };

    const sessionUser = {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);

    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
