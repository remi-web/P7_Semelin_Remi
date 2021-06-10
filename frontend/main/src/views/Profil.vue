<template>
  <div class="profil">
    
    <Baner/>
    PROFIL
    <!-- <button class="add-comment-button" @click="sendArticleId">Ajouter un commentaire</button> -->
        <!-- <post -->
        <!-- v-for="post in pots" :key="post.id" -->
        <!-- :id="post.id"> -->
        <!-- </post> -->
        <!-- {{ id }} -->

  </div>
</template>


<script>
import Baner from '../components/baner.vue'
// import post from '../components/post.vue'

export default {
  name: 'Profil',
  components: {
    Baner, //post
  },
 

  
}
</script>