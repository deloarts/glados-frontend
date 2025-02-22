<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  selection: string
  options: Array<string>
}>()

const emit = defineEmits<{
  (e: 'update:selection', v: string): void
}>()

const computedSelection = computed<string>({
  get() {
    return props.selection
  },
  set(newValue) {
    emit('update:selection', newValue)
    return newValue
  },
})
</script>

<template>
  <div class="box">
    <select v-model="computedSelection">
      <option v-for="option in props.options" :value="option" :key="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/select/selectForm.scss';
</style>
