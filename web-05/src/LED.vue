<script>

    import { Gpio } from 'onoff'
    const led = new Gpio(27, 'out')

    export default {

    created() {
        // UPDATE CLOCK EVERY X SECONDS
        this.interval = setInterval(() => this.toggleLed(), 3000);
    },

    methods: {

        toggleLed() {
            const currentValue = led.readSync()
            if (currentValue) {
                led.writeSync(0)  // turn off
            } else {
                led.writeSync(1)  // turn on
            }
        }
    },
}

</script>

<template>



</template>
