<template>
    <div id="connexion">
        <signup/>
        <login/>
        <logout/>
    </div>
</template>



<script>

import signup from '../components/actions/signup'
import login from '../components/actions/login'
import logout from '../components/actions/logout'

export default {
    name: 'Connexion',
    components:{
        signup, login, logout
    }
}
</script>
