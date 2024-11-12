<script setup lang="ts">
import TableHeadRowNumber from "@/components/dataTable/TableHeadRowNumber.vue";

import { projectsColumnWidths } from "@/presets/columnWidth";
import { useProjectsControlsStore } from "@/stores/controls";

const projectsControlsStore = useProjectsControlsStore();

const props = defineProps<{
  width: typeof projectsColumnWidths;
}>();
</script>

<template>
  <TableHeadRowNumber
    v-if="projectsControlsStore.columns.projectLink"
    value=""
    v-model:width="props.width.projectLink"
  />
</template>

<style scoped lang="scss"></style>
