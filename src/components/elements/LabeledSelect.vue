<script setup lang="ts">
import { computed } from 'vue'

import type { AvailableOption } from '@/models/controls'

interface Props {
  value: number | string | Date | null | undefined
  optionsActive: Array<AvailableOption>
  optionsInactive?: Array<AvailableOption> | null | undefined
  placeholder: string
  required?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
})
const emit = defineEmits<{
  (e: 'update:value', v: number | string | Date | null | undefined): void
}>()

const computedValue = computed<number | string | Date | null | undefined>({
  get() {
    return props.value
  },
  set(newValue) {
    emit('update:value', newValue)
    return newValue
  },
})

const placeholderText = computed<string>(() => {
  return props.required ? `${props.placeholder} *` : `${props.placeholder}`
})

function onChange(event: Event) {
  emit('update:value', (event.target as HTMLSelectElement).value)
}
</script>

<template>
  <div class="labeled-scope">
    <div class="labeled-container">
      <select class="labeled-input" v-model="computedValue" @change="onChange">
        <option value="null" disabled selected hidden>
          {{ props.placeholder }}
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
      <span class="labeled-label">{{ placeholderText }} </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/common/labeled.scss';
</style>
