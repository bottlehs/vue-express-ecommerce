import Jwt from "./jwt";

export default function authHeader() {
  let accessToken = Jwt.getToken();

  if (accessToken) {
    return {
      Authorization: "Bearer " + accessToken,
    };
  } else {
    return {};
  }
}
