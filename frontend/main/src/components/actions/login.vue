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
        <button id="login-button" @click=" login()">LOGIN</button>
        
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
        hide: true
    }),
/*
    props:
        ['hideModale'],
  */      
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
                }
            })
            
            .catch(() => console.log("erreur identifiant"))
        },
    }
}
</script>

<style scoped>

    #login-button{
        width: 100%;
    }

</style>


