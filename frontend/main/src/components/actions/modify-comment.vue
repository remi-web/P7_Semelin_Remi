<template>
    <div id="modify-comment">
        <button class="comment-button-modify"  @click="modifyCommentTextArea=true">Modifier le commentaire</button>
            <template v-if="modifyCommentTextArea">
                <textarea name="text-input" id="comment-text-area" cols="30" rows="2" v-model="note"></textarea>
                <button id="button-send"  @click="modifyComment">SEND</button>
            </template>
    </div>
</template>

<script>
const axios= require ('axios');

    export default {
        name: "modifyComment",

        data:() => ({
            note:"",
            userId: parseInt(localStorage.getItem('userId')),
            modifyCommentTextArea: false
        }),

        props:{
            id:{
                type: Number
            },
            articleId:{
                type: Number
            }
        },
       
        methods:{
            
            modifyComment(){
                axios.put ('http://localhost:3000/api/articles/'+ this.articleId+'/comments/'+ this.id+'',
                { note: this.note},
                { headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                })
            }
        },
    }
</script>
