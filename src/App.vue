<template>
  <div id="app">
    <NavBar/>
    <router-view/>

  </div>

</template>

<script>
import NavBar from "./components/NavBar";
import axios from "axios";

export default {
  name: 'App',
  components: {
      NavBar
  },
  async mounted() {
    const response = await axios.get('user');
    await this.$store.dispatch('user', response.data.user);
    this.user = response.data.user;
  },
  methods: {
  }
}
</script>

<style>

</style>
