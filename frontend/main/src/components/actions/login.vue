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
                
            </div>
        </form>
        <div v-if="loginButton">
            <button  class="login-button" @click="login()">LOGIN</button>
        </div>
        <div v-if="!loginButton">
            <button  class="login-button" @click="getUser(); hideModale()" >CONFIRM</button>
        </div>
        
        
    </div>
    
</template>
<script>

const axios = require ('axios');

export default {

    name:"login",
    components:{
        
    },

    data:() => ({
        email:"",
        password:"",
        hide: true,
        id: localStorage.getItem('userId'),
        firstName:"",
        lastName: "",
        pseudo: "",
        userPassword: ""
    }),

    props:{
        loginButton:{
            type: Boolean,
            default: true
        }
    },

    methods: {

        login(){
            axios.post ('http://localhost:3000/api/auth/login', {
                    email: this.email,
                    password: this.password
                })
                
            .then((res) => {
                if (res){
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('userId', res.data.userId)
                this.$router.push('home')
                this.$emit('connected')
                }
            })
            
            .catch(() => console.log("erreur identifiant"))
        },

        getUser(){
            
            axios.post('http://localhost:3000/api/auth/user/'+this.id, {
                email: this.email,
                password: this.password
                },
                {
                headers: {
                    'authorization': 'bearer ' + localStorage.getItem('token'),
                }
            })
            .then((res) => {
                console.log(res)
                localStorage.setItem('userData', JSON.stringify(res.data))
            })
        },
        hideModale(){
            this.$emit('unreveal')
        }
    }
}
</script>

<style>

    .login-button{
        width: 100%;
    }

</style>


