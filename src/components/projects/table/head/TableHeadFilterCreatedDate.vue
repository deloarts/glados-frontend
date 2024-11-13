<script setup lang="ts">
import TableHeadText from "@/components/dataTable/TableHeadText.vue";

import { projectsColumnWidths } from "@/presets/columnWidth";

// import { useProjectsStore } from "@/stores/projects";
// import { useProjectFilterStore } from "@/stores/filter";
import { useProjectsControlsStore } from "@/stores/controls";

// const projectsStore = useProjectsStore();
// const projectFilterStore = useProjectFilterStore();
const projectControlsStore = useProjectsControlsStore();

const props = defineProps<{
  width: typeof projectsColumnWidths;
}>();
</script>

<template>
  <!-- <TableHeadFilterInput
    v-if="projectControlsStore.columns.createdDate"
    name="Created Date"
    :item-store="projectsStore"
    :filter-store="projectFilterStore"
    filter-store-key="createdDate"
    v-model:width="props.width.createdDate"
  /> -->
  <TableHeadText
    v-if="projectControlsStore.columns.createdDate"
    name="Created Date"
    value=""
    v-model:width="props.width.createdDate"
  />
</template>

<style scoped lang="scss"></style>
