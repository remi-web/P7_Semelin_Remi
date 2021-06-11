<template>
    <div id="logout">
        <button @click="logout" id="logout-button" >se déconnecter</button>
    </div>
</template>

<script>

export default {
    name:"logout",

    methods: {
        logout(){
            window.confirm('voulez vous vous déconnecter ?');{
                if(confirm){
                    localStorage.removeItem('token', 'userId')
                    this.$router.push('acceuil')
                }
            
            
            }
        }
    }
}

</script>
