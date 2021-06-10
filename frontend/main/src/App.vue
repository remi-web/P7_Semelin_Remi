<template>
  <div id="app">
     <div id="nav">
       
            <router-link class="baner-txt"  to="/home">home</router-link>
            <router-link class="baner-txt" to="/messagerie">messagerie</router-link>
            <router-link class="baner-txt" to="/profil">profil</router-link>
            <router-link class="baner-txt" to="/connexion">connexion</router-link>
        </div> 
    <!-- <Home/> -->
    <router-view/>
  </div>
</template>

<script>
// import Home from './views/Home'

export default {
  name: 'App',
  components: {
    // Home
  }
}
</script>



<style>

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

