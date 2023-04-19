<template>

    <!-- ASSISTANT -->
    <img class="ham" src="./assets/images/alas.png" alt="Alas img"/>

</template>

<style scoped>

    .ham {
        /* Position */
        position: absolute;
        z-index: 2;
        top: 40%;
        left:0;
        right:0;
        bottom:0;
        margin:auto;

        /* Customization */
        height: 25%;
        width: 12%;

        /* Animation */
        animation: hamMotion 2s linear .1s;
        animation-iteration-count: infinite;

        /* Interaction */
        pointer-events: none;
    }

    @keyframes hamMotion {
        0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 
        40% {transform: translateY(-5px);} 
        60% {transform: translateY(-5px);} 
        45% {transform: translateX(-1px);} 
        50% {transform: translateX(2px);}
        65% {transform: translateX(-1px);} 
    }

</style>