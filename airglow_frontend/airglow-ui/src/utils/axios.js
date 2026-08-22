import axios from "axios";

// General API client — routes through nginx to DAG / dashboard / run services
const api = axios.create({
  baseURL: "http://localhost",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
