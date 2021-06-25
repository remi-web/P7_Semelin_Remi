<script src="http://localhost:8098"></script><!--for vue dev tools-->
<template>
  <div id="app">
    
     <div id="nav">
        <router-link class="baner-txt" to="/home">home</router-link>
        <router-link class="baner-txt" to="/profil">profil</router-link>
      </div>

      <div id="welcome-message" v-if="welcome && !isConnected">
        <p  id="welcome">Bienvenue</p>
      </div>

       <img id="icon" src="./assets/icon1.svg" height="500px">

    <router-view/>
   
    <connexion id="connexion"  v-if="welcome && !isConnected" @hideWelcome="hideWelcome()"></connexion>

  </div>
</template>

<script>
 import connexion from './views/connexion'

export default {
  name: 'App',
  components: {
     connexion,
  },

  data: () => ({
    welcome: true
  }),

  methods:{
    hideWelcome(){
      this.welcome= false
    }
  },

  computed: {
       isConnected(){
            if(localStorage.token){
                return true
            }
            return false
        }
  },
}
</script>

<style>
 
    #icon{
      position: absolute;
      left: 0;
      z-index: -1;
      opacity: 0.8;
    }
  
    .baner-txt{
      font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
      padding: 2%;
    }
    #nav a.router-link-exact-active{
      color: rgb(75, 161, 219);
      text-decoration: underline;
    }
    
    #nav{
        display: flex;
        justify-content: space-evenly;
        border-radius: 8px;
        margin-bottom: 2%;
        margin-top: 2%; 
        background-color: #f1f1f1;
        box-shadow: 1px 1px 10px -3px grey;
    }
    .baner-txt{
        font-weight: lighter;
        color: rgb(220,0,100);
        text-decoration: none;
    }
    #icon{
      width: 100%;
    }
    #connexion{
      display: flex;
      justify-content: center;
    }
    #welcome-message{
      display: flex;
      justify-content: center;
      margin-top: 7%;
      font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
      font-size: 1.8em;
      color: rgb(172, 110, 110);
    }
   
</style>

