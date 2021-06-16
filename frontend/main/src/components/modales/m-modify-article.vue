<template>
    <div class="bloc-modale" v-if="reveal">
        <div class="overlay" @click="hideModale"></div>
        <div class="modale cart">
            <button @click="hideModale()"  class="button-close">X</button>

            <div v-if="modifyArticle">
                <modifyArticle></modifyArticle>
            </div>

           
            
        </div>
    </div>
</template>

<script>


import modifyArticle from '../actions/modify-article'



export default {
    name: "modale",
    components: {
       modifyArticle
    },

    data: () => ({
        delete: true
    }),

    props:{
        
        reveal: {
            type: Boolean,
            default: false
        },
        hide:{
            type: Boolean,
            default: false
        },
       
        modifyArticle:{
            type: Boolean,
            default: false
        },               
    },

    methods:{
        hideModale(){
            this.reveal = !this.reveal
        },
    }

    
    
}
</script>

<style scoped>
    .bloc-modale{
        position: fixed;
        top: 0%;
        bottom: 0%;
        left: 0%;
        right: 0%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
    }

    .overlay{
        background: rgba(0, 0, 0, 0.7);
        position: fixed;
        top: 0%;
        bottom: 0%;
        left: 0%;
        right: 0%;
        z-index: -1;
    }

    .modale{
        background: #f1f1f1;
        color: #333;
        padding: 50px;
        position: fixed;
    }
    .button-close{
        background-color: red;
        position:absolute;
        top: 10px;
        right: 10px;
        color: white;
        border: none;
        border-radius: 15%;
        padding: 2%;
    }
</style>