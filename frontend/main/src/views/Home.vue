<script src="http://localhost:8098"></script>
<template>
   <div class="home" >
      <!-- <button @click="getArticles">CLICK</button> -->
      <Baner/>
        HOME
        <addArticle></addArticle>

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
        <!-- <signup/> -->

      <!-- <login/> -->
      
   </div>
</template>

<script>
import Baner from '../components/baner'
import post from '../components/post'
// import signup from '../components/actions/signup'
// import login from '../components/actions/login'
import addArticle from '../components/actions/add-article'
const axios = require ('axios');

export default {
    name: 'Home',
    components: {
        Baner, post, addArticle,
    },

    data:() => ({
        articles: [],
    }),

    methods:{
            sendArticleId(){
            this.$emit('sent-id',{
                articleId : this.id
            })
            }
        },

    async created() {
        await axios.get('http://localhost:3000/api/articles', {
            headers: {
                'authorization': 'bearer ' + localStorage.getItem('token')
            }
        })
        .then((response) => {
            this.articles = response.data.articles;
        })
    },    
}
</script>

