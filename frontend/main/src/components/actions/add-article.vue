<template>
   <div id="add-article">
       <button @click="addArticle=true">Publier un article</button>
       <template v-if="addArticle">
            <textarea name="text-input" id="post-text-area" cols="30" rows="10" v-model="body"></textarea>
            <button id="button-send" @click="sendArticle">SEND</button>
       </template>
       
   </div>
</template>

<script>
const axios= require ('axios');

    export default {

        data:() => ({
            body:"",
            userId: parseInt(localStorage.getItem('userId')),
            addArticle: false
        }),
       
        methods:{
            
            sendArticle(){

                axios.post ('http://localhost:3000/api/articles',
                    { body: this.body},
                    {
                    headers:{
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                })
                
                .then((response) => {
                    console.log(response.data.article[0].User.pseudo)
                    if(response){
                       this.$emit("added", {
                           article: response.data.article[0]
                        }) 
                    }
                })
            }
        }
    }
</script>

<style>

    #add-article{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 10%;
    }

</style>
