import api from "../utils/axios";

const dagService = {
  getAllDags() {
    return api.get("/dags/");
  },

  getDag(id) {
    return api.get(`/dags/${id}`);
  },

  createDag(data) {
    return api.post("/dags/", data);
  },

  updateDag(id, data) {
    return api.put(`/dags/${id}`, data);
  },

  deleteDag(id) {
    return api.delete(`/dags/${id}`);
  },

  runDag(id) {
    return api.post(`/dags/${id}/run`);
  },
};

export default dagService;
