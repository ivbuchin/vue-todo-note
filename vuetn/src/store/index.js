import Vuex from "vuex";
import app from "./modules/app";
import user from "./modules/user";
import task from "./modules/task";
import note from "./modules/note";

export default new Vuex.Store({
  modules: {
    app,
    user,
    task,
    note,
  },
});
