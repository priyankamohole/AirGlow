import api from "../utils/axios";

// Backend: GET /dashboard/stats
export const getDashboardStats = () => {
  return api.get("/dashboard/stats");
};

// Backend: GET /dags/runs
export const getRecentRuns = () => {
  return api.get("/dags/runs");
};

// Backend: GET /dags/
export const getRecentDags = () => {
  return api.get("/dags/");
};
