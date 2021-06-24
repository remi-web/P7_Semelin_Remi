<template>
    <div id="logout">
        <p>Etes vous sur de vouloir vous déconnecter ?</p>
        <button @click="logout()" class="button mesinfos">OUI</button>
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
            localStorage.removeItem('userId')
            this.$router.push('/')
            this.$router.go('/')
        }
    }
}

</script>
