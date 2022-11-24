<template>
  <div class="main" v-if="!authenticated">
    <h3>
      <a href="#" id="register" @click="showRegisterForm">Register</a> or
      <a href="#" id="login" @click="showLoginForm">Log in</a>
    </h3>

    <RegisterForm v-if="showingRegisterForm" />
    <LoginForm v-if="showingLoginForm" />
  </div>

  <div v-else>
    <Rightbar />
    <Leftbar />

    <div class="container">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card">
            <div class="card-body p-5">
              <AddTaskForm v-if="app == 'tasks'" />
              <AddNoteForm v-else />

              <Navbar v-if="app == 'tasks'" />

              <TaskList v-if="app == 'tasks'" :tasks="tasks" />
              <NoteList v-else :notes="notes" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import RegisterForm from "@/components/RegisterForm";
import LoginForm from "@/components/LoginForm";
import Leftbar from "@/components/Leftbar";
import Rightbar from "@/components/Rightbar";
import AddTaskForm from "@/components/AddTaskForm";
import Navbar from "@/components/Navbar";
import TaskList from "@/components/TaskList";
import AddNoteForm from "@/components/AddNoteForm";
import NoteList from "@/components/NoteList";

const API_URL = "http://127.0.0.1:8000/";
const GET_USER_URL = "auth/users/me/";

export default {
  name: "Main",
  components: {
    RegisterForm,
    LoginForm,
    Leftbar,
    Rightbar,
    AddTaskForm,
    Navbar,
    AddNoteForm,
    TaskList,
    NoteList,
  },
  computed: {
    ...mapGetters([
      "app",
      "projects",
      "tasks",
      "notebooks",
      "notes",
      "allTasks",
      "showingRegisterForm",
      "showingLoginForm",
      "allTasks",
      "authenticated",
    ]),
  },
  methods: {
    ...mapActions(["showRegisterForm", "showLoginForm"]),
  },
  created() {
    const token = window.localStorage.getItem("token");
    const username = window.localStorage.getItem("username");

    if (token && username) {
      axios({
        method: "get",
        url: API_URL + GET_USER_URL,
        headers: { Authorization: "Token " + token },
      }).then((response) => {
        this.$store.commit("setUser", response.data);
        this.$store.commit("setUsername", username);
        this.$store.commit("setAuthenticated", true);
        this.$store.dispatch("showAllProjects");
        this.$store.dispatch("showTodoTasks");
      });
    }
  },
};
</script>
