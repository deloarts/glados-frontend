<script setup lang="ts">
import TableHeadTitle from "@/components/dataTable/TableHeadTitle.vue";

import { projectsColumnWidths } from "@/presets/columnWidth";
import { useProjectsControlsStore } from "@/stores/controls";

const projectsControlsStore = useProjectsControlsStore();

const props = defineProps<{
  width: typeof projectsColumnWidths;
}>();
</script>

<template>
  <TableHeadTitle
    v-if="projectsControlsStore.columns.productNumber"
    name="Product"
    v-model:width="props.width.productNumber"
  />
</template>

<style scoped lang="scss"></style>
