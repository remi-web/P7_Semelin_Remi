<template>
   <div id="add-article">
       <button class="signup-button add-article-button" @click="articleTextArea()">Publier un article</button>

       <template v-if="addArticle">
            <textarea class="text-area" name="text-input" id="post-text-area" cols="30" rows="8" v-model="body"></textarea>
            <input class="file-insert-button button" type="file"  name="image" ref="image" accept="image/png, image/jpeg" v-on:change="value()">
            <button class="send-article-button" @click="sendArticle(); articleTextArea()">SEND</button>
       </template>
       
   </div>
</template>

<script>


const axios= require ('axios');

    export default {
        name: "addArticle",
        components:{
        },

        data:() => ({
            body:"",
            userId: parseInt(localStorage.getItem('userId')),
            addArticle: false,
            image:"",
            empty: "name"
        }),
       
        methods:{

            articleTextArea(){
                this.addArticle = !this.addArticle    
            },
            
            sendArticle(){
                const formData = new FormData();
                if (this.image !== null) {
                    formData.append("image", this.image);
                    formData.append("body", this.body);        
                } else
                {
                    formData.append("body", this.body);
                    formData.append("image", this.empty)
                }    
                axios.post('http://localhost:3000/api/articles', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then((res) => {
                    this.$emit('added',{
                        article: res.data.article[0]
                    });
                })
            },
            value(){
                this.image = this.$refs.image.files[0];
            }
        }
    }
</script>

<style>

    #add-article{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .add-article-button{
        margin-top: 5%;
        margin-bottom: 5%;
        border: none;
        opacity: 90%;

    }
    .text-area{
        width: 80%;
        border: solid 1px red;
        border-radius: 8px;
    }
    .file-insert-button{
        margin-top: 2%
    }
    .file-insert-button{
        border-radius: 8px;
    }
    .send-article-button{
        margin-top: 2%;
    }

</style>
