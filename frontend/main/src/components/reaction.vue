<template>
     <div class="reactions">
        <p class="pseudo pseudo-reaction">{{pseudo }}</p>
        <p class="reaction-type-name reaction"
            v-bind:class="reactionColor">{{ name }}
        </p>
    </div> 
</template>

<script>

    export default {
        name: "reactions",

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
            pseudo:{
                type: String
            },
            id:{
                type: Number
            }
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

    .reactions{
        display: flex;
    }
    .reaction{
        margin-left: 4%;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-size: 0.8em;
        margin-top: 1%;
    }
    .pseudo-reaction{
        margin-top: 0%;
        font-size: 1.2em;
    }

</style>