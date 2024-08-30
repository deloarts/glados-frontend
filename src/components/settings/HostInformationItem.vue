<script setup lang="ts">
const props = defineProps<{
  title: string;
  text: string;
}>();
</script>

<template>
  <div class="scope">
    <div class="container">
      <div id="grid">
        <div id="slotElement" class="grid-item-center">
          <slot></slot>
        </div>
        <div id="title" class="grid-item-left">
          {{ props.title }}
        </div>
        <div id="text" class="grid-item-left">
          {{ props.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/chart/chartBase.scss";
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
  width: 100%;
  height: 100%;
  border-width: $main-border-width;
  border-style: $main-border-style;
  border-color: $main-border-color;
  border-radius: $main-border-radius;
}

#grid {
  grid-gap: 0;
  grid-template-rows: 50px 50px;
  grid-template-columns: 100px auto;
  grid-template-areas:
    "slotElement title"
    "slotElement text";
}

#slotElement {
  grid-area: slotElement;
  margin: 15px;
}

#title {
  grid-area: title;
  font-size: 1.25em;
  font-weight: 700;
  padding-left: 20px;
  padding-right: 10px;
  padding-top: 20px;
}

#text {
  grid-area: text;
  font-size: 1em;
  font-weight: 700;
  padding-left: 20px;
  padding-right: 10px;
  padding-bottom: 20px;
}
</style>
