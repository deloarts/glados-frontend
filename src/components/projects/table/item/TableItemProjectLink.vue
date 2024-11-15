<script setup lang="ts">
import config from "@/config";

import type { ProjectSchema } from "@/schemas/project";

import TableItemLink from "@/components/dataTable/TableItemLink.vue";

import { projectsColumnWidths } from "@/presets/columnWidth";

import { useProjectsControlsStore } from "@/stores/controls";

const projectsControlsStore = useProjectsControlsStore();

const props = defineProps<{
  item: ProjectSchema;
  width: typeof projectsColumnWidths;
}>();
</script>

<template>
  <TableItemLink
    v-if="projectsControlsStore.columns.projectLink"
    name="Weblink"
    :value="`${config.localURL}/#/items/bought?projectNumber=${props.item.number}`"
    :display-icon="true"
    :center="true"
    :width="props.width.projectLink"
    :fixed-height="projectsControlsStore.state.fixedHeight"
    :new-tab="false"
  />
</template>

<style scoped lang="scss"></style>
