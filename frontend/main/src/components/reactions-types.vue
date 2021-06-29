<template>
    <div class="reactions-types">
        <div v-bind:class="reactionColor">
            <p  class="reaction-type-name" @click="addReaction()"> {{ name }}</p>
        </div> 
    </div>
</template>

<script>
    export default {
        name: "reactionsTypes",

        data: () => ({
            content: false,
            excite: false,
            stresse: false,
            impatient: false
        }),

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
                    typeId: this.id
                })
            },
        },
        
        computed: {
            reactionColor(){
                return {
                    content: this.content,
                    excite: this.excite,
                    stresse: this.stresse,
                    impatient: this.impatient

                }
            }
        },
        beforeMount(){
            if(this.id == 1){
                this.content = true
            }
            else if(this.id == 2){
                this.excite = true
            }
            else if(this.id == 3){
                this.stresse = true
            }
            else if (this.id == 4){
                this.impatient = true
            }

        }
    
    }
</script>

<style>

    
    .reaction-type-name{
        font-size: 0.6em;
        border: solid 1px rgb(42, 31, 145);
        border-radius: 4px;
        padding-right: 8px;
        padding-left: 8px;
    }
    
    .content{
        background: rgb(159, 177, 194);
    }
    .excite{
        background: rgb(248, 205, 126);
    }
    .stresse{
        background:rgb(243, 155, 155);
    }
    .impatient{
        background: rgb(190, 218, 190);
    }
    
</style>
