<script setup lang="ts">
import type { UserTimeSchema } from "@/schemas/userTime";

import TableItemText from "@/components/dataTable/TableItemText.vue";

import { userTimeColumnWidth } from "@/presets/columnWidth";

import { useUserTimeStore } from "@/stores/userTime";
import { useUserTimeFilterStore } from "@/stores/filter";

const userTimeStore = useUserTimeStore();
const userTimeFilterStore = useUserTimeFilterStore();

const props = defineProps<{
  item: UserTimeSchema;
  width: typeof userTimeColumnWidth;
}>();
</script>

<template>
  <TableItemText
    name="ID"
    :value="item.id"
    :item-store="userTimeStore"
    :filter-store="userTimeFilterStore"
    filter-store-key="id"
    :width="props.width.id"
    :center="true"
    :fixed-height="true"
  />
</template>

<style scoped lang="scss"></style>
