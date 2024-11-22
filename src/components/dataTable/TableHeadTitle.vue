<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue";

interface Props {
  name: string;
  value?: string;
  width?: number;
}
const props = withDefaults(defineProps<Props>(), {
  value: null,
});
const emit = defineEmits<{
  (e: "update:width", v: number | null): void;
}>();

const initialWidth = ref<number>(0);
const resized = ref<boolean>(false);

const cssMinWidth = computed<string>(() => {
  return String(initialWidth.value) + "px";
});
const cssWidth = computed<string>(() => {
  if (resized.value) {
    emit("update:width", null);
    return "min-content";
  } else {
    emit("update:width", initialWidth.value);
    return String(props.width) + "px";
  }
});

onBeforeMount(() => {
  initialWidth.value = Number(props.width);
});
</script>

<template>
  <th @contextmenu.prevent="" v-on:click="resized = !resized">
    <div>
      <span>{{ props.value == null ? props.name : props.value }} </span>
    </div>
  </th>
</template>

<style scoped lang="scss">
@import "@/scss/dataTable/tableHead.scss";

th {
  min-width: v-bind(cssMinWidth);
  max-width: v-bind(cssWidth);
  width: v-bind(cssWidth);

  cursor: ew-resize;
}
</style>
