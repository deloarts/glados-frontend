<script setup>
import { ref } from "vue";
import Vue3Autocounter from "vue3-autocounter";

// Props & Emits
const props = defineProps(["text", "count"]);

let start = ref(0);

function setStart() {
  start.value = props.count;
}
</script>

<template>
  <div class="scope">
    <div class="container">
      <div id="grid">
        <div id="count" class="grid-item-center">
          <Vue3Autocounter
            :startAmount="start"
            :endAmount="props.count"
            :duration="1"
            @finished="setStart"
          ></Vue3Autocounter>
        </div>
        <div id="text" class="grid-item-left">
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/grid/gridBase.scss";

.scope {
  width: 100%;
  height: 100%;
  cursor: default;

  margin: 0;
  padding: 0;

  font-family: $main-font;
  font-size: $main-font-size;

  background-color: $main-background-color-dark;
}

.container {
  width: calc(100% - 2px);
  height: calc(100% - 2px);

  border-width: $main-border-width;
  border-style: $main-border-style;
  border-color: $main-border-color;
  border-radius: $main-border-radius;
}

#grid {
  grid-gap: 0;
  grid-template-rows: auto;
  grid-template-columns: 100px auto;
  grid-template-areas: "count text";
}

#count {
  grid-area: count;
  font-size: 2.5em;
  font-weight: 700;
}

#text {
  grid-area: text;
  font-size: 1.25em;
  font-weight: 700;
}
</style>
