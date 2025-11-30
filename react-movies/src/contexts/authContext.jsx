import React, { useState, useMemo } from "react";
import { signUp as apiSignUp, login as apiLogin } from "../api/auth-api";

export const AuthContext = React.createContext(null);

const AuthContextProvider = (props) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [userName, setUserName] = useState(() => localStorage.getItem("userName") || null);

  const isAuthenticated = !!token;

  const login = async (username, password) => {
    const data = await apiLogin({ username, password });
    setToken(data.token);
    setUserName(username);
    localStorage.setItem("token", data.token);
    localStorage.setItem("userName", username);
    return data;
  };

  const signup = async (username, password) => {
    const data = await apiSignUp({ username, password });
    return data;
  };

  const logout = () => {
    setToken(null);
    setUserName(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
  };

  const value = useMemo(
    () => ({
      token,
      userName,
      isAuthenticated,
      login,
      signup,
      logout,
    }),
    [token, userName]
  );

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};

export default AuthContextProvider;
