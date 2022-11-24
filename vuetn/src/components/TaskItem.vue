<template>
  <li
    class="list-group-item d-flex align-items-center mb-2 rounded"
    :id="id"
    :class="[getClass]"
  >
    <input
      class="form-check-input me-2"
      :class="[getClass]"
      type="checkbox"
      value=""
      :checked="isChecked"
      @click="setStatus(id)"
    />
    <span class="text-white description">{{ description }}</span>
    <input
      type="text"
      class="d-none"
      v-model="description"
      @keyup.enter="enterInput"
    />
    <span
      class="position-absolute top-0 start-100 translate-middle p-2 border border-light rounded-circle"
      :class="classOfPriority"
    >
      <span class="visually-hidden">{{ priority }}</span>
    </span>
    <span
      v-if="projectName"
      class="project-name badge bg-info rounded-pill"
    >
      {{ projectName }}
    </span>
    <span
      v-if="datetime_of_completion"
      class="datetime-of-completion text-secondary"
      >{{ datetime_of_completion }}</span
    >

    <img
      src="https://cdn.iconscout.com/icon/free/png-256/pencil-474-451420.png"
      class="red-task-name-btn float-right"
      width="16"
      @click="clickRedHandler"
    />
    <a href="#" class="del-task-btn" @click="removeTask(id)">X</a>
  </li>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    id: Number,
    description: String,
    priority: String,
    project: Number,
    datetime_of_completion: String,
    status: String,
  },
  computed: {
    getClass: function () {
      const cls = this.status == "todo" ? "todo" : "done";
      return cls;
    },
    isChecked: function () {
      const check = this.status == "done" ? true : false;
      return check;
    },
    classOfPriority: function () {
      return {
        "bg-danger": this.priority == "high",
        "bg-warning": this.priority == "medium",
        "bg-dark": this.priority == "none",
      };
    },
    projectName: function () {
      const projects = this.$store.getters.projects;
      const project = projects.find((project) => project.id == this.project);
      if (project) {
        const projectName = project.name
        return projectName;
      }
    },
  },
  methods: {
    ...mapActions(["setStatus", "removeTask"]),

    clickRedHandler() {
      const li = document.getElementById(String(this.id));
      let span = li.querySelectorAll("span")[0];
      span.classList.add("d-none")

      const input = li.querySelectorAll("input")[1];
      input.classList.remove("d-none");
    },
    enterInput(event) {
      let input = event.target;
      input.classList.add("d-none");
      const taskId = input.parentNode.id;

      this.$store.dispatch("redTask", {
        id: taskId,
        description: this.description,
      });

      const li = document.getElementById(String(this.id));
      let spanReplaceable = li.querySelectorAll("span")[0];
      let span = document.createElement("span");
      span.classList.add("text-white", "description");
      span.innerText = this.description;
      spanReplaceable.replaceWith(span)
    },
  },
};
</script>

<style>
img:hover {
  cursor: pointer;
}
.done > .description {
  text-decoration: line-through;
  color: #484848;
}
.description {
  margin-right: 12px;
}
.project-name, .datetime-of-completion {
  margin-right: 12px;
}
.red-task-name-btn {
  margin-right: 5px;
}
.del-task-btn:active,
.del-task-btn:hover,
.del-task-btn {
  text-decoration: none;
  color: #999999;
}
</style>
