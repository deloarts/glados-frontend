<script setup lang="ts">
import { computed } from 'vue'

interface Option {
  text: string
  value: string | number | null
}

const props = defineProps<{
  selection: string | number | null
  options: Array<Option>
  text: string
}>()

const emit = defineEmits<{
  (e: 'update:selection', v: string | number | null): void
}>()

const computedSelection = computed<string | number | null>({
  get() {
    return props.selection
  },
  set(newValue) {
    emit('update:selection', newValue)
    return newValue
  },
})

function onChange(event: Event) {
  emit('update:selection', (event.target as HTMLSelectElement).value)
}
</script>

<template>
  <div class="box">
    <select v-model="computedSelection" @change="onChange">
      <option selected disabled value="">{{ text }}</option>
      <option v-for="option in props.options" :value="option.value" :key="option.text">
        {{ props.text }} {{ option.text == '' ? '-' : option.text }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/select/selectBase.scss';
</style>
