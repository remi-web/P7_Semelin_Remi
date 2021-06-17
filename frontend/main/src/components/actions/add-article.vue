<template>
   <div id="add-article">
       <button class="add-article-button" @click="articleTextArea()">Publier un article</button>
       <template v-if="addArticle">
            <textarea class="text-area" name="text-input" id="post-text-area" cols="30" rows="10" v-model="body"></textarea>
            <addImage></addImage>
        <!-- <label for="file"></label> -->
        
            <button class="add-article-button" @click="sendArticle(); articleTextArea()">SEND</button>
       </template>
       
   </div>
</template>

<script>

import addImage from '../actions/add-image'

const axios= require ('axios');

    export default {
        name: "addArticle",
        components:{
            addImage
        },

        data:() => ({
            body:"",
            userId: parseInt(localStorage.getItem('userId')),
            addArticle: false,
            image:""
        }),

       
        methods:{

            articleTextArea(){
                this.addArticle = !this.addArticle    
            },
            
            sendArticle(){

                const formData = new FormData();
                    if (this.image !== null) {
                    formData.append("image", this.image);
                    formData.append("content", this.body);
                    // formData.append("user_id",parseInt(localStorage.getItem('userId')))

                axios.post ('http://localhost:3000/api/articles', formData,{
                    headers:{
                        "Content-Type": "multipart/form-data",
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                
                /*
                    { 
                        // body: this.body,
                        // imagerUrl: "image-url"
                        },
                    {
                    headers:{
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                    */
                })
                .then((response) => {
                    if(response){
                       this.$emit("added", {
                           article: response.data.article[0]
                        }) 
                    }
                })
            }
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
