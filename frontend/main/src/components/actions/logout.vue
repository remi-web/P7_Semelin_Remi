<template>
    <div id="logout">
        <p>Etes vous sur de vouloir vous déconnecter ?</p>
        <button @click="logout()" class="button">OUI</button>
    </div>
</template>

<script>

export default {
    name: "logout",
    components:{
        
    },

    data: () =>({
        reveal: false
    }),

    methods: {
        logout(){
            localStorage.removeItem('token')
            this.$router.push('connexion')
        }
    }
}

</script>
