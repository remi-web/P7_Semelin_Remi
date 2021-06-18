<template>
  <div class="profil">
    <Baner/>

    <modale
        :reveal="reveal" 
        :logout="logout" 
        :login="login" 
        :userInfoAccess="userInfoAccess" 
        @unreveal="hideModale()">
      </modale>

    <button id="mes-infos" @click="userAccess(); displayLogin()">Mes infos</button>
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
import Baner from '../components/baner'
import modale from '../components/modale'
let user = JSON.parse(localStorage.getItem('userData'))
export default {
    name: 'Profil',
    components: {
      Baner, modale
    },

    data:() => ({
        reveal: false,
        login: false,
        logout: false,
        userInfoAccess: false,
        firstName: user.user.firstName,
        lastName: user.user.lastName,
        pseudo: user.user.pseudo,
        email: user.user.email
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
            console.log(user.user.firstName)
        },
        displayLogin(){
            this.reveal = !this.reveal
            this.login = true
            // console.log(this.userInfoAccess)
        },
        userAccess(){
          this.userInfoAccess = true
        },
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
    width: 50%;
    margin-bottom: 3%;
    /* box-shadow: -1px 2px 10px 3px rgba(0, 0, 0, 0.3) inset; */
    box-shadow: -1px 0px 4px 0px gray
  }
  .name{
    margin-left: 40%;
  }

</style>