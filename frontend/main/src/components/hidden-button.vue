<template>
    <div>
        <button @click="hideModale()"  class="button-close">X</button>
        <modale :reveal="this.reveal"></modale>
    </div>

</template>

<script>
import modale from '../components/modale'

    export default {
  components: { modale },
        name:"hiddenButton",
        reveal: false,
    
    
        methods:{
            hideModale(){
                this.reveal = false
            },
        }
    }

</script>
