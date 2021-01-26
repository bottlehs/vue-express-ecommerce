import http from "@/common/http";
import authHeader from "./auth.header";
const SERVICE_API_URL = "/api/carts";

class CartsService {
  findAll(params = {}) {
    return http.get(SERVICE_API_URL, {
      params: params,
      headers: authHeader(),
    });
  }
}

export default new CartsService();
