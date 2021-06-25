<template>
    <div class="baner">
    </div>

</template>

<script>
    export default {
        name: "baner",

        data:() => ({
            message: "coucou les gens",
            // active: true
        }),
    }
</script>

<style>

    #nav{
        display: flex;
        justify-content: space-evenly;
        border-radius: 8px;
        margin-bottom: 2%;
        margin-top: 2%; 
        background-color: #f1f1f1;
        box-shadow: 1px 1px 10px -3px grey;
    }
    .baner-txt{
        font-weight: lighter;
        color: rgb(220,0,100);
        text-decoration: none;
    }
</style>