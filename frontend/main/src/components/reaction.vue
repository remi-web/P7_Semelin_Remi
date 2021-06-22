<template>
     <div>
      <div> 
        <p>{{ name }}</p>
      </div>
    </div> 
</template>

<script>
    export default {
        name: "reactions",

        props:{

            name:{
                type: String,
                default:""
            },
            pseudo:{
                type: String
            }
        }, 
    }
</script>
