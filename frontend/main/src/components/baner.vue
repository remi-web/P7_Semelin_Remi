<template>
    <div class="baner">
        <img id="logo" alt="Vue logo" src="../assets/icon-above.svg">
    
       
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
    #logo{
        height: 20%;
        width: 10%;
        position: absolute;
        top: 0%;
        left: 5%;
    }
    #nav{
        display: flex;
        justify-content: space-evenly;
        margin-left: 20%;
        margin-right: 20%;
        border-radius: 8px;
        margin-bottom: 2%;
        margin-top: 4%; 
        background-color: #f1f1f1;
        box-shadow: 1px 1px 10px -3px grey
    }
    .baner-txt{
        font-weight: lighter;
        color: rgb(220,0,100);
        text-decoration: none;
    }
</style>