<template>
    <div>
        <main id= "publications">
            {{ pseudo }}
            <article> {{ body }}

                <deleteArticle :id=this.id :userId=this.userId></deleteArticle>
                <modifyArticle :id=this.id></modifyArticle>

                <commentaire 
                    v-for="comment in Comments" :key="comment.id"
                    :note="comment.note"
                    :id="comment.id"
                    :articleId="comment.articleId">
                </commentaire>
                <reaction
                    v-for="(reaction, i) in Reactions" :key="i"
                    :reaction="reaction.reaction">
                </reaction>
                
            </article> 
            
            <addComment :id=this.id></addComment>

        </main>
    </div> 
</template>

<script>
// const axios= require ('axios')

import commentaire from '../components/comment'
import reaction from './reaction.vue'
import addComment from '../components/actions/add-comment'
import deleteArticle from '../components/actions/delete-article'
import modifyArticle from '../components/actions/modify-article'
// import ModifyArticle from './actions/modify-article.vue'

    export default {
        name: "post",
        components: {
            commentaire, reaction, addComment, deleteArticle, modifyArticle,
                // ModifyArticle
        },
        
        data:() => ({
            commentTextArea: false,
            click: false,
            note:"",
        }),

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
            },
            pseudo:{
                type: String,
                default: ""
            }
        }

    }
</script>

<style>
    #publications{
        width: 50%;
        margin: auto;
        font-size: 1.2em;
        margin-bottom: 10%
    }
</style>