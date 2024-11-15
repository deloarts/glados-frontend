<script setup lang="ts">
import TableHeadFilterSelect from "@/components/dataTable/TableHeadFilterSelect.vue";

import { projectsColumnWidths } from "@/presets/columnWidth";

import { useProjectsStore } from "@/stores/projects";
import { useProjectFilterStore } from "@/stores/filter";
import { useProjectsControlsStore } from "@/stores/controls";
import { useUsersStore } from "@/stores/user";

const projectsStore = useProjectsStore();
const projectFilterStore = useProjectFilterStore();
const projectControlsStore = useProjectsControlsStore();
const usersStore = useUsersStore();

const props = defineProps<{
  width: typeof projectsColumnWidths;
}>();
</script>

<template>
  <TableHeadFilterSelect
    v-if="projectControlsStore.columns.designatedUser"
    name="Receiver ID"
    :options="usersStore.usersOptionsFilter"
    :item-store="projectsStore"
    :filter-store="projectFilterStore"
    filter-store-key="designatedUserId"
    :width="props.width.designatedUser"
  />
</template>

<style scoped lang="scss"></style>
