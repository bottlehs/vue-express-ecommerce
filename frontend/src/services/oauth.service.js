import http from "@/common/http";
import authHeader from "./auth.header";
const SERVICE_API_URL = "/api/auth/";

class OauthService {
  login(params = {}) {
    return http.get(SERVICE_API_URL + "/login", {
      params: params,
      headers: authHeader()
    });
  }

  logout(params = {}) {
    return http.get(SERVICE_API_URL + "/logout", {
      params: params,
      headers: authHeader()
    });
  }

  register(params = {}) {
    return http.get(SERVICE_API_URL + "/register", {
      params: params,
      headers: authHeader()
    });
  }
}

export default new OauthService();
