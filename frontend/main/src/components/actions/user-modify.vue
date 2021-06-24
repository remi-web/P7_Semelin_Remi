<template>
    <div>
        <div class="input">
                    <label for="name"></label>
                    <input id="last-name" type="text" name="lastName" placeholder="Nom" v-model="lastName">
                </div>
                <div class="input">
                    <label for="name"></label>
                    <input type="text" id="first-name" name="firstName" placeholder="Prenom" v-model="firstName">
                </div>
                <div class="input">
                    <label for="mail"></label>
                    <input type="email" class="email" name="email" placeholder="e-mail" v-model="email">
                </div>
                <div class="input">
                    <label for="name"></label>
                    <input type="text" id="pseudo" name="pseudo" placeholder="pseudo" v-model="pseudo">
                </div>
                <div class="input">
                    <label for="name"></label>
                    <input type="text" class="password" name="password" placeholder="mot de passe" v-model="password">
                </div>
                <button id="signup-button" @click="modify()">MODIFIER</button>
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
        password:""
        
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
                //roleId: 1
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
            })
            .catch(() => console.log("erreur modification"))

        }
    }
}
</script>