import authApi from "../utils/authAxios";

const authService = {
  register(data) {
    return authApi.post("/register", data);
  },

  login(credentials) {
    return authApi.post("/login", credentials);
  },

  getMe() {
    return authApi.get("/me");
  },
};

export default authService;
