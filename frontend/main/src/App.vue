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
      <acceuil id="acceuil" :isConnected=this.isConnected v-if="!connected"></acceuil>
    
    <router-view/>
  </div>
</template>

<script>
 import logout from './components/actions/logout'
 import acceuil from './views/acceuil'



export default {
  name: 'App',
  components: {
    logout, acceuil,
  },

  data: () => ({
    connected: true
  }),

  methods: {
       isConnected(){
            if(!localStorage.token){
                this.connected = false
            }
        }
  }
}
</script>



<style>

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

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

