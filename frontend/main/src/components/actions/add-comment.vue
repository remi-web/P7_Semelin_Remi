<template>
    <div id="add-comment">
        <button class="comment-button-add"  @click="commentTextArea=true">Ajouter un commentaire</button>
            <template v-if="commentTextArea">
                <textarea name="text-input" id="comment-text-area" cols="30" rows="2" v-model="note"></textarea>
                <button id="button-send"  @click="addComment">SEND</button>
            </template>
    </div>
</template>

<script>
const axios = require ('axios')

    export default {
        name: "addComment",

        data:() => ({
            commentTextArea: false,
            click: false,
            note:""
        }),

        props:{

            id:{
                type: Number,
            },
        },

        methods: {
            addComment(){
                axios.post('http://localhost:3000/api/articles/'+this.id+'/comments',
                        { note: this.note}, 
                        { headers:
                            { Authorization: 'Bearer ' + localStorage.getItem('token')},
                        }                  
                )
                .then((res) => {
                    if(res){
                        document.location.reload()
                    }
                    this.$router.push('./home.vue')
                })
            }
        }
    }

</script>
