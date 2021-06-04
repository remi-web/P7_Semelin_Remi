<script src="http://localhost:8098"></script>
<template>
   <div class="home" >
      <!-- <button @click="getArticles">CLICK</button> -->
      <Baner/>
        HOME
      <Articl
         
          v-for="(article, index) in articles" :key="index"
          :body="article.body"
          :imageUrl="article.imageUrl"
          :Reactions="article.Reactions"
          :Comments="article.Comments"
          
            >
          <template
          >

            
              

            
            
          </template>
        
      </Articl>
     <!-- {{ articles.data.articles[0].body }} -->
   </div>
</template>

<script>
import Baner from '../components/baner.vue'
import Articl from '../components/articl'
// let api = require('../services/api')

const axios= require ('axios');

export default {
    name: 'Home',
    components: {
        Baner, Articl,
        
    },

    data:() => ({
      
        articles: "",
      
    }),
async created() {
  
    await axios.get('http://localhost:3000/api/articles', {
    // headers: {
        // 'authorization': 'bearer ' + localStorage.getItem('token')
            })
    .then((response) => {
        
         this.articles = response.data.articles;
         this.comments = response.data.articles.Comments
    })
},
    
        
      
    
}
  

    
</script>

