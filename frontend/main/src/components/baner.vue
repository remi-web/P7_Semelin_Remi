<template>
    <div class="baner">
        <img id="logo" alt="Vue logo" src="../assets/icon-above-font.svg">
    
       
    </div>

</template>


<script>
    export default {
        name: "baner",

        data:() => ({
            message: "coucou lees gens",
            // active: true
        }),
    }
</script>



<style>
    #logo{
        height: 30%;
        width: 10%;
        bottom: 60%;
        display: flex;
        margin-right: 0%;
    }
    #nav{
        display: flex;
        margin: auto;
        justify-content: space-evenly;       
    }
    .baner-txt{
        font-weight: bold;
        color: #4a42b9;
    }
</style>