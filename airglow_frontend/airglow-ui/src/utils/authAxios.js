import axios from "axios";

// Auth-specific API client — routes through nginx to auth_service (/auth/* prefix)
const authApi = axios.create({
  baseURL: "http://localhost/auth",
});

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default authApi;
