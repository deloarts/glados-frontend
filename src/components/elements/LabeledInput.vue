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
  error?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
  error: false,
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
      <LabeledLabel
        :class="{ error: props.error }"
        :value="props.placeholder"
        :tooltip="props.tooltip"
        :required="props.required"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/common/labeled.scss';
</style>
