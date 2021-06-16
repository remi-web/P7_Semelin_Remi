<template>
    <div id="add-comment">
            
                <textarea name="text-input" id="comment-text-area" cols="30" rows="2" v-model="body"></textarea>
                <button id="button-send"  @click="modifyArticle">SEND</button>
            
        
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

<style>
  .button-modify{
      font-size: 0.7em;
      margin-bottom: 4%;
  }
</style>
