<template>
    <div>
        <button @click="displayLogin()" class="login signup-button">Connexion</button>
        <button @click="displaySignup()" class="signup-button signup">Inscription</button>
        <modale class="modale" 
            :reveal="reveal" 
            :login="login" 
            :signup="signup"
            @isConnected="hideWelcome()" 
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
        },
        hideWelcome(){
            this.$emit('hideWelcome')
        }
    }
}
</script>

<style>

    .login{
        box-shadow: 1px 1px 10px -3px rgb(172, 110, 110);
        font-size: 1.2em;
    }
    .signup{
        margin-left: 8%;
        font-size: 1.2em;
        
    }

    

</style>

