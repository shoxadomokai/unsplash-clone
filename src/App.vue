<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from "@/views/Home";
export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,700|Ubuntu:400,500,700");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat";
}
</style>
