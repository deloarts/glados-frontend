<script setup lang="ts">
import { computed } from 'vue'

import type { ItemStoreProtocol } from '@/protocols/itemStoreProtocol'
import type { FilterStoreProtocol } from '@/protocols/filterStoreProtocol'

import { blur } from '@/helper/document.helper'

interface Props {
  name: string
  value: string | number | Date | boolean | null
  itemStore?: ItemStoreProtocol | null
  filterStore?: FilterStoreProtocol | null
  displayValue?: string | null
  filterStoreKey?: string | null
  width?: number
  center?: boolean
  fixedHeight?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  itemStore: null,
  filterStore: null,
  displayValue: null,
  filterStoreKey: null,
  center: false,
  fixedHeight: false,
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

const cssWidth = computed<string>(() => {
  return String(props.width) + 'px'
})
const cssCenter = computed<string>(() => {
  return props.center ? 'center' : 'left'
})
</script>

<template>
  <td @contextmenu.prevent="onContextMenu()">
    <div v-bind:class="{ 'fix-height': props.fixedHeight }">
      <span>{{ props.displayValue != null ? props.displayValue : props.value }}</span>
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
</style>
