<script setup lang="ts">
import type { BoughtItemSchema } from "@/schemas/boughtItem";

import TableItemSelect from "@/components/dataTable/TableItemSelect.vue";

import { boughtItemColumnWidths } from "@/presets/boughtItemsColumnWidths";

import { boughtItemsRequest } from "@/requests/items";

import { useBoughtItemsStore } from "@/stores/boughtItems";
import { useUnitsStore } from "@/stores/units";
import { useBoughtItemsControlsStore } from "@/stores/controls";
import { useBoughtItemFilterStore } from "@/stores/filter";

const boughtItemsStore = useBoughtItemsStore();
const controlsStore = useBoughtItemsControlsStore();
const boughtItemFilterStore = useBoughtItemFilterStore();
const unitsStore = useUnitsStore();

const props = defineProps<{
  item: BoughtItemSchema;
  width: typeof boughtItemColumnWidths;
}>();
</script>

<template>
  <!-- UNIT ENDPOINT NOT AVAILABLE IN BACKEND -->
  <TableItemSelect
    v-if="controlsStore.columns.unit"
    name="Unit"
    :value="item.unit"
    :options="unitsStore.boughtItemUnitsOption"
    :update-method="boughtItemsRequest.putItemsUnit"
    :item-store="boughtItemsStore"
    :filter-store="boughtItemFilterStore"
    filter-store-key="unit"
    v-model:width="props.width.unit"
    :center="true"
    :fixed-height="controlsStore.state.fixedHeight"
    :edit-mode="false"
  />
</template>

<style scoped lang="scss"></style>
