<script>
  
  import ListItem from './ListItem.vue'
  const url = 'http://localhost:3000'
  const sound = require("url:./assets/sounds/music.mp3");
  <!-- TextToSpeech from https://ttsmp3.com/ -->
  const voiceHi = require("url:./assets/sounds/voiceHi.mp3");
  const voiceDel = require("url:./assets/sounds/voiceDel.mp3");
  let toggle = new Boolean(false);

  export default {

    components: {
      ListItem,
    },

    data() {
      return {        
        newItemText: '',
        items: [],
      }
    },

    async created() {
      // Fetch the current list from the server
      this.newItemText = ''
      this.items = Object.values(await (await fetch(`${url}/bulletin`)).json())
    },

    methods: {

      developer() {
        var x = document.getElementById("hid");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
      },

      async playSound() {
        var soundFile = new Audio(sound);
        soundFile.play();
      },
      
      async add() {
        let item = { label: this.newItemText }
        this.newItemText = ''

        console.log(this.newItemText);
        console.log(JSON.stringify(item));

        // Add a new item on the server
        const response = await fetch(`${url}/bulletin`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        })
        if (!response.ok) throw new Error('Failure during add')
        const createdItem = await response.json()
        this.items.push(createdItem)
      },

      async remove(index) {

        // TOGGLE LED
        var par;
        if ( this.toggle )
        {
          par = 'on';
          this.toggle = 'true'; 

          setTimeout(() => this.clearLed(), 2500);

          // Delete an item on the server
          const response = await fetch(`${url}/bulletin/${this.items[index].id}`, {
            method: 'DELETE'
          })
          if (!response.ok) throw new Error('Failure during delete')
          this.items.splice(index, 1)

          // ACTIVATE VOICE
          var soundFile = new Audio(voiceDel);
          soundFile.play();
        }
        else {
          par = 'off';
          this.toggle = 'false';
        }

        const response = await fetch(`${url}/led/${par}`, {
          method: 'post'
        })
      },

      async toggleDialogue() {

          // TOGGLE LED
          var par;
          if ( this.toggle )
          {
            par = 'on';
            this.toggle = 'true'; 

            setTimeout(() => this.clearLed(), 3500);

            // ACTIVATE VOICE
            var soundFile = new Audio(voiceHi);
            soundFile.play();
          }
          else {
            par = 'off';
            this.toggle = 'false';
          }

          const response = await fetch(`${url}/led/${par}`, {
            method: 'post'
          })
      },

      async clearLed() {

        var par;
        par = 'off';
        this.toggle = 'false';

        const response = await fetch(`${url}/led/${par}`, {
          method: 'post'
        })
      }
    },
  }

</script>

<template>

  <!-- BUTTONS -->
  <!-- Icons available at: https://icons8.com/icons/ -->

  <!-- CHAT BUTTON -->
  <button class="button bc3" @click="toggleDialogue()">
      <img class="bg" src="./assets/icons/icons8-chat.png"/>
  </button>

  <!-- REMOVE BUTTON -->
  <button class="button bc1" @click="remove(items.length-1)">
      <img class="bg" src="./assets/icons/icons8-bin.png"/>
  </button>

  <!-- PLAYER BUTTON -->
  <button class="button bc2" @click="playSound()">
      <img class="bg" src="./assets/icons/icons8-music.png"/>
  </button>

  <!-- DEVELOPER BUTTON -->
  <button class="button bc4" @click="developer()">
      <img class="bg" src="./assets/icons/icons8-settings.png"/>
  </button>

  <div id="hid" hidden>

    <div>

      <p v-if="items.length == 0">
        (no items)
      </p>

      <ul>
        <li v-for="(item, index) in items" :key="index">
          <ListItem :time="item.time" :content="item.content"></ListItem>
        </li>
      </ul>

    </div>

    <div>

      <label>Add: <input v-model="newItemText"></label>
      <button @click="add()">Add</button>

    </div>

  </div>

</template>

<style scoped>


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
  opacity: 30%;
  width: 85%;
  height: 85%;

  /* Interaction */
  pointer-events: none;
}

.button {

  /* Position */
  position: absolute;
  z-index: 2;
  margin: 4px 2px;
  transform: translate(0%, -50%);
  left:80%;

  /* Customization */
  border: 15px solid;
  border-color: #322B32;
  border-radius: 5px;
  height: 100px;
  width: 100px;
}

.bc1 {

  /* Position */
  top:40%;

  /* Customization */
  background-color: #f44336;
}

.bc2 {

  /* Position */
  top:60%;

  /* Customization */
  background-color: #7D76E3;
}

.bc3 {

  /* Position */
  top:20%;

  /* Customization */
  background-color: #D6B055;
}

.bc4 {

  /* Position */
  top:80%;

  /* Customization */
  background-color: #D2D2D2;
}

</style>
