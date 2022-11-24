<template>
  <div>
    <div class="form-outline form-white flex-fill">
      <input type="text" v-model="noteTitle" class="form-control" />
      <textarea v-model="noteText" class="form-control"></textarea>

      <span>Выбрать другой блокнот:</span>
      <select v-model="noteNotebookId">
        <option v-for="notebook in notebooks" :value="notebook.id">
          {{ notebook.name }}
        </option>
      </select>
    </div>

    <button
      type="submit"
      class="btn btn-success ms-2 text-white"
      @click="redNote(noteId), closeNoteDetail()"
    >
      Save
    </button>
    <a href="#" class="btn btn-danger del-note-btn" @click="removeNote(noteId), closeNoteDetail()">Delete</a>
    
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters([
      "noteId",
      "noteTitle",
      "noteText",
      "noteNotebookId",
      "notebooks",
    ]),

    noteTitle: {
      get() {
        return this.$store.getters.noteTitle;
      },
      set(value) {
        this.$store.commit("setNoteTitle", value);
      },
    },
    noteText: {
      get() {
        return this.$store.getters.noteText;
      },
      set(value) {
        this.$store.commit("setNoteText", value);
      },
    },
    noteNotebookId: {
      get() {
        return this.$store.getters.noteNotebookId;
      },
      set(value) {
        this.$store.commit("setNoteNotebookId", value);
      },
    },
  },
  methods: {
    ...mapActions(["redNote", "removeNote"]),

    closeNoteDetail() {
      this.$store.commit("setShowNoteDetail", false);
      this.$store.commit("setShowAddNoteBtn", true);
    },
  },
};
</script>

<style>
.del-note-btn {
  margin-left: 20px
}
</style>