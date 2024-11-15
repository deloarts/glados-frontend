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
    v-if="projectsControlsStore.columns.state"
    v-bind:class="{
      active: props.item.is_active,
      inactive: !props.item.is_active,
    }"
    name="State"
    :value="item.is_active"
    :item-store="projectsStore"
    :display-value="props.item.is_active ? 'Active' : 'Inactive'"
    :filter-store="projectsFilterStore"
    filter-store-key="isActive"
    :width="props.width.state"
    :center="true"
    :fixed-height="projectsControlsStore.state.fixedHeight"
  />
</template>

<style scoped lang="scss">
.active {
  color: lime;
}

.inactive {
  color: red;
}
</style>
