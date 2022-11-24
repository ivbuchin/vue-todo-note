<template>
  <form
    class="d-flex justify-content-center align-items-center mb-4"
    @submit.prevent="addTask"
  >
    <div class="form-outline form-white flex-fill row">
      <div class="form-outline form-white col-11">
        <input
          type="text"
          placeholder="Write a task..."
          class="form-control"
          v-model="taskDescription"
        />
      </div>

      <div class="form-outline form-white col-1">
        <button
          type="button"
          class="btn btn-dark"
          @click="menuAddTaskIsShown = !menuAddTaskIsShown"
        >
          ⌄
        </button>

        <div class="menu" v-show="menuAddTaskIsShown">
          <div>
            <input
              type="datetime-local"
              class="form-control"
              v-model="taskDatetimeOfCompletion"
            />
          </div>

          <div>
            <select name="priority" v-model="taskPriority">
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="none">None</option>
            </select>
          </div>

          <div>
            <select name="project" v-model="taskProjectId">
              <option v-for="project in projects" :value="project.id">
                {{ project.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <button
      type="submit"
      id="btn-add-task"
      class="btn btn-danger ms-2 text-white"
    >
      Add
    </button>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      menuAddTaskIsShown: false,
    };
  },
  computed: {
    ...mapGetters(["projects"]),
    taskDescription: {
      get() {
        return this.$store.getters.taskDescription;
      },
      set(value) {
        this.$store.commit("setTaskDescription", value);
      },
    },
    taskDatetimeOfCompletion: {
      get() {
        return this.$store.getters.taskDatetimeOfCompletion;
      },
      set(value) {
        this.$store.commit("setTaskDatetimeOfCompletion", value);
      },
    },
    taskPriority: {
      get() {
        return this.$store.getters.taskPriority;
      },
      set(value) {
        this.$store.commit("setTaskPriority", value);
      },
    },
    taskProjectId: {
      get() {
        return this.$store.getters.taskProjectId;
      },
      set(value) {
        this.$store.commit("setTaskProjectId", value);
      },
    },
  },
  methods: {
    ...mapActions(["addTask"])
  },
};
</script>

<style>
.menu {
  position: absolute;
}
</style>
