<script setup lang="ts">
import type { BoughtItemSchema } from "@/schemas/boughtItem";

import TableItemText from "@/components/dataTable/TableItemText.vue";

import { boughtItemColumnWidths } from "@/presets/columnWidth";

import { useBoughtItemsStore } from "@/stores/boughtItems";
import { useBoughtItemsControlsStore } from "@/stores/controls";
import { useBoughtItemFilterStore } from "@/stores/filter";

const boughtItemsStore = useBoughtItemsStore();
const controlsStore = useBoughtItemsControlsStore();
const boughtItemFilterStore = useBoughtItemFilterStore();

const props = defineProps<{
  item: BoughtItemSchema;
  width: typeof boughtItemColumnWidths;
}>();
</script>

<template>
  <TableItemText
    v-if="controlsStore.columns.requestedDate"
    name="Requested Delivery Date"
    :value="item.requested_date"
    :item-store="boughtItemsStore"
    :filter-store="boughtItemFilterStore"
    filter-store-key="requestedDate"
    :width="props.width.requestedDate"
    :center="true"
    :fixed-height="controlsStore.state.fixedHeight"
  />
</template>

<style scoped lang="scss"></style>
