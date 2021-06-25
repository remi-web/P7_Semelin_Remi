<template>
    <div class="bloc-modale" v-if="reveal">
        <div class="overlay" @click="hideModale()"></div>
        <div class="modale cart">
            <button @click="hideModale()"  class="button-close">X</button>

            <div v-if="displayMessage">
                   <p class="message"> {{ message }}</p>
                    <button class="confirm-button signup-button" @click="hideModale()">OK</button>
            </div>

            <div v-else-if="login">
                <login
                    @isConnected="isConnected()"
                    @unauthorized="unauthorized()" 
                    @unreveal="hideModale()">
                </login>
            </div>

            <div v-else-if="signup">  
                <signup
                    @isConnected="isConnected()"
                    @unreveal="hideModale()">
                </signup>
            </div>

            <div v-else-if="logout">  
                <logout></logout>
            </div>

            <div v-else-if="modifyArticle">
                <modifyArticle 
                    :id="this.id"
                    @unauthorized="unauthorized()"
                    @authorized="authorized()">
                </modifyArticle>
            </div>

            <div v-else-if="deleteArticle">
                <deleteArticle 
                    :id="this.id"
                    @unauthorized="unauthorized()"
                    @authorized="authorized()">
                </deleteArticle>
            </div>

            <div v-if="modifyCommentaire">
                <modifyComment
                    :id="this.commentId"
                    @unreveal="hideModale()"
                    @unauthorized="unauthorized()"
                    @authorized="authorized()">
                </modifyComment>
            </div>

            <div v-if="deleteCommentaire">
                <deleteComment
                    :id='this.commentId'
                    @unauthorized="unauthorized()"
                    @authorized="authorized()">
                </deleteComment>
            </div>

            <div v-if="userModification">
                <userModify
                    :id='this.userId'
                    @modified="authorized()"
                    @getUserInfos="getUserInfos()">
                </userModify>
            </div>

            <div v-if="userSuppr">
                <userDelete
                    :id='this.userId'
                    @unauthorized="unauthorized()"
                    @deleted="authorized()">
                </userDelete>
            </div>
           
            
        </div>
    </div>
</template>

<script>

import login from '../components/actions/login'
import signup from '../components/actions/signup'
import logout from '../components/actions/logout'
import modifyArticle from './actions/modify-article'
import deleteArticle from './actions/delete-article'
import modifyComment from './actions/modify-comment'
import deleteComment from './actions/delete-comment'
import userModify from './actions/user-modify'
import userDelete from './actions/user-delete'




export default {
    name: "modale",
    components: {
        login, signup, logout, modifyArticle, deleteArticle,
        modifyComment, deleteComment, userModify, userDelete
    },

    data: () => ({
        delete: true,
        message: "",
        displayMessage: false
        
    }),

    props:{
        
        reveal: {
            type: Boolean,
            default: false
        },
        login:{
            type: Boolean,
            default: false
        },
        logout:{
            type: Boolean,
            default: false
        },
        signup:{
            type: Boolean,
            default: false
        },
        
        modifyArticle:{
            type: Boolean,
            default: false
        },
        deleteArticle:{
            type: Boolean,
            default: false
        },
        modifyCommentaire:{
            type: Boolean,
            default: false
        },
        deleteCommentaire:{
            type: Boolean,
            default: false
        },
        
        id:{
            type: Number
        },
        commentId:{
            type: Number
        } ,
        userModification:{
            type: Boolean,
            default: false
        },
        userSuppr:{
            type: Boolean,
            default: false
        },
        userId:{
            type: String
        }

    },

    methods:{
        
        hideModale(){
            this.$emit('unreveal')
            this.$emit('undisplay')
            this.displayMessage = false
        },
       
        unauthorized(){
            this.message = "Accès non authorisé"
            this.$emit('undisplay')
            this.displayMessage = true
        },

        authorized(){
            this.$emit('undisplay')
            this.displayMessage = true
            this.$emit('getArticles')
            this.$emit('getComments')

            if(this.modifyArticle){
                this.message = "Article modifé"
            }
            else if(this.modifyCommentaire){
                this.message = "Commentaire modifé"
            }
            else if(this.deleteArticle){
                this.message = "Article supprimé"
            }
            else if(this.deleteCommentaire){
                this.message = "Commentaire supprimé"
            }
            else if(this.userModification){
                this.message = "modifications enregistrées"
            }
            else if(this.userSuppr){
                this.message = "votre compte a été supprimé"
            }            
        },
        
        reload(){
            document.location.reload()
        },
        connexion(){
            this.$emit('connexion')
        },
        
        isConnected(){
            this.$emit('isConnected')
        },
        
       getUserInfos(){
           this.$emit('getUserInfos')
       }
    }
}
</script>

<style>
    .bloc-modale{
        position: fixed;
        top: 0%;
        bottom: 0%;
        left: 0%;
        right: 0%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
        
    }

    .overlay{
        background: rgba(0, 0, 0, 0.7);
        position: fixed;
        top: 0%;
        bottom: 0%;
        left: 0%;
        right: 0%;
        z-index: -1;
    }

    .modale{
        background: #f1f1f1;
        color: #333;
        padding: 50px;
        position: fixed;
        border-radius: 8px;

    }
    .button-close{
        background-color: red;
        position:absolute;
        top: 10px;
        right: 10px;
        color: white;
        border: none;
        border-radius: 15%;
        padding: 2%;
    }
    .confirm-button{
        margin-left: 10%;
        
        /* position: absolute; */
        /* left: 40%; */
        /* top: 70%; */
        /* width: 50%; */
    }

    .message{
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        color: rgb(172, 110, 110);
    }
</style>