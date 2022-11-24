import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";
const PROJECTS_URL = "projects/";
const TASKS_URL = "tasks/";

export default {
  state: {
    projects: [],
    tasks: [],
    taskDescription: "",
    DatetimeOfCompletion: null,
    taskPriority: "none",
    taskStatus: "todo",
    taskProjectId: null,
    projectNameAdd: "",
    projectNameRed: "",
    showAddProjectForm: false,
  },
  getters: {
    tasks(state) {
      return state.tasks;
    },
    projects(state) {
      return state.projects;
    },
    taskDescription(state) {
      return state.taskDescription;
    },
    taskDatetimeOfCompletion(state) {
      return state.taskDatetimeOfCompletion;
    },
    taskStatus(state) {
      return state.taskStatus;
    },
    taskPriority(state) {
      return state.taskPriority;
    },
    taskProjectId(state) {
      return state.taskProjectId;
    },
    projectNameAdd(state) {
      return state.projectNameAdd;
    },
    projectNameRed(state) {
      return state.projectNameRed;
    },
    showAddProjectForm(state) {
      return state.showAddProjectForm;
    },
  },
  mutations: {
    setProjects(state, projects) {
      state.projects = projects;
    },
    addProject(state, project) {
      state.projects.unshift(project);
    },
    redProject(state, data) {
      const id = data.id
      const newName = data.newName

      state.projects.forEach(function(project) {
        if (project.id == id) {
          project.name = newName
        }
      })
    },
    removeProject(state, index) {
      state.projects.splice(index, index);
    },

    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.unshift(task);
    },
    redTask(state, id) {
      const task = state.tasks.find((task) => task.id == id);
      task.description = state.description;
    },
    removeTask(state, index) {
      state.tasks.splice(index, 1);
    },

    setTaskDescription(state, description) {
      state.taskDescription = description;
    },
    setTaskDatetimeOfCompletion(state, datetime) {
      state.taskDatetimeOfCompletion = datetime;
    },
    setTaskPriority(state, priority) {
      state.taskPriority = priority;
    },
    setTaskProjectId(state, id) {
      state.taskProjectId = Number(id);
    },
    setTaskStatus(state, status) {
      state.taskStatus = status;
    },
    setShowAddProjectForm(state, valueOfShow) {
      state.showAddProjectForm = valueOfShow;
    },
    setProjectNameAdd(state, name) {
      state.projectNameAdd = name;
    },
    setProjectNameRed(state, name) {
      state.projectNameRed = name;
    },
  },
  actions: {
    addProject(context) {
      const token = window.localStorage.getItem("token");

      axios({
        method: "post",
        url: API_URL + PROJECTS_URL,
        headers: { Authorization: "Token " + token },
        data: {
          name: context.getters.projectNameAdd,
        },
      }).then((response) => {
        const newProject = {
          id: response.data.id,
          name: response.data.name,
        };
        context.commit("addProject", newProject);
      });
    },
    redProject(context, id) {
      const token = window.localStorage.getItem("token");
      const newName = context.getters.projectNameRed

      axios({
        method: "put",
        url: API_URL + PROJECTS_URL + id + "/",
        headers: { Authorization: "Token " + token },
        data: {
          id: id,
          name: newName,
        },
      });
      context.commit("redProject", {id, newName})
    },
    removeProject(context, data) {
      const token = window.localStorage.getItem("token");
      const event = data.event;
      const id = data.id;

      axios({
        method: "delete",
        url: API_URL + PROJECTS_URL + id + "/",
        headers: { Authorization: "Token " + token },
        data: {
          id: id,
        },
      }).then((response) => {
        const project = context.getters.projects.find(
          (project) => project.id == id
        );
        const index = context.getters.projects.indexOf(project);
        context.commit("removeProject", index);
        event.target.parentNode.remove();
      });
    },
    showAllProjects(context) {
      const token = window.localStorage.getItem("token");

      axios({
        method: "get",
        url: API_URL + PROJECTS_URL,
        headers: { Authorization: "Token " + token },
      }).then((response) => context.commit("setProjects", response.data));
    },

    showAllTasks(context) {
      const token = window.localStorage.getItem("token");

      axios({
        method: "get",
        url: API_URL + TASKS_URL,
        headers: { Authorization: "Token " + token },
      }).then((response) => context.commit("setTasks", response.data));
    },
    showTodoTasks(context) {
      const token = window.localStorage.getItem("token");

      axios({
        method: "get",
        url: API_URL + TASKS_URL,
        headers: { Authorization: "Token " + token },
      }).then((response) => {
        const allTasks = response.data;
        let todoTasks = [];

        allTasks.forEach((task) => {
          if (task.status == "todo") {
            todoTasks.push(task);
          }
        });
        context.commit("setTasks", todoTasks);
      });
    },
    showDoneTasks(context) {
      const token = window.localStorage.getItem("token");

      axios({
        method: "get",
        url: API_URL + TASKS_URL,
        headers: { Authorization: "Token " + token },
      }).then((response) => {
        const allTasks = response.data;
        let doneTasks = [];

        allTasks.forEach((task) => {
          if (task.status == "done") {
            doneTasks.push(task);
          }
        });

        context.commit("setTasks", doneTasks);
      });
    },
    showTasksOfProject(context, projectId) {
      const token = window.localStorage.getItem("token");

      axios({
        method: "get",
        url: API_URL + TASKS_URL,
        headers: { Authorization: "Token " + token },
      }).then((response) => {
        const tasks = response.data;
        const tasksOfProject = tasks.filter(
          (task) => task.project == projectId
        );
        context.commit("setTasks", tasksOfProject);
      });
    },
    setStatus(context, id) {
      const token = window.localStorage.getItem("token");
      const task = context.getters.tasks.find((task) => task.id == id);
      const description = task.description;
      const newStatus = task.status == "todo" ? "done" : "todo";

      axios({
        method: "put",
        url: API_URL + TASKS_URL + id + "/",
        headers: {
          Authorization: "Token " + token,
        },
        data: {
          status: newStatus,
          description: description,
        },
      }).then(() => {
        task.status = newStatus;
      });
    },
    addTask(context) {
      if (context.getters.taskDescription) {
        const token = window.localStorage.getItem("token");

        axios({
          method: "post",
          url: API_URL + TASKS_URL,
          headers: {
            Authorization: "Token " + token,
          },
          data: {
            description: context.getters.taskDescription,
            datetime_of_completion: context.getters.taskDatetimeOfCompletion,
            status: context.getters.taskStatus,
            priority: context.getters.taskPriority,
            project: context.getters.taskProjectId,
          },
        }).then((response) => {
          const newTask = {
            id: response.data.id,
            description: response.data.description,
            datetime_of_completion: response.data.datetime_of_completion,
            priority: response.data.priority,
            status: response.data.status,
            project: response.data.project,
          };

          context.commit("addTask", newTask);
          context.commit("setTaskDescription", "");
          context.commit("setTaskStatus", "todo");
        });
      }
    },
    redTask(context, data) {
      const token = window.localStorage.getItem("token");

      axios({
        method: "put",
        url: API_URL + TASKS_URL + data.id + "/",
        headers: { Authorization: "Token " + token },
        data: {
          description: data.description,
        },
      });

      context.commit("redTask", data.id);
    },
    removeTask(context, id) {
      const token = window.localStorage.getItem("token");

      axios({
        method: "delete",
        url: API_URL + TASKS_URL + id + "/",
        headers: { Authorization: "Token " + token },
      });

      const task = context.getters.tasks.find((task) => task.id == id);
      const index = context.getters.tasks.indexOf(task);
      context.commit("removeTask", index);
    },
  },
};
