import api from "../utils/axios";

export const getDashboardStats = () => {
  return api.get("/dashboard");
};

export const getRecentRuns = () => {
  return api.get("/runs");
};

export const getRecentDags = () => {
  return api.get("/dags");
};
