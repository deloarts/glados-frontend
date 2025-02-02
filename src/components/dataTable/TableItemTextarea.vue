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
  value: string | number | null
  updateMethod?: Function | null
  itemStore?: ItemStoreProtocol | null
  filterStore?: FilterStoreProtocol | null
  filterStoreKey?: string | null
  type?: string
  width?: number
  fixedHeight?: boolean
  editMode?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  updateMethod: null,
  itemStore: null,
  filterStore: null,
  filterStoreKey: null,
  type: 'text',
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

const gtMinWidthTablet = computed<boolean>(() => resolutionStore.gtMinWidthTablet)

const hasFocus = ref<boolean>(false)
const inputModel = ref<string | number | null>(null)
const cssWidth = computed<string>(() => {
  return String(props.width) + 'px'
})

function resizeTextarea(event: Event) {
  var textarea = event.target
  //@ts-ignore
  textarea.style.height = '18px'
  //@ts-ignore
  textarea.style.height = textarea.scrollHeight + 'px'
}

function onEscape() {
  blur()
}

function onEnter(event: Event) {
  if (!props.updateMethod || !props.itemStore) {
    return
  }
  //@ts-ignore
  if (event.keyCode == 13 && !event.shiftKey) {
    blur()
    updateSelectedTableElement(
      props.name,
      inputModel.value,
      props.value,
      props.updateMethod,
      props.itemStore,
    )
  }
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
        (userStore.user.is_superuser || userStore.user.is_adminuser) &&
        gtMinWidthTablet
      "
    >
      <textarea
        v-model="inputModel"
        type="text"
        v-on:keyup.escape="onEscape()"
        v-on:keyup.enter="onEnter($event)"
        @input="resizeTextarea($event)"
        @focusin="itemStore.pause(true), (hasFocus = true), resizeTextarea($event)"
        @focusout="itemStore.pause(false), (hasFocus = false)"
        v-bind:class="{ editing: props.value != inputModel }"
      ></textarea>
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
}

textarea {
  width: 100%;
  height: 18px;
  min-height: 18px;

  overflow: hidden;
  resize: none;

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
}

textarea::placeholder {
  font-family: var(--main-font-text);
  font-size: var(--main-font-text-size);
}
</style>
