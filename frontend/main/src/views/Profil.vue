<template>
  <div class="profil">
    <Baner/>

    <modale
        :reveal="reveal" 
        :logout="logout" 
        :userId="this.id"
        :userModification="userModify"
        :userSuppr="userDelete"
        @unreveal="hideModale()"
        @undisplay="undisplay()"
        @getUserInfos="getUserInfos()">
      </modale>

      <div class="mes-infos">
          <button class="button-logout mes-infos"  @click="displayUserModify()">modifier mes informations</button>
          <button class="button-logout mes-infos"  @click="displayUserDelete()">supprimer mon compte</button>
      </div>

      <ul class="user-infos">
          <p class="name" >Nom</p><li class="attribute">{{ lastName }}</li>
          <p class="name" >Prenom</p><li class="attribute">{{ firstName }}</li>
          <p class="name" >email</p><li class="attribute">{{ email }}</li>
          <p class="name" >pseudo</p><li class="attribute">{{ pseudo }}</li>
      </ul>

      <div class="mes-infos">
          <button class="button-logout" @click="displayLogout()">se déconnecter</button>
      </div>

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
        // login: false,
        logout: false,
        id: localStorage.getItem('userId'),
        firstName:"",
        lastName: "",
        pseudo: "",
        email: "",
        userPassword: "",
        userModify: false,
        userDelete: false
    }),

    methods:{

        displayLogout(){  //display message in modale
            this.reveal = true
            this.logout = true
        },

        displayUserModify(){  
          console.log(this.id)
            this.reveal = true
            this.userModify = true
        },

        displayUserDelete(){  
            this.reveal = true
            this.userDelete = true
        },
        
        undisplay(){      // undisplay message in modale
          this.logout = false
          this.userModify = false
          this.userDelete = false
        },

        hideModale(){
          this.undisplay()
          this.reveal = false
        },

        getUserInfos(){
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
        }
        
    },
    
    beforeMount(){
            this.getUserInfos()
      },
      
}
</script>

<style>


  .button-log{
    margin-top: 10%;

  }
  .user-infos{
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  } 
  .button-logout{
    /* margin-left: 30%; */
    padding: 4%;
    margin-top: 20%;
    background: rgba(250, 43, 43, 0.116);
    border: none;
    border-radius: 8px;
    font-size: 1.2em;
    color: rgba(10, 8, 114, 0.521);
    box-shadow: 1px 1px 10px -3px gray;
  }
   .mes-infos{
    margin-top: 0;
    display: flex;
    justify-content: center;
    margin-top: 5%;
    margin-bottom: 5%;
    margin-right: 2%;
    margin-left: 2%;
    padding: 2%;
    font-size: 0.9em;
  }
  .attribute{
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    display: flex;
    justify-content: center;
    border: none;
    /* border-radius: 8px; */
    width: 70%;
    margin-bottom: 3%;
    padding: 2%;
    box-shadow: -1px 0px 4px 0px gray;
    /* background: rgba(248, 2, 2, 0.089); */

  }
  .name{
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    color:rgb(94, 93, 93);
  }

</style>