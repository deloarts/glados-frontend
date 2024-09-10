<script setup lang="ts">
import type { UserSchema } from "@/schemas/user";

const props = defineProps<{
  selection: number;
  options: Array<UserSchema>;
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
      <option value="null" disabled selected hidden>User</option>
      <option
        v-for="option in props.options"
        :key="option.full_name"
        :value="option.id"
      >
        {{ option.full_name }}
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
