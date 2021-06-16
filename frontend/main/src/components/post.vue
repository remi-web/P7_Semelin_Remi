<template>
    <div >
        
        <main id= "posts" >
            <p class="pseudo">{{ pseudo }}</p>
            <button  @click="scrollMenu()" class="user-post-access">...</button>
            <div id="modify-section" v-if="revealScrollMenu">

                <button class="button" @click="displayModaleModify()">modifier</button>
                <button class="button" @click="displayModaleDelete()">supprimer</button>
                <modale :reveal="this.reveal" :modifyArticle="this.modifyArticle" :deleteArticle="this.deleteArticle"
                    @unreveal="hideModale()"></modale>
                
            </div>
            <article class="article"> {{ body }}
                
                
                <reaction
                    v-for="(reaction, i) in Reactions" :key="i"
                    :reaction="reaction.reaction">
                </reaction>
                
            </article>
            <commentaire 
                    v-for="comment in Comments" :key="comment.id"
                    :note="comment.note"
                    :id="comment.id"
                    :articleId="comment.articleId"
                    :userId="comment.userId">
            </commentaire>                 
                <addComment :id="this.id"></addComment>      
        </main>
    </div> 
</template>

<script>
// const axios= require ('axios')

import commentaire from '../components/comment'
import reaction from './reaction.vue'
import addComment from '../components/actions/add-comment'
// import modaleDelete from '../components/modales/m-delete-article'
// import modaleModify from '../components/modales/m-modify-article'
import modale from '../components/modale'

    export default {
        name: "post",
        components: {
            commentaire, reaction, addComment, modale,
            //  modaleDelete, modaleModify
        },
        
        data:() => ({
            commentTextArea: false,
            click: false,
            note:"",
            revealScrollMenu: false,
            reveal: false,
            modifyArticle: false,
            deleteArticle: false
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
            },
            hideScrollMenu:{
                type: Boolean,
                default: false
            }
        },
        methods: {
            scrollMenu(){
                this.revealScrollMenu = !this.revealScrollMenu
            },
           
            displayModaleModify(){
                this.reveal = !this.reveal
                this.modifyArticle = true
                

            },
            displayModaleDelete(){
                this.reveal = !this.reveal
                this.deleteArticle = true
            },
            hideModale(){
                this.reveal = false
                this.modifyArticle = false
                this.deleteArticle = false
            }
        }
    }
</script>

<style>
    #posts{
        width: 80%;
        margin: auto;
        font-size: 1.2em;
        margin-bottom: 10%;
        position: relative;
        
    }
    .article{
        border-style: groove;
        border-color: red;
        border-width: 1px;
        border-radius: 5px;
        /* height: 100px; */
        /* overflow: auto; */
        padding: 5%;
        color: gray;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif

    }
    
    #modify-section{
        position: absolute;
        left: 89.5%;
        display: flex;
        border: solid 1px;
    }
    
    .button{
        border: none;
    }

    .user-post-access{
        position: relative;
        left: 93%;
        margin-bottom: 2%;
    }
    #modify-section{
        margin-top: 5%;
    }
    .pseudo{
        color: rgb(80,80,80);
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        font-style: italic;
    }
</style>