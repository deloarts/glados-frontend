<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'

import type { AvailableOption } from '@/models/controls'
import type { ItemStoreProtocol } from '@/protocols/itemStoreProtocol'
import type { FilterStoreProtocol } from '@/protocols/filterStoreProtocol'

import { blur } from '@/helper/document.helper'

interface Props {
  name: string
  options: Array<AvailableOption>
  itemStore: ItemStoreProtocol
  filterStore: FilterStoreProtocol
  filterStoreKey: string
  type?: string
  width?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
})

const inputModel = ref<string | number | Date | null>(null)
const cssWidth = computed<string>(() => {
  return String(props.width) + 'px'
})

function onEscape() {
  blur()
}

function onChange() {
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
      <select
        v-model="inputModel"
        v-on:keyup.escape="onEscape()"
        v-on:change="onChange()"
        @focusin="props.itemStore.pause(true)"
        @focusout="props.itemStore.pause(false)"
      >
        <option v-for="(option, index) in props.options" :key="index" :value="option.value">
          {{ option.text }}
        </option>
      </select>
    </div>
  </th>
</template>

<style scoped lang="scss">
@use '@/scss/dataTable/tableHead.scss';

th {
  min-width: v-bind(cssWidth);
  max-width: v-bind(cssWidth);
}

select {
  width: 100%;
  height: 24px;

  color: var(--main-text-color);
  background-color: var(--input-background);
  border: 1px solid var(--input-border-color);
  border-radius: var(--main-border-radius);
  border-style: var(--main-border-style);
  border-width: var(--main-border-width);

  outline: none;

  box-sizing: border-box;

  transition: all 0.2s ease;
}

select:hover {
  background-color: var(--main-background-color-hover);
}

select:focus {
  border-color: var(--main-color);
}

select > option {
  color: var(--main-text-color);
  background-color: var(--main-background-color-accent-2);
}
</style>
