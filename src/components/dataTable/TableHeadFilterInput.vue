<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'

import type { ItemStoreProtocol } from '@/protocols/itemStoreProtocol'
import type { FilterStoreProtocol } from '@/protocols/filterStoreProtocol'

import { blur } from '@/helper/document.helper'

interface Props {
  name: string
  itemStore: ItemStoreProtocol
  filterStore: FilterStoreProtocol
  filterStoreKey: string
  placeholder?: string
  type?: string
  width?: number
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Filter',
  type: 'text',
})

const inputModel = ref<string | number | Date | null>(null)
const cssWidth = computed<string>(() => {
  return String(props.width) + 'px'
})

function onEscape() {
  blur()
}

function onEnter() {
  blur()
  props.filterStore.set(props.filterStoreKey, inputModel.value)
  props.itemStore.getItems()
}

function onContextMenu() {
  blur()
  props.filterStore.set(props.filterStoreKey, null)
  props.itemStore.getItems()
}

onMounted(() => {
  inputModel.value = props.filterStore.state[props.filterStoreKey]
})

watch(
  () => props.filterStore.state[props.filterStoreKey],
  () => {
    inputModel.value = props.filterStore.state[props.filterStoreKey]
  },
  { deep: true },
)
</script>

<template>
  <th @contextmenu.prevent="onContextMenu()">
    <div>
      <input
        :type="props.type"
        v-model="inputModel"
        :placeholder="props.placeholder"
        v-on:keyup.escape="onEscape()"
        v-on:keyup.enter="onEnter()"
        @focusin="props.itemStore.pause(true)"
        @focusout="props.itemStore.pause(false)"
        v-bind:class="{
          editing: props.filterStore.state[props.filterStoreKey] != inputModel,
        }"
      />
    </div>
  </th>
</template>

<style scoped lang="scss">
@use '@/scss/dataTable/tableHead.scss';

th {
  min-width: v-bind(cssWidth);
  max-width: v-bind(cssWidth);
}

input {
  width: 100%;
  height: 24px;

  box-shadow: none;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;

  color: var(--main-text-color);
  background-color: var(--input-background);
  border: 1px solid var(--input-border-color);
  border-radius: var(--main-border-radius);
  border-style: var(--main-border-style);
  border-width: var(--main-border-width);

  outline: none;

  font-family: var(--main-font-text);
  font-size: var(--main-font-text-size);
}

input:hover {
  background-color: var(--main-background-color-hover);
}

input:focus {
  border-color: var(--main-color);
}
</style>
