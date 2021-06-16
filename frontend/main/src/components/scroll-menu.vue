<template>
    <div class="bloc-modale" v-if="revealScrollMenu">
        <div class="overlay" @click="hideScrollMenu"></div>
        <div class="modale cart">

            <div v-if="revealScrollMenu">  
                <!-- <modify-article></modify-article> -->
                <delete-article></delete-article>
            </div>
            
            
        </div>
    </div>
</template>

<script>
import deleteArticle from './actions/delete-article'
// import modifyArticle from './actions/modify-article'



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
    .bloc-modale{
        
        /* position: fixed; */
        /* top: 0%; */
        /* bottom: 0%; */
        /* left: 0%; */
        /* right: 0%; */
        /* display: flex; */
        /* justify-content: center; */
        /* align-items: center; */
        z-index: 1;
    }

    .overlay{
        /* background: rgba(0, 0, 0, 0.7); */
        /* position: fixed; */
        /* top: 0%; */
        /* bottom: 0%; */
        /* left: 0%; */
        /* right: 0%; */
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