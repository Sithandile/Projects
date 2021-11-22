<template>
  <div id="app" class="logo">
    <img src="./assets/TLogo.png">
    <List/>
    <router-view/>
  </div>
</template>

<script>
import List from './components/List.vue'

export default {
    name: "App",
    components: { List }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
  font-weight: 400;
}
body {
  background-image: url('./assets/food-background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  text-shadow: 0 .05rem .1rem  rgb(122, 119, 119);
  min-height: 100%;
  min-width: 100%;
  position: fixed;
}
.logo {
display: block;
margin: 20px auto;
height: 40px;
}
img {
  margin: 20px auto;
  position:absolute;
  top: 0;
  left: 0;
  width: 150px;
}
</style>
