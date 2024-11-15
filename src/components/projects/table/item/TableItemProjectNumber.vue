<script setup lang="ts">
import type { ProjectSchema } from "@/schemas/project";

import TableItemText from "@/components/dataTable/TableItemText.vue";

import { projectsColumnWidths } from "@/presets/columnWidth";

import { useProjectsStore } from "@/stores/projects";
import { useProjectsControlsStore } from "@/stores/controls";
import { useProjectFilterStore } from "@/stores/filter";

const projectsStore = useProjectsStore();
const projectsControlsStore = useProjectsControlsStore();
const projectsFilterStore = useProjectFilterStore();

const props = defineProps<{
  item: ProjectSchema;
  width: typeof projectsColumnWidths;
}>();
</script>

<template>
  <TableItemText
    v-if="projectsControlsStore.columns.projectNumber"
    name="Project Number"
    :value="item.number"
    :item-store="projectsStore"
    :filter-store="projectsFilterStore"
    filter-store-key="number"
    :width="props.width.projectNumber"
    :center="true"
    :fixed-height="projectsControlsStore.state.fixedHeight"
  />
</template>

<style scoped lang="scss"></style>
