<script setup lang="ts">
import type { BoughtItemSchema } from "@/schemas/boughtItem";

import TableItemDate from "@/components/dataTable/TableItemDate.vue";

import { boughtItemColumnWidths } from "@/presets/columnWidth";

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
    v-if="controlsStore.columns.desiredDate"
    name="Desired Delivery Date"
    :value="item.desired_delivery_date"
    :update-method="boughtItemsRequest.putItemsDesiredDeliveryDate"
    :item-store="boughtItemsStore"
    :filter-store="boughtItemFilterStore"
    filter-store-key="desiredDate"
    :width="props.width.desiredDate"
    :center="true"
    :fixed-height="controlsStore.state.fixedHeight"
    :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
  />
</template>

<style scoped lang="scss"></style>
