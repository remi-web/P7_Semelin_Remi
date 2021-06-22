<template>
    <div id="modify-comment">
        
        <textarea name="text-input" id="comment-text-area" cols="30" rows="5" v-model="note"></textarea>
        <button class="confirm-button send-comment-button"  @click="modifyComment()">SEND</button>

    </div>
</template>

<script>

const axios= require ('axios');

    export default {
        name: "modifyComment",

        data:() => ({
            note:"",
            // userId: parseInt(localStorage.getItem('userId')),
            modifyCommentTextArea: false,
            revealScrollMenu: false,
            
        }),

        props:{
            id:{
                type: Number
            },
            articleId:{
                type: Number
            },
            userId:{
                type: Number
            },
        },
       
        methods:{

            displayModaleModify(){
                this.reveal = !this.reveal
                this.modifyCommentaire = true
            },

            displayModaleDelete(){
                this.reveal = !this.reveal
                this.deleteCommentaire = true
            },
            
            modifyComment(){
                axios.put ('http://localhost:3000/api/articles/'+ this.articleId+'/comments/'+ this.id+'',{
                    note: this.note
                },
                { 
                headers: 
                    {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() =>{
                     this.$emit('unreveal')
                })
            }
        },
    }
</script>

<style>
    .send-comment-button{
        margin-top: 5%;
    }
</style>
