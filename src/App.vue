<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->

      <login v-if="step === 'login'" ></login>
      <catalog v-if="step === 'catalog'" :userId='userId'></catalog>
      <p v-if="step === 'compleated'">Gracias por su compra</p>

    <!-- <router-view/> -->
  </div>
</template>
<script>
  import login from "./components/Login";
  import catalog from './components/Catalog';

  export default {
    name:'app',
    components: {
      login,
      catalog
    },
    data() {
      return {
        step: 'login',
        userId: null
      }
    },
    mounted() {
     
    },
  
}
</script>

<style lang="scss">
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
} */
</style>
