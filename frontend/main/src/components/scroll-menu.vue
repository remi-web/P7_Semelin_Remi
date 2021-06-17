<template>
    <div class="bloc-scroll" v-if="revealScrollMenu">
        <div class="overlay" @click="hideScrollMenu"></div>
        <div class="scroll cart"></div>
    </div>
</template>

<script>
import deleteArticle from './actions/delete-article'

export default {
    name: "scrollMenu",
    components: {
         deleteArticle
    },

    props:{
        
        revealScrollMenu: {
            type: Boolean,
            default: false
        },
        hide:{
            type: Boolean,
            default: false
        },
    },

    methods:{
        hideScrollMenu(){
            this.revealScrollMenu = false
        },
    }
}
</script>

<style scoped>
    .bloc-scroll{
        z-index: 1;
        background: silver;
    }

    .overlay{
    
        z-index: -1;
    }

    .modale{
        background: #f1f1f1;
        color: #333;
        padding: 10px;
        position: absolute;
        left: 87%;
        

    }
    
</style>