<script setup lang="ts">
import { computed } from 'vue'

import { useLanguageStore } from '@/stores/language'

const languageStore = useLanguageStore()

interface Props {
  selection: 'enGB' | 'deAT'
}
const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
  (e: 'update:selection', v: 'enGB' | 'deAT'): void
}>()
const computedSelection = computed<'enGB' | 'deAT'>({
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
      <option v-for="option in languageStore.languageOptions" :value="option.value">
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
