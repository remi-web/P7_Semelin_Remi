<template>
    <div id="add-comment">
        <div class="button-add"  @click="commentTextArea=true">Commenter</div>
            <template v-if="commentTextArea">
                <textarea name="text-input" id="comment-text-area" cols="30" rows="2" v-model="note"></textarea>
                <button id="button-send"  @click="addComment(); commentTextArea=false">SEND</button>
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
                .then((response) => {
                    if(response){
                        this.$emit("addComment", {
                           comment: response.data.comment[0]
                        })
                        this.$emit('unreveal')
                    }
                })
            }
        }
    }

</script>

<style >

    .button-add{
        font-size: 0.8em;
        width: 50%;
        margin-right: 0;
        margin-bottom: 5%;
        margin-top: 2%;
        color:grey;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .button-add:hover{
        font-weight: bold;
    }


</style>
