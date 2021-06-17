
<template>
   <div>
       <p>Etes vous sûr de vouloir supprimer ce commentaire ?</p>
       <button  id="button-delete-comment" @click="deleteComment()">DELETE</button>
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
                .then(() => {
                    this.$emit('authorized')
                })
                .catch(() => {
                    this.$emit('unauthorized')
                })
            }
        },
    /*
        computed:{
            auth(){
                if(localStorage.userId == this.userId){
                    return true
                }
                return false
            }
        }
        */
    }

</script>