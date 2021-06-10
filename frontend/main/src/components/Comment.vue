<template>
     <div>
      <div> 
            <p class="comment">{{ note }}    </p>
            <deleteComment :id=this.id></deleteComment>
            <modifyComment :id=this.id></modifyComment>
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
            }
        }, 
    }
</script>

<style >
    .comment{
        width: 30%;
        font-size: 0.7em;
    }
</style>