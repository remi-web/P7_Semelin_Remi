<template>
    <div >
        
        <main id= "posts" >
            
            <p class="pseudo">{{ pseudo }}</p>
            <button class="user-post-access" @click="scrollMenu()">...</button>

            <div id="modify-section" v-if="revealScrollMenu">
                <button class="button modify" @click="displayModaleModify(); hideScrollMenu()">modifier</button>
                <button class="button delete" @click="displayModaleDelete(); hideScrollMenu()">supprimer</button>                
            </div>

            <modale 
                :reveal="this.reveal" 
                :modifyArticle="this.modifyArticle" 
                :deleteArticle="this.deleteArticle"
                :id="this.id"
                @unreveal="hideModale()"
                @undisplay="undisplay()">
            </modale>

            <article class="article">
                <p class="txt-article"> {{ body }}</p>
                <img class="image-post" :src="this.imageUrl">  
            </article>

            <reaction
                v-for="(reaction, i) in Reactions" :key="i"
                :reaction="reaction.reaction">
                </reaction>

            <addComment 
                :id="this.id"
                @addedComment="addComment">
            </addComment>
            
            <div>
                <commentaire
                    v-for="comment in Comments" :key="comment.id"
                    :note="comment.note"
                    :id="comment.id"
                    :articleId="comment.articleId"
                    :userId="comment.userId"
                    :pseudo="comment.pseudo">                    
                </commentaire>
            </div>
        </main>
    </div> 
</template>

<script>

import commentaire from '../components/comment'
import reaction from './reaction.vue'
import addComment from '../components/actions/add-comment'
import modale from '../components/modale'

    export default {
        name: "post",
        components: {
            commentaire, reaction, addComment, modale,
        },
        
        data:() => ({
            commentTextArea: false,
            click: false,
            note:"",
            revealScrollMenu: false,
            revealCommentScrollMenu: false,
            reveal: false,
            modifyArticle: false,
            deleteArticle: false,
            // get: false
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
        },
        methods: {
            /*
            getComment(){
                this.get = true
            },
            */
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
            //hide modale & init value 
            hideModale(){
                this.reveal = false
                this.modifyArticle = false
                this.deleteArticle = false
            },
            hideScrollMenu(){
                this.revealScrollMenu = false
            },
             //hide validate modifyArticle message   
            undisplay(){
                this.modifyArticle = false
            },
            addComment(payload){
                console.log(payload.comment)
                this.Comments.push(payload.comment)
                this.$emit('getArticle')
            },

        },
        
    }
</script>

<style>
    #posts{
        width: 80%;
        margin: auto;
        font-size: 1.2em;
        margin-bottom: 10%;
        position: relative;
        border-bottom: solid 1px;
    }
    .article{
        border-style: groove;
        border-color: red;
        border-width: 1px;
        border-radius: 5px;
        padding: 5%;
        color: gray;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif

    }
    
    #modify-section{
        position: absolute;
        left: 90%;
        display: flex;
        flex-direction: column; 
        border: solid 1px;
        border-radius: 8%;
    }
    
    .button{
        /* background: rgb(216, 213, 213); */
        border: none;
    }
    .button:hover{
        background: rgb(252, 185, 185);
    }

    .delete{
        border-top: solid 0.5px;
    }

    .user-post-access{
        position: relative;
        left: 93%;
        margin-bottom: 1%;
    }
  
    .pseudo{
        color: rgb(80,80,80);
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        font-style: italic;
        margin-bottom: 0%;
    }
    .image-post{
        width: 95%;
        margin-left: 3%;
        
    }
</style>