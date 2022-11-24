<template>
  <form @submit.prevent="createUser">
    <input
      type="text"
      name="username"
      placeholder="Username"
      v-model="username"
    />
    <input
      type="text"
      name="password"
      placeholder="Password"
      v-model="password"
    />
    <button type="register">Register</button>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["username", "password"]),
    username: {
      get() {
        return this.$store.getters.username;
      },
      set(value) {
        this.$store.commit("setUsername", value);
      },
    },
    password: {
      get() {
        return this.$store.getters.password;
      },
      set(value) {
        this.$store.commit("setPassword", value);
      },
    },
  },
  methods: {
    ...mapActions(["createUser"]),
  },
};
</script>
