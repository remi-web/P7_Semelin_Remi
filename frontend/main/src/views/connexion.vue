<template>
    <div class="container">
        <button @click="displayLogin()" id="login-button">Connexion</button>ou
        <button @click="displaySignup()" id="signup-button">Inscription</button>
        <modale id="modale" :reveal="reveal" :login="login" :signup="signup" ></modale>
    </div>
   
</template>

<script>
 import modale from '../components/modale'

export default {
    name: "connexion",
    components:{
        modale,
    },

    data: () =>({
        reveal: false,
        login: false,
        signup: false        
    }),

    methods:{
        
        displayLogin(){
            this.reveal = true
            this.login = true
           
        },
        displaySignup(){
            this.reveal = true
            this.signup = true
        }
    }
}
</script>

<style>

  .container{
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

