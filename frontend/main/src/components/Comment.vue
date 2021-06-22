<template>
     <div>
        <div class="bloc-comment"> 
        <p class="pseudo">{{ pseudo }}</p><p class="comment">{{ note }}</p>
            <button v-if="auth" class="user-comment-access" @click="scrollCommentMenu()" >...</button>
        </div>
        

        <div id="modify-comment-section" v-if="revealCommentScrollMenu">
            <button  @click="displayModaleModify(); hideScrollMenu()">modifier</button>
            <button  @click="displayModaleDelete(); hideScrollMenu()">supprimer</button>                
        </div>

        <modale
            :reveal="this.reveal"
            :modifyCommentaire="this.modifyCommentaire"
            :deleteCommentaire="this.deleteCommentaire"
            :commentId="this.id"
            @unreveal="hideModale()"
            @undisplay="undisplay()">
        </modale>

    </div> 
</template>

<script>
import modale from '../components/modale'

    export default {
        name: "Comment",
        components:{
            /*deleteComment, modifyComment,*/ modale
        },

        data: () => ({
            reveal: false,
            revealCommentScrollMenu: false,
            modifyCommentaire: false,
            deleteCommentaire: false
        }),

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
        
        methods:{
            scrollCommentMenu(){
                this.revealCommentScrollMenu = !this.revealCommentScrollMenu
            },
            hideScrollMenu(){
                this.revealCommentScrollMenu = false
            },

            displayModaleModify(){
                this.reveal = !this.reveal
                this.modifyCommentaire = true
            },

            displayModaleDelete(){
                this.reveal = !this.reveal
                this.deleteCommentaire = true
            },
            //hide & init
            hideModale(){
                this.reveal = false
                this.modifyCommentaire = false
                this.deleteCommentaire = false
            },
            //hide comment message from the modale
            undisplay(){
                this.deleteCommentaire = false
            }
        },
        computed:{
            auth(){
                if(localStorage.userId == this.userId){
                    return true
                }
                return false
            }
        }
    }
</script>

<style >
    .bloc-comment{
        display: flex;
    }
    .comment{
        font-size: 0.7em;
        border: solid;
        border-width: 1px;
        border-radius: 8px;
        padding: 2%;
        margin: 1.5%;
        background-color: rgb(243, 237, 237);
        position: relative;
    }
    .user-comment-access{
        height: 50%;
        margin-left: 5%;
        margin-top: 3%;
       
        
    }
  
    
</style>