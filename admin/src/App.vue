<template>
  <div id="app">
    <router-view :key="$route.path"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
html,body{
  padding: 0;
  margin: 0;
  height: 100%;
}

#app {
  height: 100%;
}
</style>

