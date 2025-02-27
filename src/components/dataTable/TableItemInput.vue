<!-- eslint-disable @typescript-eslint/no-unsafe-function-type -->

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'

import type { ItemStoreProtocol } from '@/protocols/itemStoreProtocol'
import type { FilterStoreProtocol } from '@/protocols/filterStoreProtocol'

import { useUserStore } from '@/stores/user'
import { useResolutionStore } from '@/stores/resolution'

import { blur } from '@/helper/document.helper'
import { updateSelectedTableElement } from '@/helper/selection.helper'

const userStore = useUserStore()
const resolutionStore = useResolutionStore()

interface Props {
  name: string
  value: string | number | Date | null
  updateMethod?: Function | null
  itemStore?: ItemStoreProtocol | null
  filterStore?: FilterStoreProtocol | null
  filterStoreKey?: string | null
  type?: string
  width?: number
  center?: boolean
  fixedHeight?: boolean
  editMode?: boolean
  forceEditMode?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  updateMethod: null,
  itemStore: null,
  filterStore: null,
  filterStoreKey: null,
  type: 'text',
  center: false,
  fixedHeight: false,
  editMode: false,
  forceEditMode: false,
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

const gtMinWidthTablet = computed<boolean>(() => resolutionStore.gtMinWidthTablet)

const hasFocus = ref<boolean>(false)
const inputModel = ref<string | number | Date | null>(null)
const cssWidth = computed<string>(() => {
  return String(props.width) + 'px'
})
const cssCenter = computed<string>(() => {
  return props.center ? 'center' : 'left'
})

function onEscape() {
  blur()
}

function onEnter() {
  if (!props.updateMethod || !props.itemStore) {
    return
  }
  blur()
  updateSelectedTableElement(
    props.name,
    inputModel.value,
    props.value,
    props.updateMethod,
    props.itemStore,
  )
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
  computedFilterStore.value.state[props.filterStoreKey] = String(inputModel.value)
  props.itemStore.getItems()
}

function onFocusIn() {
  hasFocus.value = true
  if (props.itemStore) {
    props.itemStore.pause(true)
  }
}

function onFocusOut() {
  hasFocus.value = false
  if (props.itemStore) {
    props.itemStore.pause(false)
  }
}

onMounted(() => {
  inputModel.value = props.value
})

watch(
  () => props.value,
  () => {
    if (!hasFocus.value) {
      inputModel.value = props.value
    }
  },
)

watch(
  () => hasFocus.value,
  () => {
    if (hasFocus.value) {
      inputModel.value = JSON.parse(JSON.stringify(props.value))
    } else {
      inputModel.value = props.value
    }
  },
)
</script>

<template>
  <td @contextmenu.prevent="onContextMenu()">
    <div
      v-if="
        props.editMode &&
        (userStore.user.is_superuser || userStore.user.is_adminuser || props.forceEditMode) &&
        gtMinWidthTablet
      "
    >
      <input
        :type="props.type"
        v-model="inputModel"
        v-on:keyup.escape="onEscape()"
        v-on:keyup.enter="onEnter()"
        @focusin="onFocusIn()"
        @focusout="onFocusOut()"
        v-bind:class="{ editing: props.value != inputModel }"
      />
    </div>
    <div v-else v-bind:class="{ 'fix-height': props.fixedHeight }">
      <span>{{ props.value }}</span>
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

input {
  width: 100%;
  height: 18px;

  box-shadow: none;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;

  color: var(--main-text-color);
  background-color: transparent;

  outline: none;
  border: none;
  border-color: inherit;

  font-family: var(--main-font-text);
  font-size: var(--main-font-text-size);

  text-align: v-bind(cssCenter);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
