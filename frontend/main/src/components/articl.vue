<template>
     <div>
    <main id= "publications">

       <div> {{ body }}
           <Comment
           v-for="(comment, index) in Comments" :key="index"
            :note="comment.note">
           </Comment>
           <Reaction
            v-for="(reaction, i) in Reactions" :key="i"
            :reaction="reaction.reaction">
           </Reaction>
       </div>
        
      </main>
    </div> 
</template>

<script>
import Comment from '../components/Comment'
import Reaction from './reaction.vue'

    export default {
        name: "articl",
        components: {
            Comment, Reaction
        },

        props:{

            body:{
                type: String,
                default:""
            },
            id:{
                type: Number,
            },
            userId:{
                type: Number,
            },
            imageUrl:{
                type:String,
                default:""
            },
            Comments:{
                type: Array
            },
            Reactions:{
                type: Array
            }
        }, 
        template: 
            '<p>{{body}}</p>'
        
    }
</script>

<style>
    #publications{
        width: 50%;
        margin: auto;
        font-size: 1.2em
        
    }
</style>