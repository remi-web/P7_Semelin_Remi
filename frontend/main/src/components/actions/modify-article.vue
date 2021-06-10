<template>
    <div id="add-comment">
        <button class="add-comment-button"  @click="modifyArticleTextArea=true">Modifier l'article</button>
            <template v-if="modifyArticleTextArea">
                <textarea name="text-input" id="comment-text-area" cols="30" rows="2" v-model="body"></textarea>
                <button id="button-send"  @click="modifyArticle">SEND</button>
            </template>
    </div>
</template>

<script>
const axios= require ('axios');

    export default {

        data:() => ({
            body:"",
            userId: parseInt(localStorage.getItem('userId')),
            modifyArticleTextArea: false
        }),

        props:{
            id:{
                type: Number
            }
        },
       
        methods:{
            
            modifyArticle(){
                axios.put ('http://localhost:3000/api/articles/'+ this.id+'',
                { body: this.body,
                  title: "test" },
                { headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                })
            }
        },
    }
</script>
