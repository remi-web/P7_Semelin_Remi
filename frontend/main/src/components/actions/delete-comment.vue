
<template>
   <div>
       <button id="button-delete-comment" @click="deleteComment">supprimer le commentaire</button>
   </div>
</template>

<script>
const axios= require ('axios');

    export default {
        name: "deleteComment",
        
        props: {
            id:{
                type: Number
            },
            userId:{
                type: Number
            },
            articleId:{
                type: Number
            }
        },

        methods:{
            
            deleteComment(){
                axios.delete ('http://localhost:3000/api/articles/'+ this.articleId+'/comments/'+ this.id+'', 
                    { 
                        headers:
                            { Authorization: 'Bearer ' + localStorage.getItem('token')},
                    }       
                )
                .then((res) => {
                    console.log(res)
                })
            },
        }
    }

</script>