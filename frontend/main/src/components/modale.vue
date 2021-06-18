<template>
    <div class="bloc-modale" v-if="reveal">
        <div class="overlay" @click="hideModale()"></div>
        <div class="modale cart">
            <button @click="hideModale()"  class="button-close">X</button>

            <div v-if="login">
                <login 
                    :loginButton="!userInfoAccess" 
                    @unreveal="hideModale()">
                </login>
                
            </div>

            <div v-else-if="signup">  
                <signup></signup>
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
            <div v-else-if="displayMessage">
                    {{ message }}
                    <button class="confirm-button" @click="hideModale(); reload()">OK</button>
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




export default {
    name: "modale",
    components: {
        login, signup, logout, modifyArticle, deleteArticle,
        modifyComment, deleteComment
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
        userInfoAccess:{
            type: Boolean,
            default: false
        }  
    },

    methods:{
        
        hideModale(){
            this.$emit('unreveal')
            console.log(this.userInfoAccess)
        },

        unauthorized(){
            this.message = "Accès non authorisé"
            this.$emit('undisplay')
            this.displayMessage = true
        },

        authorized(){
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
            this.$emit('undisplay')
            this.displayMessage = true
        },
        
        reload(){
            document.location.reload()
        },
        connexion(){
            this.$emit('connexion')
        },
        confirm(){
            this.$emit('confirm')
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
        position: absolute;
        left: 40%;
        top: 70%;
    }
</style>