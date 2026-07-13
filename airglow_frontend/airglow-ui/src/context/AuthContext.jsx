import { createContext, useState } from "react";
import api from "../utils/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = async (credentials) => {
    const response = await api.post("/auth/login", credentials);

    const jwt = response.data.access_token;

    // Save the JWT, not the old state
    localStorage.setItem("token", jwt);
    setToken(jwt);

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
