<template>
   <div>
            <p>Etes vous sûr de vouloir supprimer cet article ?</p>
            <button id="button-send"  @click="deleteArticle">DELETE</button>
       
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
                .then((res) => {
                    console.log(res)
                })
            },
        }
    }

</script>

