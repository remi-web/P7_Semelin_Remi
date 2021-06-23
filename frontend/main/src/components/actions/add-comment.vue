<template>
    <div id="add-comment">
        <div class="add-comment-button"  @click="commentTextArea=!commentTextArea">Commenter</div>
            <template v-if="commentTextArea">
                <textarea name="text-input" id="comment-text-area" cols="30" rows="2" v-model="note"></textarea>
                <img src="../../assets/envoyer.svg" id="button-send"  @click="addComment(); commentTextArea=false">
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
                axios.post('http://localhost:3000/api/articles/'+this.id+'/comments',{ 
                    note: this.note
                    }, 
                    {
                    headers:
                        {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        },
                    })
                .then((response) => {
                    console.log(response)
                    if(response){
                        this.$emit("addedComment", {
                           comment: response.data.comment[0]
                        })
                        // this.$emit('unreveal')
                    }
                })
            }
        }
    }

</script>

<style >

    .add-comment-button{
        font-size: 0.8em;
        width: 50%;
        margin-right: 0;
        margin-bottom: 5%;
        margin-top: 6%;
        color:grey;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .button-add:hover{
        font-weight: bold;
    }
    #comment-text-area{
        width: 80%;
    }
    #button-send{
        background-image: url('../../assets/envoyer.svg');
        width: 9%;
        position: absolute;
    }


</style>
