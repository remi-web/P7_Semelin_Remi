<template>
    <div class="container">
        <button @click="login()" id="login-button">Connexion</button> ou <button id="signup-button">Inscription</button>
            <modale :reveal="reveal"></modale>
    </div>
   
</template>

<script>
 import modale from '../components/modale'

export default {
    name: "acceuil",
    components:{
        modale
    },

    data: () =>({
        reveal: false
    }),

    methods:{
        login(){
            this.reveal = true
        }
    }
}
</script>
