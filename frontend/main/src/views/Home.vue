<script src="http://localhost:8098"></script>
<template>
   <div class="home" >
      <Baner/>
        HOME
        <logout/>
        <template v-if="connect">
            <addArticle></addArticle>
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
import logout from '../components/actions/logout.vue';


const axios = require ('axios');

export default {
    name: 'Home',
    components: {
        Baner, post, addArticle,
        logout, 
    },

    data:() => ({
        articles: [],
        connect: false,
        revele: true,
        login: false     
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
    },
    beforeMount(){
        if(localStorage.token){
            this.revele = false
            this.getArticles()
        }
    }
}
</script>

