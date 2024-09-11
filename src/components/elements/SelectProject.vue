<script setup lang="ts">
import type { AvailableOption } from "@/models/controls";

const props = defineProps<{
  selection: number;
  optionsActive: Array<AvailableOption>;
  optionsInactive: Array<AvailableOption>;
}>();

const emit = defineEmits<{
  (e: "update:selection", v: number): void;
}>();

function onChange(event) {
  emit("update:selection", event.target.value);
}
</script>

<template>
  <div class="box">
    <select v-model="props.selection" @change="onChange">
      <option value="null" disabled selected hidden>Project</option>
      <option
        v-for="option in props.optionsActive"
        :key="option.text"
        :value="option.value"
      >
        {{ option.text }}
      </option>
      <option
        hidden
        disabled
        v-for="option in props.optionsInactive"
        :key="option.text"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/select/selectForm.scss";

select {
  width: 100%;
  text-align: left;
}

.box {
  width: 100%;
}
</style>
