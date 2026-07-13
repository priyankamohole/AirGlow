import api from "../utils/axios";

const runService = {
  getRuns: () => api.get("/runs"),

  getRun: (id) => api.get(`/runs/${id}`),

  triggerRun: (dagId) => api.post(`/dags/${dagId}/run`),

  getLogs: (id) => api.get(`/runs/${id}/logs`),

  getOutputs: (id) => api.get(`/runs/${id}/outputs`),
};

export default runService;
