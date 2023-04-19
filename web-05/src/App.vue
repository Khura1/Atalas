<script>

    import UserVR from './UserVR.vue'
    import Clock from './Clock.vue'
    import Alas from './Alas.vue'

    export default {
        components: {
            UserVR,
            Clock,
            Alas,
        },
    }

</script>

<template>

    <!-- USER RECORDS -->
    <UserVR></UserVR>
    
    <!-- BACKGROUND -->
    <img class="bg" src="./assets/images/background.png" alt="Background img" />

    <!-- DIGITAL CLOCK -->
    <Clock></Clock>

    <!-- DIGITAL ASSISTANT -->
    <Alas></Alas>
        
</template>

<style scoped>

    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
        background-color: white;
        /* cursor: none; */
    }

    @font-face{
        font-family:'text-font';
        src: url('./assets/fonts/digital-7.ttf') format("truetype");
        font-weight: 500;
        font-style: normal;
    }

    .bg {
        /* Position */
        position: fixed; 
        z-index: 1;
        top:0;
        left:0;
        right:0;
        bottom:0;
        margin:auto;
        /* transform: translate(0%, -15%); */

        /* Customization */
        opacity: 50%;
        width: 95%;
        height: 95%;

        /* Interaction */
        pointer-events: none;
        }

    .text {
        /* Position */
        position: absolute;
        z-index: 2;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -125%);

        /* Customization */
        font-family: 'text-font';
        font-weight: bold;
        font-size: 15px;
        color: #322B32;
        opacity: 25%;
        
        /* Interaction */
        pointer-events: none;
    }

    .radio {
        /* Position */
        position: absolute;
        z-index: 2;
        top:50%;
        left:50%;
        transform: translate(-50%, 200%);
    
        /* Customization */
        opacity: 25%;
    }

</style>
