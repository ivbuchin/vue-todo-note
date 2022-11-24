import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";
const NOTEBOOKS_URL = "notebooks/";
const NOTES_URL = "notes/";

export default {
  state: {
    notebooks: [],
    notes: [],
    noteId: 0,
    noteTitle: "",
    noteText: "",
    showAddNoteBtn: true,
    noteNotebookId: undefined,
    showAddNotebookForm: false,
    notebookNameAdd: "",
    notebookNameRed: "",
    showModalRedNote: false,
  },
  getters: {
    notebooks(state) {
      return state.notebooks;
    },
    noteId(state) {
      return state.noteId;
    },
    noteTitle(state) {
      return state.noteTitle;
    },
    noteText(state) {
      return state.noteText;
    },
    showAddNoteBtn(state) {
      return state.showAddNoteBtn;
    },
    noteNotebookId(state) {
      return state.noteNotebookId;
    },
    notes(state) {
      return state.notes;
    },
    notebookNameAdd(state) {
      return state.notebookNameAdd;
    },
    notebookNameRed(state) {
      return state.notebookNameRed;
    },
    showAddNotebookForm(state) {
      return state.showAddNotebookForm;
    },
    showNoteDetail(state) {
      return state.showNoteDetail;
    },
  },
  mutations: {
    setNotebooks(state, notebooks) {
      state.notebooks = notebooks;
    },
    addNotebook(state, notebook) {
      state.notebooks.unshift(notebook);
    },
    redNotebook(state, data) {
      const id = data.id
      const newName = data.newName

      state.notebooks.forEach(function(notebook) {
        if (notebook.id == id) {
          notebook.name = newName
        }
      })
    },
    removeNotebook(state, index) {
      state.notebooks.splice(index, index);
    },
    setNotes(state, notes) {
      state.notes = notes;
    },
    addNote(state, note) {
      state.notes.unshift(note);
    },
    redNote(state, id) {
      let note = state.notes.find((note) => note.id == id);
      note.title = state.noteTitle;
      note.text = state.noteText;
      note.notebook = state.noteNotebookId;
    },
    removeNote(state, index) {
      state.notes.splice(index, 1);
    },
    setNoteId(state, id) {
      state.noteId = id;
    },
    setNoteTitle(state, title) {
      state.noteTitle = title;
    },
    setNoteText(state, text) {
      state.noteText = text;
    },
    setShowAddNoteBtn(state, value) {
      state.showAddNoteBtn = value;
    },
    setNoteNotebookId(state, strId) {
      state.noteNotebookId = Number(strId);
    },
    setShowAddNotebookForm(state, valueOfShow) {
      state.showAddNotebookForm = valueOfShow;
    },
    setNotebookNameAdd(state, name) {
      state.notebookNameAdd = name;
    },
    setNotebookNameRed(state, name) {
      state.notebookNameRed = name;
    },
    setShowNoteDetail(state, valueOfShow) {
      state.showNoteDetail = valueOfShow;
    },
  },
  actions: {
    addNotebook(context) {
      const token = window.localStorage.getItem("token");

      axios({
        method: "post",
        url: API_URL + NOTEBOOKS_URL,
        headers: { Authorization: "Token " + token },
        data: {
          name: context.getters.notebookNameAdd,
        },
      }).then((response) => {
        let newNotebook = {
          id: response.data.id,
          name: response.data.name,
        };

        context.commit("addNotebook", newNotebook);
      });
    },
    redNotebook(context, id) {
      const token = window.localStorage.getItem("token");
      const newName = context.getters.notebookNameRed

      axios({
        method: "put",
        url: API_URL + NOTEBOOKS_URL + id + "/",
        headers: { Authorization: "Token " + token },
        data: {
          id: id,
          name: newName,
        },
      });
      context.commit("redNotebook", {id, newName})
    },
    removeNotebook(context, data) {
      const token = window.localStorage.getItem("token");
      const event = data.event;
      const id = data.id;

      axios({
        method: "delete",
        url: API_URL + NOTEBOOKS_URL + id + "/",
        headers: { Authorization: "Token " + token },
        data: {
          id: id,
        },
      }).then((response) => {
        const notebook = context.getters.notebooks.find(
          (notebook) => notebook.id == id
        );
        const index = context.getters.notebooks.indexOf(notebook);
        context.commit("removeNotebook", index);
        event.target.parentNode.remove();
      });
    },
    showAllNotebooks(context) {
      const token = window.localStorage.getItem("token");

      axios({
        method: "get",
        url: API_URL + NOTEBOOKS_URL,
        headers: { Authorization: "Token " + token },
      }).then((response) => context.commit("setNotebooks", response.data));
    },

    addNote(context) {
      if (context.getters.noteTitle != "") {
        const token = window.localStorage.getItem("token");

        axios({
          method: "post",
          url: API_URL + NOTES_URL,
          headers: { Authorization: "Token " + token },
          data: {
            title: context.getters.noteTitle,
            text: context.getters.noteText,
            notebook: context.getters.noteNotebookId,
          },
        }).then((response) => {
          const newNote = {
            id: response.data.id,
            title: response.data.title,
            text: response.data.text,
            notebook: response.data.notebook,
            updated_at: response.data.updated_at,
          };

          context.commit("addNote", newNote);
          context.commit("setNoteTitle", "");
          context.commit("setNoteText", "");
          context.commit("setNoteNotebookId", undefined);
        });
      }
    },
    redNote(context, id) {
      const token = window.localStorage.getItem("token");

      if (context.getters.noteNotebookId === 0) {
        context.commit("setNoteNotebookId", undefined)
      }

      axios({
        method: "put",
        url: API_URL + NOTES_URL + id + "/",
        headers: { Authorization: "Token " + token },
        data: {
          title: context.getters.noteTitle,
          text: context.getters.noteText,
          notebook: context.getters.noteNotebookId,
        },
      });

      context.commit("redNote", id);
      context.commit("setNoteTitle", "")
      context.commit("setNoteText", "")
      context.commit("setNoteNotebookId", undefined)
    },
    removeNote(context, id) {
      const token = window.localStorage.getItem("token");

      axios({
        method: "delete",
        url: API_URL + NOTES_URL + id + "/",
        headers: { Authorization: "Token " + token },
      });

      const note = context.getters.notes.find((note) => note.id == id);
      const index = context.getters.notes.indexOf(note);
      context.commit("removeNote", index);
      context.commit("setNoteTitle", "")
      context.commit("setNoteText", "")
      context.commit("setNoteNotebook", "")
    },

    showAllNotes(context) {
      const token = window.localStorage.getItem("token");

      axios({
        method: "get",
        url: API_URL + NOTES_URL,
        headers: { Authorization: "Token " + token },
      }).then((response) => context.commit("setNotes", response.data));
    },
    showNotesOfNotebook(context, notebookId) {
      const token = window.localStorage.getItem("token");

      axios({
        method: "get",
        url: API_URL + NOTES_URL,
        headers: { Authorization: "Token " + token },
      }).then((response) => {
        const notes = response.data;
        const notesOfNotebook = notes.filter(
          (note) => note.notebook == notebookId
        );
        context.commit("setNotes", notesOfNotebook);
      });
    },
  },
};
