<script setup lang="ts">
import type { ProjectSchema } from "@/schemas/project";

import TableItemText from "@/components/dataTable/TableItemText.vue";

import { projectsColumnWidths } from "@/presets/columnWidth";

import { useProjectsStore } from "@/stores/projects";
import { useProjectsControlsStore } from "@/stores/controls";
import { useProjectFilterStore } from "@/stores/filter";
import { useUsersStore } from "@/stores/user";

const projectsStore = useProjectsStore();
const projectsControlsStore = useProjectsControlsStore();
const projectsFilterStore = useProjectFilterStore();
const usersStore = useUsersStore();

const props = defineProps<{
  item: ProjectSchema;
  width: typeof projectsColumnWidths;
}>();
</script>

<template>
  <TableItemText
    v-if="projectsControlsStore.columns.designatedUserID"
    name="Designated User"
    :value="item.designated_user_id"
    :item-store="projectsStore"
    :filter-store="projectsFilterStore"
    :display-value="usersStore.getNameByID(props.item.designated_user_id)"
    filter-store-key="designatedUserID"
    :width="props.width.designatedUserID"
    :fixed-height="projectsControlsStore.state.fixedHeight"
  />
</template>

<style scoped lang="scss"></style>
