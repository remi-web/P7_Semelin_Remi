<script src="http://localhost:8098"></script>
<template>
   <div class="home" >
      <Baner/>
        HOME
        <button @click="displayLogout()" id="logout-button">Se déconnecter</button>
        <modale id="modale" :reveal="reveal" :logout="logout"></modale>

        <template v-if="connect">
            <addArticle @added="add"></addArticle>
        </template>
       

      <post
      
          v-for="article in articles" :key="article.id"
          :body="article.body"
          :imageUrl="article.imageUrl"
          :Reactions="article.Reactions"
          :Comments="article.Comments"
          :id="article.id"
          :userId="article.userId"
          :pseudo="article.User.pseudo"
          
          >

        </post>      
   </div>
</template>

<script>
import Baner from '../components/baner'
import post from '../components/post'
import addArticle from '../components/actions/add-article'
import modale from '../components/modale'


const axios = require ('axios');

export default {
    name: 'Home',
    components: {
        Baner, post, addArticle, modale
    },

    data:() => ({
        articles: [],
        connect: false,
        reveal: false,
        login: false,
        reveal: false,
        logout: false
    }),

    methods:{
        async getArticles() {
                await axios.get('http://localhost:3000/api/articles', {
                    headers: {
                        'authorization': 'bearer ' + localStorage.getItem('token')
                    }
                })
                .then((response) => {
                    this.articles = response.data.articles;
                    this.connect = true
                })
        },
        add(payload){
            console.log(payload.article)
            this.articles.push(payload.article)
            this.getArticles()
        },

        displayLogout(){
            this.reveal = true
            this.logout = true
        }
        
    },
    beforeMount(){
        if(localStorage.token){
            this.reveal = false
            this.getArticles()
        }
    }
}
</script>

