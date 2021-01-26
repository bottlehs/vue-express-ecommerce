import authHeader from "@/common/auth.header";
const SERVICE_API_URL = "/api/users";

class UsersService {
  findAll(http, params = {}) {
    return http.get(SERVICE_API_URL, {
      params: params,
      headers: authHeader(),
    });
  }
}

export default new UsersService();
