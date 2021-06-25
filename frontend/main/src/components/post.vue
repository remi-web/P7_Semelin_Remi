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
                @getArticles="getArticles()"
                @getComments="getComments()"
                @unreveal="hideModale()"
                @undisplay="undisplay()">
            </modale>

            <article class="article">
                <p v-bind:class="{allText: text, textHidden: !text}"> {{ body }}</p>
                <p  class="afficher-suite" v-if="this.textArticleIsLong" @click="displayAllText()">afficher la suite</p>
                <img class="image-post" :src="this.imageUrl">  
            </article>

            <div>
                <addReaction
                    :articleId="this.id"
                    @addedReaction="addedReaction">
                </addReaction>
            </div>

            <div>
               <button class="comments-button reactions-button" 
                    @click="getComments(); displayCommentaire()">{{ countComments }} commentaires</button> 
               <button class="comments-button reactions-button" 
                    @click="getReactions(); displayReaction()">{{ countReactions }} reactions</button>
            </div>

            <div v-if="displayReactions">
                <reactions class="reaction"
                    v-for="reaction in reactions" :key="reaction.id"
                    :reaction="reaction.reaction"
                    :name="reaction.ReactionsType.name"
                    :id="reaction.ReactionsType.id"
                    :pseudo="reaction.User.pseudo">
                </reactions>
            </div>

            <div v-if="displayComments">   
               <commentaire 
                    v-for="comment in comments" :key="comment.id"
                    :note="comment.note"
                    :id="comment.id"
                    :userId="comment.userId"
                    :pseudo="comment.User.pseudo">                    
                </commentaire>
            </div>

            <addComment 
                :id="this.id"
                @addedComment="addComment">
            </addComment>

        </main>
    </div> 
</template>

<script>

const axios = require ('axios')
import commentaire from '../components/comment'
import reactions from './reaction'
import addReaction from '../components/actions/add-reaction'
import addComment from '../components/actions/add-comment'
import modale from '../components/modale'

    export default {
        name: "post",
        components: {
            commentaire, reactions, addReaction, addComment, modale,
        },
        
        data:() => ({
            commentTextArea: false,
            click: false,
            revealScrollMenu: false,
            revealCommentScrollMenu: false,
            reveal: false,
            modifyArticle: false,
            deleteArticle: false,
            comments: [],
            displayComments: false,
            reactions: [],
            displayReactions: false,
            countComments: "",
            countReactions: "",
            textArticleIsLong: false,
            text: false
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
            pseudo:{
                type: String,
                default: ""
            },
            bodyLength:{
                type: Number
            }
        },
        methods: {
           
            scrollMenu(){
                this.revealScrollMenu = !this.revealScrollMenu
                console.log(this.bodyLenght)
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

             //hide modifyArticle message   
            undisplay(){
                this.modifyArticle = false
            },
            getArticles(){
                this.$emit('getArticles')
            },

            addComment(payload){
                this.comments.push(payload.comment)
                console.log(this.id)
                this.getComments()
                this.countComments++
            },

            getComments(){
                axios.get('http://localhost:3000/api/articles/'+this.id+'/comments', {
                    headers: {
                        'authorization': 'bearer ' + localStorage.getItem('token')
                    }
                })
                .then((response) => {
                    this.comments = response.data.comments;
                })
                .catch()
            },

            displayCommentaire(){
                this.displayComments = !this.displayComments
            },

            getReactions(){                axios.get('http://localhost:3000/api/articles/'+this.id+'/reactions', {
            
                    headers: {
                        'authorization': 'bearer ' + localStorage.getItem('token')
                    }
                })
                .then((response) => {
                    this.reactions = response.data.reactions;
                    console.log(this.reactions)
                    
                })
            },

            displayReaction(){
                this.displayReactions = !this.displayReactions
            },

            addedReaction(payload){
                this.reactions.push(payload.reaction)
                console.log(this.id)
                this.getReactions()
                this.countReactions++
            },
            displayAllText(){
                this.text= !this.text
            }
        },

        beforeMount(){
            axios.get('http://localhost:3000/api/articles/'+this.id+'/comments/count',{
                headers: {
                    'authorization': 'bearer ' + localStorage.getItem('token')
                }
            })
            .then((res) => {
                this.countComments = res.data.countComments
            })
            .catch()

            axios.get('http://localhost:3000/api/articles/'+this.id+'/reactions/count',{
                headers: {
                    'authorization': 'bearer ' + localStorage.getItem('token')
                }
            })
            .then((res) => {
                this.countReactions = res.data.countReactions
            })
            .catch()

             if(this.bodyLength > 180){
                this.textArticleIsLong = true
                console.log(this.bodyLength)
            }
        }

        
    }
</script>

<style>
    #posts{
        /* width: 100%; */
        margin: auto;
        font-size: 1.2em;
        padding-bottom: 15%;
        position: relative;
        border-bottom: solid 1px gray;
        background-color: rgb(252, 252, 252) ;
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
        left: 75%;
        display: flex;
        flex-direction: column;
        border: solid 1px #20355F;
        background: gray
    }
    
    .button:hover{
        background: rgb(252, 185, 185);
    }
    .button{
        border: none;
        opacity: 80%;
    }
    .delete{
        border-top: solid 1px #20355F;
    }
    .comments-button{
        border: none;
        background: white;
    }
    .user-post-access{
        position: relative;
        left: 90%;
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
    
    .textHidden{
        height: 130px;
        overflow-y:hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        margin-top: 0;
        margin-bottom: 0;
        /* white-space:nowrap; */

    }
    .allText{
        height: 100%;
    }
   
    
    
</style>