import api from "../utils/axios";

const dagService = {
  getAllDags() {
    return api.get("/pipelines");
  },

  getDag(id) {
    return api.get(`/pipelines/${id}`);
  },

  createDag(data) {
    return api.post("/pipelines", data);
  },

  updateDag(id, data) {
    return api.put(`/pipelines/${id}`, data);
  },

  deleteDag(id) {
    return api.delete(`/pipelines/${id}`);
  },

  runDag(id) {
    return api.post(`/pipelines/${id}/run`);
  },
};

export default dagService;
