<template>
     <div>
        <p class="reaction-type-name" @click="addReaction()"> {{ name }}</p>
    </div> 
</template>

<script>
    export default {
        name: "reactionsTypes",

        props:{

            name:{
                type: String,
                default:""
            },
            id:{
                type: Number
            }
        },

        methods: {
            addReaction(){
                this.$emit('addedReaction',{
                    typeid: this.id
                })
            }
        }
    
    }
</script>

<style>
    .reaction-type-name{
        font-size: 0.6em;
        border: solid 1px rgb(42, 31, 145);
        border-radius: 4px;
        /* padding: 4px; */
        padding-right: 8px;
        padding-left: 8px;
        
    }
    .reaction-type-name:nth-child(1n){
        background: rgb(235, 181, 181);
    }
    
</style>
