<template>
  <div class="profil">
    <Baner/>

    <button class="button-log" @click="displayLogout()" id="logout-button">Se déconnecter</button>
    <modale  :reveal="reveal" :logout="logout" @unreveal="hideModale"></modale>

  </div>
</template>


<script>
import Baner from '../components/baner'
import modale from '../components/modale'

export default {
    name: 'Profil',
    components: {
      Baner, modale
    },

    data:() => ({
        reveal: false,
        logout: false
    }),

    methods:{

        displayLogout(){
            this.reveal = true
            this.logout = true
        },
        hideModale(){
            this.reveal = false
        },

    }
}
</script>

<style>

  .button-log{
    position: absolute;
    left: 46%;
  }

</style>