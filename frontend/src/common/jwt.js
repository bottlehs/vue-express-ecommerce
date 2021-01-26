const ID_TOKEN_KEY = "id_token";
const ID_REFRESH_TOKEN_KEY = "id_refresh_token";

export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

export const saveToken = (token) => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export const destroyToken = () => {
  console.log("destroyToken");
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

export const getRefreshToken = () => {
  return window.localStorage.getItem(ID_REFRESH_TOKEN_KEY);
};

export const saveRefreshToken = (token) => {
  window.localStorage.setItem(ID_REFRESH_TOKEN_KEY, token);
};

export const destroyRefreshToken = () => {
  window.localStorage.removeItem(ID_REFRESH_TOKEN_KEY);
};

export default {
  getToken,
  saveToken,
  destroyToken,
  getRefreshToken,
  saveRefreshToken,
  destroyRefreshToken,
};
