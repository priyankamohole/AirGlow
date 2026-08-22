import { createContext, useState } from "react";
import authApi from "../utils/authAxios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = async (credentials) => {
    // authApi baseURL is http://localhost/auth — so /login → http://localhost/auth/login ✓
    const response = await authApi.post("/login", credentials);

    const jwt = response.data.access_token;

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
