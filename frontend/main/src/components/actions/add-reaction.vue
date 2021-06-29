<template>

    <div class="reactions-types-bloc">
        <reactionsTypes
            v-for="reactionType in reactionsTypes" :key="reactionType.id"
            :name="reactionType.name"
            :id="reactionType.id"
            @addedReaction="addedReaction">
        </reactionsTypes>
    </div>

</template>

<script>

const axios = require ('axios')

import reactionsTypes from '../reactions-types'

export default {
    name: 'addReaction',
    components: {
        reactionsTypes
    },

    data: () => ({
        reactionsTypes: [],
    }),

    props: {
        articleId:{
            type: Number
        },
       
    },

    methods: {
        addedReaction(payload){
            axios.post('http://localhost:3000/api/articles/'+this.articleId+'/reactions', {
                reaction: payload.typeId
            },
            {
                headers:{
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
            })
            .then((response) => {
                    this.$emit('addedReaction', {
                    reaction: response.data.reactions
                })
            })
        }
    },

    beforeMount(){
        axios.get('http://localhost:3000/api/articles/'+this.articleId+'/reactionsTypes', {
            headers: {
                'authorization': 'bearer ' + localStorage.getItem('token')
                }
            })
            .then((response) => {
                this.reactionsTypes = response.data.reactionsTypes
            })
        }
}

</script>

<style>

    .reactions-types-bloc{
        display: flex;
        justify-content: flex-end;
        
        
    }

</style>