<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";

import { blur } from "@/helper/document.helper";

interface Props {
  value: string | number | Date | null;
  error?: string;
  type?: string;
  width?: number;
  center?: boolean;
  fixedHeight?: boolean;
  required?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  center: false,
  fixedHeight: false,
  required: false,
  disabled: false,
});
const emit = defineEmits<{
  (e: "update:value", v: string | number | Date | null): void;
}>();

const computedValue = computed<string | number | Date | null>({
  get() {
    return props.value;
  },
  set(newValue) {
    emit("update:value", newValue);
    return newValue;
  },
});

const cssWidth = computed<string>(() => {
  return String(props.width) + "px";
});
const cssCenter = computed<string>(() => {
  return props.center ? "center" : "left";
});

function onEscape() {
  blur();
}

function onEnter() {
  blur();
}

function onContextMenu() {
  blur();
}

onMounted(() => {});
</script>

<template>
  <td @contextmenu.prevent="onContextMenu()">
    <input
      :type="props.type"
      v-model="computedValue"
      v-on:keyup.escape="onEscape()"
      v-on:keyup.enter="onEnter()"
      :disabled="props.disabled"
    />
    <span class="error">{{ props.error }}</span>
  </td>
</template>

<style scoped lang="scss">
@import "@/scss/dataTable/tableItem.scss";

td {
  min-width: v-bind(cssWidth);
  max-width: v-bind(cssWidth);
  text-align: v-bind(cssCenter);
}

input {
  width: 100%;
  height: 18px;

  box-shadow: none;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;

  color: var(--main-text-color);
  background-color: transparent;

  outline: none;
  border: none;
  border-color: inherit;

  font-family: Calibri;
  font-size: 14px;

  text-align: v-bind(cssCenter);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.error {
  font-size: 10px;
  font-weight: thin;
  color: var(--main-red);

  vertical-align: bottom;
  text-overflow: ellipsis;
}
</style>
