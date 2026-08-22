import api from "../utils/axios";

const runService = {
  // Backend: GET /dags/runs (run.py router prefix is /dags)
  getRuns: () => api.get("/dags/runs"),

  // Backend: GET /dags/runs/{id}
  getRun: (id) => api.get(`/dags/runs/${id}`),

  // Backend: POST /dags/{dagId}/run
  triggerRun: (dagId) => api.post(`/dags/${dagId}/run`),
};

export default runService;
