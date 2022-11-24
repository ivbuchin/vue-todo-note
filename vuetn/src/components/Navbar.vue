<template>
  <ul class="nav nav-tabs mb-4 pb-2" id="ex1" role="tablist">
    <li class="nav-item" role="link">
      <button class="nav-link" @click="clickActive">Active</button>
    </li>
    <li class="nav-item" role="link">
      <button class="nav-link" @click="clickDone">Done</button>
    </li>
    <li class="nav-item" role="link">
      <button class="nav-link" @click="clickAll">All</button>
    </li>
  </ul>
</template>

<script>
export default {
  methods: {
    clickAll() {
      this.$store.dispatch("showAllTasks");
    },
    clickActive() {
      this.$store.dispatch("showTodoTasks");
    },
    clickDone() {
      this.$store.dispatch("showDoneTasks");
    },
  },
};
</script>
