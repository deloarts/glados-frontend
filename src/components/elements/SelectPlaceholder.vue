<script setup lang="ts">
import { computed } from "vue"

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
  disabled: false
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
  <div class="scope">
    <p>
      <select v-model="computedValue" @change="onChange">
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
      <span>{{ placeholderText }} </span>
    </p>
  </div>
</template>

<style scoped lang="scss">

.scope {
  width: 100%;
  height: 100%;
}

p {
  width: 100%;
  height: 100%;

  position: relative;
  display: inline-block;

  border: none;
  padding: 0;
  margin: 0;
}

span {
  width: max-content;
  height: min-content;

  padding: 2px;
  padding-left: 8px;
  padding-right: 8px;
  margin: 0;

  pointer-events: none;
  position: absolute;

  left: 0px;
  top: 1px;

  border: none;
  border-radius: var(--main-border-radius);

  transition: 0.2s;
  transition-timing-function: ease;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);

  color: white;
  background-color: var(--main-color);
  font-family: var(--main-font-head);
  font-size: 12px;
}

select {
  width: calc(100% - 15px);
  height: calc(100% - 12px);

  color: var(--main-text-color);
  background-color: var(--input-background);

  padding: 0;
  padding-left: 10px;
  padding-right: 10px;

  margin: 0;
  margin-top: 15px;
  margin-left: 10px;

  box-sizing: border-box;
  border-width: var(--main-border-width);
  border-style: var(--main-border-style);
  border-color: var(--input-border-color);
  border-radius: var(--main-border-radius);
  outline: none;

  transition: all 0.2s ease;
}

select:hover {
  background-color: var(--main-background-color-hover);
}

select:focus {
  border-color: var(--main-color);
}
</style>