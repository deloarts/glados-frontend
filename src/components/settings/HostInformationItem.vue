<script setup lang="ts">
const props = defineProps<{
  title: string
  text: string
}>()
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
@use '@/scss/chart/chartBase.scss';
@use '@/scss/grid/gridBase.scss';

.scope {
  width: 100%;
  height: 100%;
  cursor: default;

  margin: 0;
  padding: 0;

  font-family: var(--main-font-text);
  font-size: var(--main-font-text-size);

  background-color: var(--main-background-color-accent-1);
}

.container {
  width: 100%;
  height: 100%;
  border-width: var(--main-border-width);
  border-style: var(--main-border-style);
  border-color: var(--main-border-color);
  border-radius: var(--main-border-radius);
}

#grid {
  grid-gap: 0;
  grid-template-rows: 50px 50px;
  grid-template-columns: 100px auto;
  grid-template-areas:
    'slotElement title'
    'slotElement text';
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
