<script setup lang="ts">
import { computed } from 'vue'
import LabeledLabel from './LabeledLabel.vue'

interface Props {
  value: number | string | null | undefined
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
  (e: 'update:value', v: number | string | null | undefined): void
}>()

const computedValue = computed<number | string | null | undefined>({
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
      <textarea
        class="labeled-input"
        v-model="computedValue"
        :type="props.type"
        :disabled="props.disabled"
      ></textarea>
      <LabeledLabel
        :value="props.placeholder"
        :tooltip="props.tooltip"
        :required="props.required"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/common/labeled.scss';

.labeled-input {
  font-family: var(--main-font-text);
  font-size: 1em;

  padding-top: 10px;
  padding-bottom: 10px;

  overflow: auto;
  resize: none;
}
</style>
