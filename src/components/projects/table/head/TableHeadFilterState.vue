<script setup lang="ts">
import TableHeadFilterSelect from "@/components/dataTable/TableHeadFilterSelect.vue";

import type { AvailableOption } from "@/models/controls";
import { projectsColumnWidths } from "@/presets/columnWidth";

import { useProjectsStore } from "@/stores/projects";
import { useProjectFilterStore } from "@/stores/filter";
import { useProjectsControlsStore } from "@/stores/controls";

const projectsStore = useProjectsStore();
const projectFilterStore = useProjectFilterStore();
const projectControlsStore = useProjectsControlsStore();

const props = defineProps<{
  width: typeof projectsColumnWidths;
}>();

let availableOptionsState: Array<AvailableOption> = [
  { text: "All", value: null },
  { text: "Active", value: String(true) },
  { text: "Inactive", value: String(false) },
];
</script>

<template>
  <TableHeadFilterSelect
    v-if="projectControlsStore.columns.state"
    name="State"
    :options="availableOptionsState"
    :item-store="projectsStore"
    :filter-store="projectFilterStore"
    filter-store-key="isActive"
    v-model:width="props.width.state"
  />
</template>

<style scoped lang="scss"></style>
