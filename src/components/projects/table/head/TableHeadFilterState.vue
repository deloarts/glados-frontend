<script setup lang="ts">
import { computed } from "vue";

import TableHeadFilterSelect from "@/components/dataTable/TableHeadFilterSelect.vue";

import type { AvailableOption } from "@/models/controls";
import { projectsColumnWidths } from "@/presets/columnWidth";

import { useLanguageStore } from "@/stores/language";
import { useProjectsStore } from "@/stores/projects";
import { useProjectFilterStore } from "@/stores/filter";
import { useProjectsControlsStore } from "@/stores/controls";

const languageStore = useLanguageStore();
const projectsStore = useProjectsStore();
const projectFilterStore = useProjectFilterStore();
const projectControlsStore = useProjectsControlsStore();

const props = defineProps<{
  width: typeof projectsColumnWidths;
}>();

const availableOptionsState = computed<Array<AvailableOption>>(() => {
  return [
    { text: languageStore.l.project.options.showAll, value: null },
    {
      text: languageStore.l.project.options.status.active,
      value: String(true),
    },
    {
      text: languageStore.l.project.options.status.inactive,
      value: String(false),
    },
  ];
});
</script>

<template>
  <TableHeadFilterSelect
    v-if="projectControlsStore.columns.state"
    name="State"
    :options="availableOptionsState"
    :item-store="projectsStore"
    :filter-store="projectFilterStore"
    filter-store-key="isActive"
    :width="props.width.state"
  />
</template>

<style scoped lang="scss"></style>
