<template>
    <div id="formSignup">
        
            <main class="form">
                <form action="login" method="post">

                <div class="input-login">
                    <label  for="mail"></label>
                    <input class="input-login" type="email"  name="email" placeholder="email" v-model="email">
                </div> 

                <div class="input-login">
                    <label  for="name"></label>
                    <input class="input-login" type="text"  name="password" placeholder="mot de passe" v-model="password">
                </div>
            </form>
        </main>
        
        <div v-if="loginButton">
            <button  class="signup-button login-button" @click.stop="login()">LOGIN</button>
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
                this.$emit('unreveal')
                this.$emit('isConnected')
                // this.$router.reload()
                }
            })
            
            .catch(() => {
                console.log("erreur identifiant")
                this.$emit('unauthorized')

            })
        },
        /*
        hideModale(){
            this.$emit('unreveal')
        }
        */
    }
}
</script>

<style>

    

    .input-login{
        padding: 2%;
        width: 90%;
        margin-bottom: 6%;
        height: 30px;
        border: none;
        border-radius: 8px;
        margin-right: 90px;
        margin-left: 10px;
    }
    .login-button{
        margin-left: 8%;
        margin-right: 8%;
    }

</style>


