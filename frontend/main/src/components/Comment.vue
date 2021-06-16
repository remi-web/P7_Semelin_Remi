<template>
     <div>
      <div> 
            <p class="comment">{{ note }} {{ userId }}   </p>
            <deleteComment :id="this.id"></deleteComment>
            <modifyComment :id="this.id" :userId="this.userId"></modifyComment>
      </div>
    </div> 
</template>

<script>
import deleteComment from '../components/actions/delete-comment'
import modifyComment from '../components/actions/modify-comment'

    export default {
        name: "Comment",
        components:{
            deleteComment, modifyComment
        },

        props:{

            note:{
                type: String,
                default: ""
            },
            id:{
                type: Number
            },
            userId:{
                type: Number
            },
            articleId:{
                type: Number
            },
            pseudo:{
                type:String,
                default: ""
            }
        }, 
    }
</script>

<style >
    .comment{
        font-size: 0.9em;
        border: solid;
        border-width: 1px;
        border-radius: 8px;
        width: 60%;
        padding: 2%;
        background-color: rgb(243, 237, 237);
    }
</style>