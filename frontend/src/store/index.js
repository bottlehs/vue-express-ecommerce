import Vue from "vue";
import Vuex from "vuex";
import OauthService from "@/services/oauth.service.js";

import Jwt from "@/common/jwt";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: {},
    isAuthenticated: !!Jwt.getAccessToken()
  },
  mutations: {
    LOGIN: function(state, data) {
      state.token = data;
      state.isAuthenticated = true;
      Jwt.saveAccessToken(data.token);
      Jwt.saveRefreshToken(data.refreshToken);
    },
    LOGOUT: function(state) {
      state.token = null;
      state.isAuthenticated = false;
      Jwt.destroyAccessToken();
      Jwt.destroyRefreshToken();
    }
  },
  getters: {
    isAuthenticated(state) {
      console.log("isAuthenticated");
      console.log(state);
      return state.isAuthenticated;
    }
  },
  actions: {
    LOGIN({ commit }, { email, password }) {
      return OauthService.login({
        email,
        password
      }).then(
        response => {
          const { data } = response;
          commit("LOGIN", {
            token: data.token,
            refreshToken: data.refreshToken
          });

          return response;
        },
        error => {
          // status 404
          return error.response;
        }
      );
    },
    // 로그아웃
    LOGOUT({ commit }, { provider, userId, accessToken }) {
      return OauthService.logout({
        provider,
        userId,
        accessToken
      }).then(
        response => {
          const { data } = response;
          console.log(data);
          window.location.replace(data);
          commit("LOGOUT");
        },
        error => {
          console.log(error);
        }
      );
    }
  },
  modules: {}
});
