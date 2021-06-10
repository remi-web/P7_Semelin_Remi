<template>
     <div>
      <div> 
       
           <p>{{ reaction }}</p>
       
        
      </div>
    </div> 
</template>

<script>
    export default {
        name: "reaction",

        props:{

            reaction:{
                type: String,
                default:""
            },
            
        }, 
     
        
    }
</script>
