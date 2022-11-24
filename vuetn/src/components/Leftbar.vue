<template>
  <div id="sidebar-wrapper">
    <!-- BUTTONS -->
    <div class="btn-group" role="group">
      <input
        type="radio"
        class="btn-check"
        name="btnradio"
        id="tasks"
        autocomplete="off"
        checked
      />
      <label
        class="btn btn-outline-primary"
        for="tasks"
        id="label-for-tasks"
        @click="changeApp($event), changeClass($event)"
        >Tasks</label
      >

      <input
        type="radio"
        class="btn-check"
        name="btnradio"
        id="notes"
        autocomplete="off"
      />
      <label
        class="btn btn-outline-secondary"
        for="notes"
        id="label-for-notes"
        @click="changeApp($event), changeClass($event)"
        >Notes</label
      >
    </div>

    <!-- TASKS -->
    <div v-if="app == 'tasks'" class="items">
      <h5 class="text-center">Projects</h5>
      <ul class="sidebar-nav">
        <li class="sidebar-brand" v-for="project in projects" :key="project.id">
          <a href="#" @click="showTasksOfProject(project.id)">
            <span>{{ project.name }}</span>
          </a>

          <input
            type="text"
            class="red-project-input d-none"
            v-model="projectNameRed"
            @keyup.enter="enterInputRedProject($event, project.id)"
          />

          <a @click="openRedProjectInput" class="red-btn">
            <img
              class="red-icon"
              src="https://cdn.iconscout.com/icon/free/png-256/pencil-474-451420.png"
              width="16"
            />
          </a>

          <a
            href="#"
            class="del-button"
            @click="removeProject({ event: $event, id: project.id })"
            >X</a
          >
        </li>
      </ul>

      <button
        class="btn"
        :class="classToggleAddProject"
        @mouseover="this.classToggleAddProject = 'btn-outline-danger'"
        @mouseleave="this.classToggleAddProject = 'btn-outline-secondary'"
        @click="toggleAddProject"
      >
        +
      </button>
      <form
        v-show="showAddProjectForm"
        id="add-project"
        @submit.prevent="addProjectAndClearInput"
      >
        <input type="text" name="name" v-model="projectNameAdd" />
      </form>
    </div>

    <!-- NOTES -->
    <div v-else class="items">
      <h5 class="text-center">Notebooks</h5>
      <ul class="sidebar-nav">
        <li
          class="sidebar-brand"
          v-for="notebook in notebooks"
          :key="notebook.id"
        >
          <a href="#" @click="showNotesOfNotebook(notebook.id)">
            <span>{{ notebook.name }}</span>
          </a>

          <input
            type="text"
            class="red-notebook-input d-none"
            v-model="notebookNameRed"
            @keyup.enter="enterInputRedNotebook($event, notebook.id)"
          />

          <a @click="openRedNotebookInput" class="red-btn">
            <img
              class="red-icon"
              src="https://cdn.iconscout.com/icon/free/png-256/pencil-474-451420.png"
              width="16"
            />
          </a>

          <a
            href="#"
            class="del-button"
            @click="removeNotebook({ event: $event, id: notebook.id })"
            >X</a
          >
        </li>
      </ul>

      <button
        class="btn"
        :class="classToggleAddNotebook"
        @mouseover="this.classToggleAddNotebook = 'btn-outline-success'"
        @mouseleave="this.classToggleAddNotebook = 'btn-outline-secondary'"
        @click="toggleAddNotebook"
      >
        +
      </button>
      <form
        v-show="showAddNotebookForm"
        id="add-notebook"
        @submit.prevent="addNotebookAndClearInput"
      >
        <input type="text" name="name" v-model="notebookNameAdd" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: function () {
    return {
      classToggleAddProject: "btn-outline-secondary",
      classToggleAddNotebook: "btn-outline-secondary",
    };
  },
  computed: {
    ...mapGetters([
      "app",
      "projects",
      "notebooks",
      "showAddProjectForm",
      "showAddNotebookForm",
    ]),

    projectNameAdd: {
      get() {
        return this.$store.getters.projectNameAdd;
      },
      set(value) {
        this.$store.commit("setProjectNameAdd", value);
      },
    },
    projectNameRed: {
      get() {
        return this.$store.getters.projectNameRed;
      },
      set(value) {
        this.$store.commit("setProjectNameRed", value);
      },
    },
    notebookNameAdd: {
      get() {
        return this.$store.getters.notebookNameAdd;
      },
      set(value) {
        this.$store.commit("setNotebookNameAdd", value);
      },
    },
    notebookNameRed: {
      get() {
        return this.$store.getters.notebookNameRed;
      },
      set(value) {
        this.$store.commit("setNotebookNameRed", value);
      },
    },
  },
  methods: {
    ...mapActions([
      "showTasksOfProject",
      "addProject",
      "redProject",
      "removeProject",
      "showNotesOfNotebook",
      "removeNotebook",
    ]),

    changeClass(event) {
      let labelClicked = event.target;
      if (labelClicked.classList.contains("btn-outline-secondary")) {
        labelClicked.classList.remove("btn-outline-secondary");
        labelClicked.classList.add("btn-outline-primary");
        if (labelClicked.id == "label-for-tasks") {
          let labelNotes = document.querySelector("#label-for-notes");
          labelNotes.classList.remove("btn-outline-primary");
          labelNotes.classList.add("btn-outline-secondary");
        } else {
          let labelTasks = document.querySelector("#label-for-tasks");
          labelTasks.classList.remove("btn-outline-primary");
          labelTasks.classList.add("btn-outline-secondary");
        }
      }
    },
    toggleAddProject() {
      if (this.$store.getters.showAddProjectForm == false) {
        this.$store.commit("setShowAddProjectForm", true);
      } else {
        this.$store.commit("setShowAddProjectForm", false);
      }
    },
    addProjectAndClearInput(event) {
      this.$store.dispatch("addProject");
      this.$store.commit("setProjectNameAdd", "");
    },
    openRedProjectInput(event) {
      const li = event.target.parentNode.parentNode;
      const span = li.querySelector("span");
      const projectName = span.textContent;
      const redProjectNameinput = li.querySelector("input");
      span.textContent = "";

      redProjectNameinput.value = projectName;
      redProjectNameinput.classList.remove("d-none");
    },
    enterInputRedProject(event, id) {
      const input = event.target;
      input.classList.add("d-none");

      this.$store.dispatch("redProject", id);

      const li = event.target.parentNode;
      const span = li.querySelector("span");
      span.textContent = this.$store.getters.projectNameRed;
    },
    toggleAddNotebook() {
      if (this.$store.getters.showAddNotebookForm == false) {
        this.$store.commit("setShowAddNotebookForm", true);
      } else {
        this.$store.commit("setShowAddNotebookForm", false);
      }
    },
    addNotebookAndClearInput(event) {
      this.$store.dispatch("addNotebook");
      this.$store.commit("setNotebookNameAdd", "");
    },
    changeApp(event) {
      if (event.target.previousSibling.id == "tasks") {
        this.$store.commit("setApp", "tasks");
        this.$store.dispatch("showAllProjects");
        this.$store.dispatch("showTodoTasks");
      } else {
        this.$store.commit("setApp", "notes");
        this.$store.dispatch("showAllNotebooks");
        this.$store.dispatch("showAllNotes");
      }
    },

    openRedNotebookInput(event) {
      const li = event.target.parentNode.parentNode;
      const span = li.querySelector("span");
      const notebookName = span.textContent;
      const redNotebookNameinput = li.querySelector("input");
      span.textContent = "";

      redNotebookNameinput.value = notebookName;
      redNotebookNameinput.classList.remove("d-none");
    },
    enterInputRedNotebook(event, id) {
      const input = event.target;
      input.classList.add("d-none");

      this.$store.dispatch("redNotebook", id);

      const li = event.target.parentNode;
      const span = li.querySelector("span");
      span.textContent = this.$store.getters.notebookNameRed;
    },
  },
};
</script>

<style>
#sidebar-wrapper {
  position: fixed;
  width: 0;
  height: 100%;
}

.items {
  position: relative;
  top: 150px;
}

.sidebar-nav {
  position: relative;
  width: 180px;
  margin: 0;
  padding: 0;
}

.sidebar-nav > .sidebar-brand {
  font-size: 18px;
  line-height: 40px;
  list-style-type: none;
}

.sidebar-nav > .sidebar-brand a,
h5 {
  text-decoration: none;
  color: #999999;
}

.red-icon {
  margin-left: 3px;
  margin-right: 3px;
}
.red-btn {
  text-decoration: none;
  color: #999999;
}
.del-btn:active,
.del-btn:hover,
.del-btn {
  text-decoration: none;
  color: #999999;
}
</style>
