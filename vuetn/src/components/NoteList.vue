<template>
  <div class="fade show" v-if="!showNoteDetail">
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <transition-group name="note-list">
        <NoteItem
          v-for="note in notes"
          :key="note.id"
          :id="note.id"
          :title="note.title"
          :text="note.text"
          :notebook="note.notebook"
          :updated_at="note.updated_at"
        />
      </transition-group>
    </div>
  </div>

  <NoteDetail v-else />
</template>

<script>
import { mapGetters } from "vuex";
import NoteItem from "@/components/NoteItem";
import NoteDetail from "@/components/NoteDetail";

export default {
  components: {
    NoteItem,
    NoteDetail,
  },
  computed: {
    ...mapGetters(["notes", "showNoteDetail"]),
  },
};
</script>

<style scoped>
.note-list-item {
  display: inline-block;
  margin-right: 10px;
}
.note-list-enter-active,
.note-list-leave-active {
  transition: all 0.5s ease;
}
.note-list-enter-from,
.note-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
