<template>
  <div id="app">
    <NavBar />
    <router-view ref = "home"/>

  </div>

</template>

<script>
import NavBar from "./components/NavBar";

export default {
  name: 'App',
  components: {
      NavBar
  },
  methods: {
  }
}
</script>

<style>

</style>
