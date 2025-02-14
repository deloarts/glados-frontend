<script setup lang="ts">
import TableHeadFilterInput from "@/components/dataTable/TableHeadFilterInput.vue";

import { userTimeColumnWidth } from "@/presets/columnWidth";

import { useUserTimeStore } from "@/stores/userTime";
import { useUserTimeFilterStore } from "@/stores/filter";

const userTimeStore = useUserTimeStore();
const userTimeFilterStore = useUserTimeFilterStore();

const props = defineProps<{
  width: typeof userTimeColumnWidth;
}>();
</script>

<template>
  <TableHeadFilterInput
    name="ID"
    :item-store="userTimeStore"
    :filter-store="userTimeFilterStore"
    filter-store-key="id"
    :width="props.width.id"
  />
</template>

<style scoped lang="scss"></style>
