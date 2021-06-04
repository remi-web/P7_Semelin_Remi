<template>
     <div>
      <div> 
           <p class="comment">{{ note }}</p>
       
        
      </div>
    </div> 
</template>

<script>
    export default {
        name: "Comment",

        props:{

            note:{
                type: String,
                default:""
            },
            
        }, 
        template: 
            '<p>{{ note }}</p>'
        
    }
</script>

<style >
    .comment{
        width: 30%;
        font-size: 0.7em;
    }
</style>