<script setup lang="ts">
import { computed } from 'vue'

import type { UserSchema } from '@/schemas/user'

interface Props {
  selection: number
  options: Array<UserSchema>
  placeholder?: string | null
}
const props = withDefaults(defineProps<Props>(), {
  placeholder: null,
})
const emit = defineEmits<{
  (e: 'update:selection', v: number): void
}>()

const computedSelection = computed<number>({
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
      <option value="null" disabled selected hidden>
        {{ props.placeholder ? props.placeholder : 'User' }}
      </option>
      <option v-for="option in props.options" :key="option.full_name" :value="option.id">
        {{ option.full_name }}
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
