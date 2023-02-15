<script lang="ts">
export default {
  name: 'Prompt',
  props: ["showPrompt", "promptText", "onYes", "onNo"],
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
  },
}
</script>

<template>
  <div class="prompt" v-if="showPrompt">
    <div class="coat"></div>
    <div class="center">
      <div id="question" class="question">{{ promptText }}</div>
      <button id="btnYes" v-on:click="onYes">Yes</button>
      <button id="btnNo" v-on:click="onNo">No</button>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '../assets/variables.scss';

.prompt {
  color: white;
}

.coat {
  z-index: 1000;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background: $main-background-color;

  opacity: 0.9;
}

.center {
  z-index: 1001;
  position: absolute;
  left: 50%;
  top: 50%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);

  display: grid;
  grid-gap: 20px;
  grid-template-rows: 80px 30px;
  grid-template-columns: 150px 150px;
  grid-template-areas: 'question question'
    'btnYes btnNo';

  background: $main-background-color;
  border-style: solid;
  border-color: $main-color;
  border-width: 1px;
  border-radius: 5px;

  text-align: center;
  padding: 30px;
  padding-top: 0;
  padding-bottom: 30px;
}

input {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 3px;
  transition: background 0.2s ease;
}

input:hover {
  background: lightgray;
}

button {
  font-family: 'Play', 'Segoe UI', 'Arial';
  font-weight: 700;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 3px;
  transition: background 0.2s ease;
}

button:focus,
button:hover {
  background: lightgray;
  /* outline: 0; */
}

.question {
  font-family: 'Play', 'Segoe UI', 'Arial';
  font-size: 1.5em;
  // padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#question {
  grid-area: question;
}

#btnYes {
  grid-area: btnYes;
}

#btnNo {
  grid-area: btnNo;
}
</style>
