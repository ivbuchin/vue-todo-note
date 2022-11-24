<template>
  <div class="fade show">
    <ul class="list-group mb-0">
      <transition-group name="task-list">
        <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :id="task.id"
          :description="task.description"
          :priority="task.priority"
          :project="task.project"
          :status="task.status"
          :datetime_of_completion="task.datetime_of_completion"
        />
      </transition-group>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TaskItem from "@/components/TaskItem";

export default {
  components: {
    TaskItem,
  },
  computed: {
    ...mapGetters(["tasks"]),
  },
};
</script>

<style scoped>
.task-list-item {
  display: inline-block;
  margin-right: 10px;
}
.task-list-enter-active, 
.task-list-leave-active {
  transition: all 0.5s ease;
}
.task-list-enter-from,
.task-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
