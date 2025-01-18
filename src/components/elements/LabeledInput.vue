<script setup lang="ts">
import { computed } from 'vue'
import LabeledLabel from './LabeledLabel.vue'

interface Props {
  value: number | string | Date | null | undefined
  placeholder: string
  type?: string
  required?: boolean
  disabled?: boolean
  tooltip?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
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
</script>

<template>
  <div class="labeled-scope">
    <div class="labeled-container">
      <input
        class="labeled-input"
        v-model="computedValue"
        :type="props.type"
        :disabled="props.disabled"
      />
      <LabeledLabel :value="props.placeholder" :tooltip="props.tooltip" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/common/labeled.scss';
</style>
