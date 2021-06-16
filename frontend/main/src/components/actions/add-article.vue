<template>
   <div id="add-article">
       <button class="add-article-button" @click="articleTextArea()">Publier un article</button>
       <template v-if="addArticle">
            <textarea class="text-area" name="text-input" id="post-text-area" cols="30" rows="10" v-model="body"></textarea>
            <button class="add-article-button" @click="sendArticle(); articleTextArea()">SEND</button>
       </template>
       
   </div>
</template>

<script>

const axios= require ('axios');

    export default {
        name: "addArticle",
        data:() => ({
            body:"",
            userId: parseInt(localStorage.getItem('userId')),
            addArticle: false
        }),

       
        methods:{

            articleTextArea(){
                this.addArticle = !this.addArticle    
            },
            
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
        /* position: fixed; */
    }
    .add-article-button{
        margin-top: 5%;
        margin-bottom: 5%;

    }
    .text-area{
        width: 80%;
        border: solid 1px red;
        border-radius: 8px;
    }

</style>
