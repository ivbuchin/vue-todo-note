export default {
  state: {
    app: "tasks",
  },
  getters: {
    app(state) {
      return state.app;
    },
  },
  mutations: {
    setApp(state, payload) {
      state.app = payload;
    },
  },
};
