<template>
    <div class="container">
        <button @click="displayLogin()" class="mes-infos login">Connexion</button>ou
        <button @click="displaySignup()" class="mes-infos signup">Inscription</button>
        <modale class="modale" 
            :reveal="reveal" 
            :login="login" 
            :signup="signup" 
            @unreveal="hideModale()"></modale>
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
        
        hideModale(){
            this.reveal = false
            this.login = false
            this.signup = false
        },

        displayLogin(){
            this.reveal = !this.reveal
            this.login = true
           
        },
        displaySignup(){
            this.reveal = !this.reveal
            this.signup = true
        }
    }
}
</script>

<style>

  .container{
    display: flex;
    justify-content: center;
    align-items: center;
    
  }
  #signup-button{
      width: 10%;
  }
  #login-button{
      margin-right: 5%;
  }
  .login{
      margin-right: 10%;
  }
  .signup{
      margin-left: 10%;
  }

</style>

