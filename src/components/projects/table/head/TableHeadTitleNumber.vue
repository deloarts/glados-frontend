<script setup lang="ts">
import { computed } from "vue";

import TableHeadRowNumber from "@/components/dataTable/TableHeadRowNumber.vue";

import { projectsColumnWidths } from "@/presets/columnWidth";

import { useLanguageStore } from "@/stores/language";

const languageStore = useLanguageStore();

const props = defineProps<{
  width: typeof projectsColumnWidths;
}>();
const emit = defineEmits<{
  (e: "update:width", v: typeof projectsColumnWidths): void;
}>();

const computedWidth = computed<typeof projectsColumnWidths>({
  get() {
    return props.width;
  },
  set(newValue) {
    emit("update:width", newValue);
    return newValue;
  },
});
</script>

<template>
  <TableHeadRowNumber
    :value="languageStore.l.project.table.number"
    v-model:width="computedWidth.number"
  />
</template>

<style scoped lang="scss"></style>
