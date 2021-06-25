<template>
    <div>
        <div class="input-login">
            <label for="name"></label>
            <input class="input-login" id="last-name" type="text" name="lastName" placeholder="Nom" v-model="lastName">
        </div>

        <div class="input-login">
            <label for="name"></label>
            <input class="input-login" type="text" id="first-name" name="firstName" placeholder="Prenom" v-model="firstName">
        </div>

        <div class="input-login">
            <label for="mail"></label>
            <input class="input-login" type="email"  name="email" placeholder="e-mail" v-model="email">
        </div>

        <div class="input-login">
            <label for="name"></label>
            <input class="input-login" type="text" id="pseudo" name="pseudo" placeholder="pseudo" v-model="pseudo">
        </div>

        <div class="input-login">
            <label for="name"></label>
            <input class="input-login" type="text"  name="password" placeholder="mot de passe" v-model="password">
        </div>

        <button class="signup-button login-button" @click="modify()">MODIFIER</button>
        <p id="email-message" v-if="emailMessage">email non disponible</p>

    </div>
</template>

<script>
const axios= require ('axios');

export default {

    name:"userModify",

    data:() => ({
        firstName:"",
        lastName:"",
        email:"",
        pseudo:"",
        password:"",
        emailMessage: false
        
    }),

    props:{
        id:{
            type: String
        }
    },

    methods: {
        modify(){
            axios.put('http://localhost:3000/api/auth/user/'+this.id+'' , {
                prenom: this.lastName,
                nom: this.firstName,
                email: this.email,
                pseudo: this.pseudo,
                password: this.password,
            },
            {
                headers: 
                    {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
            })
            .then(res => {
                console.log(res)
                this.$emit('undisplay')
                this.$emit('modified')
                this.$emit('getUserInfos')
            })
            .catch(() => {
                this.emailMessage = true
                console.log("erreur modification")
            })

        }
    }
}
</script>