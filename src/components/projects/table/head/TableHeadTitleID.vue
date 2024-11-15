<script setup lang="ts">
import { computed } from "vue";

import TableHeadTitle from "@/components/dataTable/TableHeadTitle.vue";

import { projectsColumnWidths } from "@/presets/columnWidth";
import { useProjectsControlsStore } from "@/stores/controls";

const projectControlsStore = useProjectsControlsStore();

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
  <TableHeadTitle
    v-if="projectControlsStore.columns.id"
    name="ID"
    v-model:width="computedWidth.id"
  />
</template>

<style scoped lang="scss"></style>
