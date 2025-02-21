<!-- eslint-disable @typescript-eslint/no-unsafe-function-type -->

<script setup lang="ts">
import { computed } from 'vue'

import type { AvailableOption } from '@/models/controls'
import type { ItemStoreProtocol } from '@/protocols/itemStoreProtocol'
import type { FilterStoreProtocol } from '@/protocols/filterStoreProtocol'

import { useUserStore } from '@/stores/user'

import { blur } from '@/helper/document.helper'
import { capitalizeFirstLetter } from '@/helper/string.helper'
import { updateSelectedTableElement } from '@/helper/selection.helper'

const userStore = useUserStore()

interface Props {
  name: string
  value: string | number | Date | null
  options: Array<AvailableOption>
  updateMethod?: Function | null
  displayValue?: string | null
  itemStore?: ItemStoreProtocol | null
  filterStore?: FilterStoreProtocol | null
  filterStoreKey?: string | null
  width?: number
  center?: boolean
  fixedHeight?: boolean
  editMode?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  updateMethod: null,
  displayValue: null,
  itemStore: null,
  filterStore: null,
  filterStoreKey: null,
  center: false,
  fixedHeight: false,
  editMode: false,
})
const emit = defineEmits<{
  (e: 'update:filterStore', v: FilterStoreProtocol | null): void
}>()

const computedFilterStore = computed<FilterStoreProtocol | null>({
  get() {
    return props.filterStore
  },
  set(newValue) {
    emit('update:filterStore', newValue ? newValue.state : null)
    return newValue
  },
})

const cssWidth = computed<string>(() => {
  return String(props.width) + 'px'
})
const cssCenter = computed<string>(() => {
  return props.center ? 'center' : 'left'
})

function onEscape() {
  blur()
}

function onContextMenu() {
  if (
    !props.value ||
    !props.itemStore ||
    !props.filterStore ||
    !props.filterStoreKey ||
    !computedFilterStore.value
  ) {
    return
  }

  blur()
  computedFilterStore.value.state[props.filterStoreKey] = String(props.value)
  props.itemStore.getItems()
}

function onChange(eventTarget: EventTarget | null) {
  if (!props.updateMethod || !props.itemStore) {
    return
  }
  blur()
  updateSelectedTableElement(
    props.name,
    (eventTarget as HTMLSelectElement).value,
    props.value,
    props.updateMethod,
    props.itemStore,
  )
}
</script>

<template>
  <td @contextmenu.prevent="onContextMenu()">
    <select
      v-if="props.editMode && (userStore.user.is_superuser || userStore.user.is_adminuser)"
      :value="props.value"
      v-on:keyup.escape="onEscape()"
      v-on:change="onChange($event.target)"
    >
      <option v-for="(option, index) in props.options" :key="index" :value="option.value">
        {{ option.text }}
      </option>
    </select>
    <div v-else v-bind:class="{ 'fix-height': props.fixedHeight }">
      <span>{{
        capitalizeFirstLetter(String(props.displayValue ? props.displayValue : props.value))
      }}</span>
    </div>
  </td>
</template>

<style scoped lang="scss">
@use '@/scss/dataTable/tableItem.scss';

td {
  min-width: v-bind(cssWidth);
  max-width: v-bind(cssWidth);
  text-align: v-bind(cssCenter);
}

select {
  appearance: none;

  width: 100%;
  height: 18px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;

  border: none;
  outline: none;

  color: var(--main-text-color);
  background-color: transparent;

  font-family: var(--main-font-text);
  font-size: var(--main-font-text-size);

  text-align: v-bind(cssCenter);
}

select:hover {
  cursor: pointer;
}

select::-ms-expand {
  display: none;
}

select > option {
  color: white;
  background-color: var(--main-color);
}

select > option:hover {
  color: white;
  background-color: var(--main-color-hover);
}

span {
  padding-left: 2px;
}
</style>
