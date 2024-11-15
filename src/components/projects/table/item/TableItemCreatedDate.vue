<script setup lang="ts">
// @ts-ignore
import moment from "moment";

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
    v-if="projectsControlsStore.columns.createdDate"
    name="Created Date"
    :value="item.created"
    :item-store="projectsStore"
    :display-value="moment(item.created).format('YYYY-MM-DD')"
    :width="props.width.createdDate"
    :center="true"
    :fixed-height="projectsControlsStore.state.fixedHeight"
  />
</template>

<style scoped lang="scss"></style>
