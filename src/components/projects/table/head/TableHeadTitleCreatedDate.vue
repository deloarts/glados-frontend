<script setup lang="ts">
import TableHeadTitle from "@/components/dataTable/TableHeadTitle.vue";

import { projectsColumnWidths } from "@/presets/columnWidth";
import { useProjectsControlsStore } from "@/stores/controls";

const projectControlsStore = useProjectsControlsStore();

const props = defineProps<{
  width: typeof projectsColumnWidths;
}>();
</script>

<template>
  <TableHeadTitle
    v-if="projectControlsStore.columns.createdDate"
    name="Created"
    v-model:width="props.width.createdDate"
  />
</template>

<style scoped lang="scss"></style>
