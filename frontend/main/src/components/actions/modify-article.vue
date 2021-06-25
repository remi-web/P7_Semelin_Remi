<template>
    <div id="add-comment">
        <textarea name="text-input" id="comment-text-area" cols="40" rows="20" v-model="body"></textarea>
        <button class="confirm-button send-button signup-button"  @click="modifyArticle()">SEND</button>        
    </div>
</template>

<script>
const axios= require ('axios');

    export default {
        name: "modiFyArticle",
        components:{
            
        },

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
                { 
                    body: this.body,
                    title: "test" 
                },
                {
                    headers: 
                        {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                })
                .then(() => {
                    this.$emit('authorized')
                })
                .catch(() => {
                    this.$emit('unauthorized')
                })
            }
        },
    }
</script>

<style>

    #comment-text-area{
        margin-left: 10%;
        border: none;
    }
    .send-button{
        margin-top: 25%
    }
</style>
