<script src="http://localhost:8098"></script>
<template>
  <div id="app">
     <div id="nav">
            <router-link class="baner-txt"  to="/home">home</router-link>
            <router-link class="baner-txt" to="/messagerie">messagerie</router-link>
            <router-link class="baner-txt" to="/profil">profil</router-link>
            <!-- <router-link class="baner-txt" to="/connexion">connexion</router-link> -->
        </div> 
    <!-- <Home/> -->
      <connexion id="acceuil"  v-if="!isConnected"></connexion>
    
    <router-view/>
  </div>
</template>

<script>
 import connexion from './views/connexion'

export default {
  name: 'App',
  components: {
     connexion,
  },


  computed: {
       isConnected(){
            if(localStorage.token){
                return true
            }
            return false
        }
  }
}
</script>



<style>
  #app{
    background-color: rgb(233, 227, 219);
    padding: 5%;
  }
  #acceuil{
    position: fixed;
        top: 0%;
        bottom: 0%;
        left: 0%;
        right: 0%;
        display: flex;
        justify-content: center;
        align-items: center;
    
  }
  .baner-txt{
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    padding: 2%;

  }

  #nav a.router-link-exact-active {
  color: #20355F;
  text-decoration: underline;
  }
  
</style>

