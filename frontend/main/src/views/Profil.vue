<template>
  <div class="profil">
    <Baner/>

    <modale
        :reveal="reveal" 
        :logout="logout" 
        :login="login" 
        @unreveal="hideModale()">
      </modale>

    <button id="mes-infos">Mes infos</button>
      <ul class="user-infos">
          <li class="attribute">Nom: <p class="name" >{{ lastName }}</p>
          </li>
          <li class="attribute">Prenom: <p class="name" >{{ firstName }}</p>  
          </li>
          <li class="attribute">email: <p class="name" >{{ email }}</p>
          </li>
          <li class="attribute">pseudo: <p class="name" >{{ pseudo }}</p>
          </li>
    </ul>

    <button class="button-log" @click="displayLogout()" id="logout-button">Se déconnecter</button>


  </div>
</template>


<script>
const axios = require ('axios');

import Baner from '../components/baner'
import modale from '../components/modale'


export default {
    name: 'Profil',
    components: {
      Baner, modale
    },

    data:() => ({
        reveal: false,
        login: false,
        logout: false,
        id: localStorage.getItem('userId'),
        firstName:"",
        lastName: "",
        pseudo: "",
        email: "",
        userPassword: ""
    }),

    methods:{

        displayLogout(){
            this.reveal = true
            this.logout = true
        },
        hideModale(){
            this.reveal = false
            this.login = false
            this.logout = false
            this.userInfoAccess = false
            console.log(this.firstName)
        },
        displayLogin(){
            this.reveal = !this.reveal
            this.login = true
            // console.log(this.userInfoAccess)
        },
        
    },
    beforeMount(){
            axios.get('http://localhost:3000/api/auth/user/'+this.id, {
              
                headers: {
                    'authorization': 'bearer ' + localStorage.getItem('token'),
                }
            })
            .then((user) => {
                console.log(user)
                this.firstName = user.data.user.firstName,
                this.lastName = user.data.user.lastName,
                this.pseudo = user.data.user.pseudo,
                this.email = user.data.user.email
            })
      },
}
</script>

<style>

  .button-log{
    margin-top: 10%;

  }
  .user-infos{
    border: solid 1px;
    border-radius: 8px;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 3%;
    background: #f1f1f1;
    opacity: 0.6;
    width: 50%;
  }
  #mes-infos{
    margin-top: 10%;
    display: flex
  }
  
  .attribute{
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    display: flex;
    border: solid 1px;
    border-radius: 8px;
    width: 70%;
    margin-bottom: 3%;
    /* box-shadow: -1px 2px 10px 3px rgba(0, 0, 0, 0.3) inset; */
    box-shadow: -1px 0px 4px 0px gray
  }
  .name{
    margin-left: 20%;
  }

</style>