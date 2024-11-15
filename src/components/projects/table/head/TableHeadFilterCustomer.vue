<script setup lang="ts">
import TableHeadFilterInput from "@/components/dataTable/TableHeadFilterInput.vue";

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
</script>

<template>
  <TableHeadFilterInput
    v-if="projectControlsStore.columns.customer"
    name="Customer"
    :item-store="projectsStore"
    :filter-store="projectFilterStore"
    filter-store-key="customer"
    :width="props.width.customer"
  />
</template>

<style scoped lang="scss"></style>
