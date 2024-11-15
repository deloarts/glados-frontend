<script setup lang="ts">
import type { BoughtItemSchema } from "@/schemas/boughtItem";

import TableItemSelect from "@/components/dataTable/TableItemSelect.vue";

import { boughtItemColumnWidths } from "@/presets/columnWidth";

import { boughtItemsRequest } from "@/requests/items";

import { useBoughtItemsStore } from "@/stores/boughtItems";
import { useStatusStore } from "@/stores/status";
import { useBoughtItemsControlsStore } from "@/stores/controls";
import { useBoughtItemFilterStore } from "@/stores/filter";

const boughtItemsStore = useBoughtItemsStore();
const controlsStore = useBoughtItemsControlsStore();
const boughtItemFilterStore = useBoughtItemFilterStore();
const statusStore = useStatusStore();

const props = defineProps<{
  item: BoughtItemSchema;
  width: typeof boughtItemColumnWidths;
}>();
</script>

<template>
  <TableItemSelect
    v-if="controlsStore.columns.status"
    name="Status"
    :value="item.status"
    :options="statusStore.boughtItemStatusOption"
    :update-method="boughtItemsRequest.putItemsStatus"
    :item-store="boughtItemsStore"
    :filter-store="boughtItemFilterStore"
    filter-store-key="status"
    :width="props.width.status"
    :center="true"
    :fixed-height="controlsStore.state.fixedHeight"
    :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
  />
</template>

<style scoped lang="scss"></style>
