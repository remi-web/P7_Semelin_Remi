<template>
    <div id="formSignup">
        <form id="form" >
        <main>
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
                    <input type="email" class="email" name="email"  placeholder="e-mail" v-model="email" required>
                </div>
                <div class="input">
                    <label for="name"></label>
                    <input type="text" id="pseudo" name="pseudo" placeholder="pseudo" v-model="pseudo">
                </div>
                <div class="input">
                    <label for="name"></label>
                    <input type="text" class="password" name="password" placeholder="mot de passe" v-model="password">
                </div>
                
                <button id="signup-button" @click.prevent.stop="signup()">SIGNUP</button>
                <p id="email-message" v-if="emailMessage">email invalide ou dejà enregistré</p>
        </main>

        </form>
    </div>
</template>

<script>
const axios= require ('axios');

export default {

    name:"signup",

    data:() => ({
        firstName:"",
        lastName:"",
        email:"",
        pseudo:"",
        password:"",
        emailMessage: false
        
    }),

    methods: {
        signup(){
            axios.post('http://localhost:3000/api/auth/signup',{
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName,
                pseudo: this.pseudo,
                password: this.password,
                roleId: 1
            })
            .then(() => {
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
                        }
                    })
                })
                .catch(() =>{
                    this.emailMessage = true 
                    console.log("erreur de connexion")
                })

            .catch(() => {
                console.log("erreur inscription")
            })
        }
    }
}
</script>

<style>


    #formSignup {
        width: 50%;
        margin-bottom: 10%;
        margin-top: 10%;
        display: flex;
        justify-content: center;
        
        
    };
    main .input #last-name{
            margin: 5%;
    }

    main{
        margin-bottom: 10%;
    }
    #signup-button{
        margin: 5%;
        width: 100%;
    }

</style>
