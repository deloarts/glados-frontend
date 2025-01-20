<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  value: string
  required?: boolean
  tooltip?: string
}
const props = withDefaults(defineProps<Props>(), {
  required: false,
})

const labelText = computed<string>(() => {
  const returnValue = props.required ? `${props.value} *` : props.value
  return showTooltip.value && props.tooltip ? props.tooltip : returnValue
})
const showTooltip = ref<boolean>(false)
</script>

<template>
  <div
    class="labeled-label"
    v-bind:class="{ 'labeled-label-tooltip': tooltip }"
    @click="showTooltip = !showTooltip"
    @mouseout="showTooltip = false"
  >
    {{ labelText }}
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/common/labeled.scss';
</style>
