<template>
  <Users/>
</template>

<script>
/** render the Users component, set basic styles. */
import Users from './components/Users.vue'

export default {
  name: 'App',
  components: {
    Users,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
