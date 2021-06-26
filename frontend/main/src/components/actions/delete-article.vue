<template>

   <div>
        <p class="text-infos">Etes vous sûr de vouloir supprimer cet article ?</p>
        <button class="confirm-button signup-button"  @click="deleteArticle()">DELETE</button>
       
   </div>

</template>

<script>

const axios= require ('axios');

    export default {
        name: "deleteArticle",
        
        props: {
            id:{
                type: Number
            },
            userId:{
                type: Number
            }
        },

        methods:{
            
            deleteArticle(){
                axios.delete ('http://localhost:3000/api/articles/'+ this.id+'', 
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
            },
        }
    }

</script>

