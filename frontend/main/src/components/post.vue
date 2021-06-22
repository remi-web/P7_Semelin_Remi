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
                <p class="txt-article"> {{ body }}{{id}}</p>
                <img class="image-post" :src="this.imageUrl">  
            </article>

            <div class="addComment-reactionType-bloc">
                <addComment 
                    :id="this.id"
                    @addedComment="addComment()">
                </addComment>

                <div class="reaction-type-bloc">
                    <addReaction
                        :articleId="this.id">
                    </addReaction>
                    
                </div>
            </div>
            <div v-if="displayReactions">
                <reactions class="reaction"
                    v-for="reaction in reactions" :key="reaction.id"
                    :reaction="reaction.reaction"
                    :name="reaction.name"
                    :pseudo="reaction.User.pseudo">
                </reactions>
            </div>

            
            
            <div>
               <button class="display-comments-button" @click="getComments(); displayCommentaire()">Voir les commentaires</button> 
               <button class="display-reactions-button" @click="getReactions(); displayReaction()">Voir les reactions</button>
               <!-- <button class="display-reactionsTypes-button" @click="getReactionsTypes()">Voir les reactionsTypes</button> -->
                
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
            // note:"",
            revealScrollMenu: false,
            revealCommentScrollMenu: false,
            reveal: false,
            modifyArticle: false,
            deleteArticle: false,
            comments: [],
            displayComments: false,
            reactions: [],
            displayReactions: false,
            name: ""
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
                this.comments.push(payload.comment)
                this.getComments()
                console.log(this.displayComments)
                // this.displayComments = false
            },

            getComments(){
                axios.get('http://localhost:3000/api/articles/'+this.id+'/comments', {
                    headers: {
                        'authorization': 'bearer ' + localStorage.getItem('token')
                    }
                })
                .then((response) => {
                    this.comments = response.data.comments;
                    console.log(this.comments)
                })
            },

            displayCommentaire(){
                this.displayComments = !this.displayComments
                console.log(this.displayComments)
            },

            getReactions(){
                axios.get('http://localhost:3000/api/articles/'+this.id+'/reactions', {
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
    .addComment-reactionType-bloc{
        display: flex
    }
    
</style>