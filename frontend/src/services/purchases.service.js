import http from "@/common/http";
import authHeader from "./auth.header";
const SERVICE_API_URL = "/api/purchases";

class PurchasesService {
  findAll(params = {}) {
    return http.get(SERVICE_API_URL, {
      params: params,
      headers: authHeader(),
    });
  }
}

export default new PurchasesService();