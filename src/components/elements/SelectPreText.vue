<script setup lang="ts">
interface Option {
  text: string
  value: string | number | null
}

const props = defineProps<{
  selection: string
  options: Array<Option>
  text: string
}>()

const emit = defineEmits<{
  (e: 'update:selection', v: string): void
}>()

function onChange(event: Event) {
  //@ts-ignore
  emit('update:selection', event.target.value)
}
</script>

<template>
  <div class="box">
    <select v-model="props.selection" @change="onChange">
      <option selected disabled value="">{{ text }}</option>
      <option v-for="option in props.options" :value="option.value">
        {{ props.text }} {{ option.text == '' ? '-' : option.text }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/select/selectBase.scss';
</style>
