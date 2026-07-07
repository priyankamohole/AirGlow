import api from "../utils/axios";

const runService = {
  getRuns: () => api.get("/runs"),

  getRun: (id) => api.get(`/runs/${id}`),

  triggerRun: (pipelineId) => api.post(`/pipelines/${pipelineId}/run`),

  getLogs: (id) => api.get(`/runs/${id}/logs`),

  getOutputs: (id) => api.get(`/runs/${id}/outputs`),
};

export default runService;
