<script setup lang="ts">
import TableHeadFilterInput from "@/components/dataTable/TableHeadFilterInput.vue";

import { boughtItemColumnWidths } from "@/presets/boughtItemsColumnWidths";

import { useBoughtItemsStore } from "@/stores/boughtItems";
import { useBoughtItemFilterStore } from "@/stores/filter";
import { useBoughtItemsControlsStore } from "@/stores/controls";

const boughtItemsControlsStore = useBoughtItemsControlsStore();
const boughtItemsStore = useBoughtItemsStore();
const boughtItemsFilterStore = useBoughtItemFilterStore();

const props = defineProps<{
  width: typeof boughtItemColumnWidths;
}>();
</script>

<template>
  <TableHeadFilterInput
    v-if="boughtItemsControlsStore.columns.deliveredDate"
    name="Delivered Date"
    :item-store="boughtItemsStore"
    :filter-store="boughtItemsFilterStore"
    filter-store-key="deliveredDate"
    v-model:width="props.width.deliveredDate"
  />
</template>

<style scoped lang="scss"></style>
