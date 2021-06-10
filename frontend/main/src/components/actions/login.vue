<template>
    <div id="form-login">
        <form action="login" method="post">
            <div id="inputs">
                <div>
                    <label for="mail"></label>
                    <input type="email" class="email" name="email" placeholder="email" v-model="email">
                </div>        
                <div>
                    <label for="name"></label>
                    <input type="text" class="password" name="password" placeholder="mot de passe" v-model="password">
                </div>
                <button @click="login">LOG</button>
            </div>
        </form>
    </div>
</template>
<script>

const axios = require ('axios');

export default {

    name:"login",

    data:() => ({
        email:"",
        password:""
    }),

    methods: {
        login(){
            axios.post ('http://localhost:3000/api/auth/login', {
                    email: this.email,
                    password: this.password
                })
                .then((res) => {
                    console.log(res)
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('userId', res.data.userId)
                    // window.confirm("Bienvenue ! " )
                        // window.location.href = "/home.vue"
                    
                })
                .catch(() => console.log("erreur identifiant"))
        }
    }
}
</script>

<style>

    #form-login{
        border: solid;
        width: 50%;
        margin-bottom: 10%;
        margin-top: 10%;
        display: block;
        margin-left: auto;
        margin-right: auto;
        /* flex-direction: column; */
    }
    #inputs{
        margin-left: auto;
        margin-right: auto;
    }
</style>