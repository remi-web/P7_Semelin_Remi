<template>
    <div>
        <button @click="displayLogin()" class="login signup">Connexion</button>ou
        <button @click="displaySignup()" class="signup login">Inscription</button>
        <modale class="modale" 
            :reveal="reveal" 
            :login="login" 
            :signup="signup" 
            @unreveal="hideModale()"
            @undisplay="undisplay()"></modale>
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
        },
        undisplay(){
            this.login = false
        }
    }
}
</script>

<style>

  .login{
      margin-right: 10%;
      opacity: 0.6;
    /* border: solid 1px; */
    /* border-radius: 4px; */
    box-shadow: 1px 1px 10px -3px rgb(172, 110, 110);
    font-size: 1.2em;
  }
  .signup{
      margin-left: 10%;
      
  }

</style>

