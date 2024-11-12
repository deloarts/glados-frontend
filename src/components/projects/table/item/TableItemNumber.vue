<script setup lang="ts">
import type { ProjectSchema } from "@/schemas/project";

import TableItemRowNumber from "@/components/dataTable/TableItemRowNumber.vue";

import { projectsColumnWidths } from "@/presets/columnWidth";

import { useProjectsControlsStore } from "@/stores/controls";

const controlsStore = useProjectsControlsStore();

const props = defineProps<{
  index: number;
  item: ProjectSchema;
  width: typeof projectsColumnWidths;
}>();
</script>

<template>
  <TableItemRowNumber
    :number="index + 1"
    :id="item.id"
    copy-url="projects"
    v-model:width="props.width.number"
    :fixed-height="controlsStore.state.fixedHeight"
  />
</template>

<style scoped lang="scss"></style>
