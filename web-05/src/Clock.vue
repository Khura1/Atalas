<script>
    export default {

        created() {
            // UPDATE CLOCK EVERY X SECONDS
            this.interval = setInterval(() => this.showClockTime(), 3000);
        },

        methods: {
            // DIGITAL CLOCK DISPLAY
            showClockTime() {

                // WITHDRAW VALUES
                var dateTime = new Date();
                var hr = dateTime.getHours();
                var min = dateTime.getMinutes();

                // CHECK IF HOUR IS 1 DIGIT NUMBER
                if ( hr < 10 ) { hr = "0" + hr; }

                // CHECK IF MINUTE IS 1 DIGIT NUMBER
                if ( min < 10 ) { min = "0" + min; }

                // ASSIGN VALUES
                document.getElementById('hour').innerHTML = hr;
                document.getElementById('minute').innerHTML = min;
            },
        },
    }
</script>

<template>

    <!-- DIGITAL CLOCK FRAME -->
    <div class="clock-frame">88:88</div>

    <!-- DIGITAL CLOCK -->
    <div class="digital-clock">
      <span id="hour">88</span><!--
      --><span>:</span><!--
      --><span id="minute">88</span>
    </div>

</template>

<style scoped>

    @font-face{
        font-family:'clock-font';
        src: url('./assets/fonts/clock-font.otf') format("truetype");
        font-weight: 500;
        font-style: normal;
    }

    .digital-clock {

        /* Position */
        position: absolute;
        z-index: 3;
        top:50%;
        left:50%;
        transform: translate(-50%, -125%);

        /* Customization */
        font-family: 'clock-font';
        font-weight: bold;
        font-size: 120px;
        color:#322B32;

        /* Animation */
        animation: flickering 2s step-start .2s;
        animation-iteration-count: infinite;

        /* Interaction */
        pointer-events: none;
    }

    @keyframes flickering {
        50% {opacity: 0;}
    }

    .clock-frame {

        /* Position */
        position: absolute;
        z-index: 2;
        top:50%;
        left:50%;
        transform: translate(-50%, -125%);

        /* Customization */
        font-family: 'clock-font';
        font-weight: bold;
        font-size: 120px;
        color:#322B32;
        opacity: 25%;
        
        /* Interaction */
        pointer-events: none;
    }

</style>