<template>
  <div style="margin-bottom: 50px">
    <a
      v-if="showAddNoteBtn"
      class="btn btn-success"
      data-bs-toggle="modal"
      href="#ModalToggle"
      role="button"
    >
      Add note
    </a>

    <div
      class="modal fade"
      id="ModalToggle"
      aria-hidden="true"
      aria-labelledby="ModalToggleLabel"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="ModalToggleLabel">Adding a note</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form
              class="d-flex justify-content-center align-items-center mb-4"
              @submit.prevent="addNote"
            >
              <div class="form-outline form-white flex-fill">
                <input
                  type="text"
                  placeholder="Enter the title of the note..."
                  class="form-control"
                  v-model="noteTitle"
                />
                <input
                  type="text"
                  placeholder="Text of the note..."
                  class="form-control"
                  v-model="noteText"
                />
                <select name="notebook" v-model="noteNotebookId">
                  <option v-for="notebook in notebooks" :value="notebook.id">
                    {{ notebook.name }}
                  </option>
                </select>
              </div>
              <button
                type="submit"
                id="btn-add-task"
                class="btn btn-success ms-2 text-white"
                data-bs-dismiss="modal"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["notebooks"]),
    showAddNoteBtn: {
      get() {
        return this.$store.getters.showAddNoteBtn;
      },
      set(value) {
        this.$store.commit("setShowAddNoteBtn", value);
      },
    },
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
    ...mapActions(["addNote"]),
  },
};
</script>
