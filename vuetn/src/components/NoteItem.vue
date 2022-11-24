<template>
  <div>
    <div class="card mb-3" :id="id">
      <div class="row g-0">
        <div class="col-md-8">
          <div class="card-body">
            <a @click="openNoteDetail" role="button">
              <h5 class="card-title">{{ title }}</h5>
            </a>
            <p class="card-text">{{ text }}</p>
            <p class="card-text">
              <small class="text-muted" v-if="notebookName"
                >{{ notebookName }} |
              </small>
              <small class="text-muted">{{ updated_at }}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import NoteDetail from "./NoteDetail";

export default {
  components: {
    NoteDetail,
  },
  props: {
    id: Number,
    title: String,
    text: String,
    notebook: Number,
    updated_at: String,
  },
  computed: {
    notebookName: function () {
      const notebooks = this.$store.getters.notebooks;
      const notebook = notebooks.find(
        (notebook) => notebook.id == this.notebook
      );
      if (notebook) {
        return notebook.name;
      }
    },
  },
  methods: {
    ...mapActions(["redNote"]),

    openNoteDetail() {
      this.$store.commit("setNoteId", this.id);
      this.$store.commit("setNoteTitle", this.title);
      this.$store.commit("setNoteText", this.text);
      this.$store.commit("setNoteNotebookId", this.notebook);
      this.$store.commit("setShowNoteDetail", true);
      this.$store.commit("setShowAddNoteBtn", false);
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
</style>
