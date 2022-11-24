import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";
const USER_CREATE_URL = "users/";
const LOGIN_URL = "auth/token/login/";
const LOGOUT_URL = "auth/token/logout/";

export default {
  state: {
    showingRegisterForm: false,
    showingLoginForm: false,
    show: false,
    username: "",
    password: "",
    authenticated: false,
    user: {},
  },
  getters: {
    showingRegisterForm(state) {
      return state.showingRegisterForm;
    },
    showingLoginForm(state) {
      return state.showingLoginForm;
    },
    username(state) {
      return state.username;
    },
    password(state) {
      return state.password;
    },
    authenticated(state) {
      return state.authenticated;
    },
    user(state) {
      return state.user;
    },
    show(state) {
      return state.show;
    },
  },
  mutations: {
    setShowingRegisterForm(state, valueOfShowing) {
      state.showingRegisterForm = valueOfShowing;
    },
    setShowingLoginForm(state, valueOfShowing) {
      state.showingLoginForm = valueOfShowing;
    },
    setUser(state, user) {
      state.user = user;
    },
    setUsername(state, username) {
      state.username = username;
    },
    setPassword(state, password) {
      state.password = password;
    },
    setAuthenticated(state, valueOfAuthenticate) {
      state.authenticated = valueOfAuthenticate;
    },
    setShow(state, valueOfShow) {
      state.show = valueOfShow;
    },
  },
  actions: {
    showRegisterForm(context) {
      if (context.getters.showingLoginForm == true) {
        context.commit("setShowingLoginForm", false);
      }
      context.commit("setShowingRegisterForm", true);
    },
    showLoginForm(context) {
      if (context.getters.showingRegisterForm == true) {
        context.commit("setShowingRegisterForm", false);
      }
      context.commit("setShowingLoginForm", true);
    },
    createUser(context) {
      if (context.getters.username && context.getters.password) {
        axios({
          method: "post",
          url: API_URL + USER_CREATE_URL,
          data: {
            username: context.getters.username,
            password: context.getters.password,
          },
        }).then((response) => context.dispatch("showLoginForm"));
      }
    },
    login(context) {
      if (context.getters.username && context.getters.password) {
        axios({
          method: "post",
          url: API_URL + LOGIN_URL,
          data: {
            username: context.getters.username,
            password: context.getters.password,
          },
        }).then((response) => {
          window.localStorage.setItem("token", response.data.auth_token);
          window.localStorage.setItem("username", context.getters.username);
          context.commit("setUser", response.data);
          context.commit("setAuthenticated", true);
          context.dispatch("showAllProjects");
          context.dispatch("showTodoTasks");
        });
      }
    },
    logout(context) {
      const token = window.localStorage.getItem("token");

      axios({
        method: "post",
        url: API_URL + LOGOUT_URL,
        headers: {
          Authorization: "Token " + token,
        },
      }).then((response) => {
        context.commit("setUser", {});
        context.commit("setAuthenticated", false);
        context.commit("setProjects", {}, { root: true });
        context.commit("setTasks", {}, { root: true });
        context.commit("setNotebooks", {}, { root: true });
        context.commit("setNotes", {}, { root: true });
        window.localStorage.removeItem("token");
      });
    },
  },
};
