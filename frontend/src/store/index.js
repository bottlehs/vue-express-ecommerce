import Vue from "vue";
import Vuex from "vuex";
import AuthService from "@/services/auth.service.js";

import Jwt from "@/common/jwt";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: {},
    isAuthenticated: !!Jwt.getToken(),
  },
  mutations: {
    LOGIN: function(state, data) {
      state.token = data;
      state.isAuthenticated = true;
      Jwt.saveToken(data.accessToken);
      Jwt.saveRefreshToken(data.refreshToken);
    },
    LOGOUT: function(state) {
      state.token = null;
      state.isAuthenticated = false;
      Jwt.destroyToken();
      Jwt.destroyRefreshToken();
    },    
  },
  getters: {
    isAuthenticated(state) {
      console.log("isAuthenticated");
      console.log(state);
      return state.isAuthenticated;
    },
  },
  actions: {
    LOGIN({ commit }, { email, password }) {
      return AuthService.login({
        email,
        password
      }).then(
        (response) => {
          const { data } = response;
          commit("LOGIN", {
            token: data.token,
            refreshToken: data.refreshToken
          });
        },
        (error) => {
          // status 404
          console.log(error);
        }
      );
    },
    // 로그아웃
    LOGOUT({ commit }, { provider, userId, accessToken }) {
      return AuthService.logout({
        provider,
        userId,
        accessToken,
      }).then(
        (response) => {
          const { data } = response;
          console.log(data);
          window.location.replace(data);
          commit("LOGOUT");
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  modules: {},
});
