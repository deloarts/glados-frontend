<script setup>
import { ref } from "vue"

const props = defineProps(["selection", "options"])
const emit = defineEmits(["update:selection"])

function onChange(event) {
  emit("update:selection", event.target.value)
}
</script>

<template>
  <div class="box">
    <select v-model="props.selection" @change="onChange">
      <option v-for="option in props.options" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/select/selectBase.scss';
</style>