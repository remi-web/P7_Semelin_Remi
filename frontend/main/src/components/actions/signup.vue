<template>
    <div id="formSignup">
        <form>
        <main class="form">

            <div class="text-infos">
                <p id="veuillez">Veuillez renseigner le formulaire</p><br>
                <p id="password-infos">le mot de passe doit contenir au moins 8 caractères, 1 majuscule et 1 chiffre</p>
            </div>

                <div class="input">
                    <label for="name"></label>
                    <input class="input" id="lastName" type="text" name="lastName" placeholder="Nom" v-model="lastName">
                </div>

                <div class="input">
                    <label for="name"></label>
                    <input class="input" type="text" name="firstName" placeholder="Prenom" v-model="firstName">
                </div>
                <div class="input">
                    <label for="mail"></label>
                    <input class="input" type="email" name="email"  placeholder="e-mail" v-model="email" required>
                </div>
                <div class="input">
                    <label for="name"></label>
                    <input class="input" type="text" name="pseudo" placeholder="pseudo" v-model="pseudo">
                </div>
                <div class="input">
                    <label for="name"></label>
                    <input class="input" type="text" name="password" placeholder="mot de passe" v-model="password">
                </div>
                
                <button class="signup-button" @click.prevent.stop="signup()">SIGNUP</button>
                <p id="email-message" v-if="emailMessage">email invalide, dejà enregistré ou mot de passe trop faible</p>
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

    .form{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
   
    .signup-button{
        margin-top: 5%;
        width: 84%;
        box-shadow: 1px 1px 10px -3px gray;
        background: rgba(250, 43, 43, 0.116);
        border-radius: 8px;
        color: rgba(10, 8, 114, 0.521);
        border: none;
        padding: 4%;
    }
    .input{
        padding: 2%;
        width: 90%;
        margin-bottom: 6%;
        height: 30px;
        border: none;
        border-radius: 8px;
        margin-left: 2%;
    
    
    }
    .text-infos{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    #password-infos{
        margin-left: 50px;
        margin-right: 50px;
        text-align: center;
    }
    #veuillez{
        color: rgba(10, 8, 114, 0.623);
        font-size: 1.2em;
    }
   
    
   

</style>
