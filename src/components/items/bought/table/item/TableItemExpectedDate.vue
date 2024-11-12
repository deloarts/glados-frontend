<script setup lang="ts">
import type { BoughtItemSchema } from "@/schemas/boughtItem";

import TableItemDate from "@/components/dataTable/TableItemDate.vue";

import { boughtItemColumnWidths } from "@/presets/boughtItemsColumnWidths";

import { boughtItemsRequest } from "@/requests/items";

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
  <TableItemDate
    v-if="controlsStore.columns.expectedDate"
    name="Expected Delivery Date"
    :value="item.expected_delivery_date"
    :update-method="boughtItemsRequest.putItemsExpectedDeliveryDate"
    :item-store="boughtItemsStore"
    :filter-store="boughtItemFilterStore"
    filter-store-key="expectedDate"
    v-model:width="props.width.expectedDate"
    :center="true"
    :fixed-height="controlsStore.state.fixedHeight"
    :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
  />
</template>

<style scoped lang="scss"></style>
