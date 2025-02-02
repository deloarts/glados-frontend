<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

import type { AvailableOption } from '@/models/controls'

import { useProjectsStore } from '@/stores/projects'

import { blur } from '@/helper/document.helper'

const projectsStore = useProjectsStore()

const availableOptionsProjects = ref<Array<AvailableOption>>()

interface Props {
  value: number | null
  error?: string
  width?: number
  center?: boolean
  fixedHeight?: boolean
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  center: false,
  fixedHeight: false,
  required: false,
})
const emit = defineEmits<{
  (e: 'update:value', v: number | null): void
}>()

const computedValue = computed<number | null>({
  get() {
    return props.value
  },
  set(newValue) {
    emit('update:value', newValue)
    return newValue
  },
})

const cssWidth = computed<string>(() => {
  return String(props.width) + 'px'
})
const cssCenter = computed<string>(() => {
  return props.center ? 'center' : 'left'
})

function onContextMenu() {
  blur()
}

function setOptionsProjects() {
  const temp = []
  for (let i = 0; i < projectsStore.all.length; i++) {
    if (projectsStore.all[i].is_active) {
      temp.push({
        text: projectsStore.all[i].number,
        value: String(projectsStore.all[i].id),
      })
    }
  }
  availableOptionsProjects.value = temp
}

onMounted(setOptionsProjects)
</script>

<template>
  <td @contextmenu.prevent="onContextMenu()">
    <select v-model="computedValue" v-bind:class="{ 'select-text': props.value == null }">
      <option value="null" disabled selected hidden>Select</option>
      <option v-for="option in availableOptionsProjects" :key="option.text" :value="option.value">
        {{ option.text }}
      </option>
    </select>
    <!-- <span class="error">{{ props.error }}</span> -->
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
  color: var(--main-text-color);
  background-color: var(--main-background-color);
}

select > option:hover {
  color: var(--main-text-color);
  background-color: var(--main-background-color-hover);
}

.error {
  font-size: 10px;
  font-weight: thin;
  color: var(--main-red);

  vertical-align: bottom;
  text-overflow: ellipsis;
}

.select-text {
  font-style: italic;
  color: var(--main-orange);
}
</style>
