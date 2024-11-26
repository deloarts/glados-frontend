<script setup lang="ts">
const props = defineProps<{
  selection: string
  options: Array<string>
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
      <option v-for="option in props.options" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/select/selectForm.scss';
</style>
