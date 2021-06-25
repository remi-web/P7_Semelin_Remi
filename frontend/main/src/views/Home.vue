<script src="http://localhost:8098"></script>
<template>
   <div id="home" >
      <Baner/>

        <div>
            <addArticle @added="add"></addArticle>
        </div>

        <post
          v-for="article in articles" :key="article.id"
          :body="article.body"
          :imageUrl="article.imageUrl"
          :id="article.id"
          :userId="article.userId"
          :pseudo="article.User.pseudo"
          :bodyLength="article.bodyLength"
          @getArticles="getArticles()">
        </post> 
    
        <modale></modale>    
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
        Baner, post, addArticle, modale,
    },

    data:() => ({
        articles: [],
        login: false,
        reveal: false,
        logout: false
    }),

    methods:{
        getArticles() {
                 axios.get('http://localhost:3000/api/articles', {
                    headers: {
                        'authorization': 'bearer ' + localStorage.getItem('token')
                    }
                })
                .then((response) => {
                    console.log(response)
                    this.articles = response.data.articles;
                })
        },
        add(payload){
            console.log(payload.article)
            this.articles.push(payload.article)
            this.getArticles()
        },
    },
    beforeMount(){
        if(localStorage.token){
            this.reveal = false
            this.getArticles()
        }
    }
}
</script>

<style scoped>

    #home{       
        background-color: #f1f1f1;
        /* margin-left: 20%; */
        /* margin-right: 20%; */
        margin-top: 5%;
        border-radius: 8px;
        z-index: -1;
        box-shadow: 2px 0px 16px -3px grey;
        height: 800px;
        overflow: scroll; 

    }

</style>

