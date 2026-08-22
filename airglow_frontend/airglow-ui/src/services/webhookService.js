import api from "../utils/axios";

const webhookService = {
  // GET /webhooks
  getAll() {
    return api.get("/webhooks");
  },

  // POST /webhooks  { dag_id, callback_url }
  create(data) {
    return api.post("/webhooks", data);
  },

  // DELETE /webhooks/{id}
  remove(id) {
    return api.delete(`/webhooks/${id}`);
  },
};

export default webhookService;
