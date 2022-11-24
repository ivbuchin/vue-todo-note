<template>
  <div id="profile">
    <button button class="btn btn-outline-success" 
            @click="toggleShow">
      {{ username }}
    </button>
    <transition name="fade">
      <button
        v-if="show"
        id="btn-logout"
        class="btn"
        :class="classLogout"
        @mouseover="this.classLogout = 'btn-outline-danger'"
        @mouseleave="this.classLogout = 'btn-outline-secondary'"
        @click="logout"
      >
        Log out
      </button>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: function () {
    return {
      classLogout: "btn-outline-secondary",
    };
  },
  computed: {
    ...mapGetters(["user", "username", "show"]),

    username() {
      if (this.$store.getters.username) {
        return this.$store.getters.username;
      } else {
        return this.$store.getters.user.username;
      }
    },
  },
  methods: {
    ...mapActions(["logout"]),

    toggleShow() {
      this.$store.commit("setShow", !this.$store.getters.show);
    },
  },
};
</script>

<style>
#profile {
  position: fixed;
  right: 0;
}
#btn-logout {
  float: left;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
