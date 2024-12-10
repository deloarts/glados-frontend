<script setup lang="ts">
import type { AvailableOption } from '@/models/controls'

import { useLanguageStore } from '@/stores/language'
const languageStore = useLanguageStore()

const props = defineProps<{
  selection: number
  optionsActive: Array<AvailableOption>
  optionsInactive: Array<AvailableOption>
}>()

const emit = defineEmits<{
  (e: 'update:selection', v: number): void
}>()

function onChange(event: Event) {
  //@ts-ignore
  emit('update:selection', event.target.value)
}
</script>

<template>
  <div class="box">
    <select v-model="props.selection" @change="onChange">
      <option value="null" disabled selected hidden>
        {{ languageStore.l.boughtItem.input.projectNumberPlaceholder }}
      </option>
      <option v-for="option in props.optionsActive" :key="option.text" :value="option.value">
        {{ option.text }}
      </option>
      <option
        hidden
        disabled
        v-for="option in props.optionsInactive"
        :key="option.text"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/select/selectForm.scss';

select {
  width: 100%;
  text-align: left;
}

.box {
  width: 100%;
}
</style>
