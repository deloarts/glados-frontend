<script setup lang="ts">
import { ref } from 'vue'
import Vue3Autocounter from 'vue3-autocounter'

// Props & Emits
const props = defineProps<{
  text: string
  count: number
}>()

const start = ref(0)

function setStart() {
  start.value = props.count
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
          />
        </div>
        <div id="text" class="grid-item-left">
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/grid/gridBase.scss';

.scope {
  width: 100%;
  height: 100%;
  cursor: default;

  margin: 0;
  padding: 0;

  font-family: var(--main-font-head);
  font-size: var(--main-font-head-size);

  background-color: var(--main-background-color-accent-1);
}

.container {
  width: calc(100% - 2px);
  height: calc(100% - 2px);

  border-width: var(--main-border-width);
  border-style: var(--main-border-style);
  border-color: var(--main-border-color);
  border-radius: var(--main-border-radius);
}

#grid {
  grid-gap: 0;
  grid-template-rows: auto;
  grid-template-columns: 100px auto;
  grid-template-areas: 'count text';
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
