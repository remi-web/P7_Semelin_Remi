<template>
    <div>
        <p>Etes vous sûr de vouloir<br> supprimer votre compte ?</p>
        <div class="input">
            <div class="input">
                <label for="mail"></label>
                <input type="email" class="email" name="email" placeholder="e-mail" v-model="email">
            </div>
                
            <div class="input">
                <label for="name"></label>
                <input type="text" class="password" name="password" placeholder="mot de passe" v-model="password">
            </div>
            <button id="signup-button" v-if="this.email && this.password"  @click="suppr()">SUPPRIMER</button>
        </div>
    </div>
</template>

<script>
const axios= require ('axios');

export default {

    name:"userDelete",

    data:() => ({
        email: null,
        password: null
    }),

    props:{
        id:{
            type: String
        }
    },

    methods: {
        
        suppr(){
            axios.post('http://localhost:3000/api/auth/user', {
                email: this.email,
                password: this.password
            })
            .then(res => {
                console.log(res.status)
                
                    axios.delete('http://localhost:3000/api/auth/user/'+this.id+'' , {
                    headers: 
                        {Authorization: 'Bearer ' + localStorage.getItem('token')}            
                    })
                    .then(() => {
                        localStorage.removeItem('token')
                        localStorage.removeItem('userId')
                        this.$emit('undisplay')
                        this.$emit('deleted')
                        
                        
                    })
            })                
            .catch(() => {
                // this.$emit('undisplay')
                this.$emit('unauthorized')
            })
        }   
        
    }
}
</script>