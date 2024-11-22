<script setup lang="ts">
import type { BoughtItemSchema } from "@/schemas/boughtItem";

import TableItemText from "@/components/dataTable/TableItemText.vue";

import { boughtItemColumnWidths } from "@/presets/columnWidth";

import { useBoughtItemsStore } from "@/stores/boughtItems";
import { useBoughtItemsControlsStore } from "@/stores/controls";
import { useBoughtItemFilterStore } from "@/stores/filter";
import { useUsersStore } from "@/stores/user";

const boughtItemsStore = useBoughtItemsStore();
const usersStore = useUsersStore();
const controlsStore = useBoughtItemsControlsStore();
const boughtItemFilterStore = useBoughtItemFilterStore();

const props = defineProps<{
  item: BoughtItemSchema;
  width: typeof boughtItemColumnWidths;
}>();
</script>

<template>
  <TableItemText
    v-if="controlsStore.columns.ordererID"
    name="Orderer"
    :value="item.orderer_id"
    :item-store="boughtItemsStore"
    :filter-store="boughtItemFilterStore"
    :display-value="usersStore.getNameByID(item.orderer_id)"
    filter-store-key="ordererID"
    :width="props.width.ordererID"
    :fixed-height="controlsStore.state.fixedHeight"
  />
</template>

<style scoped lang="scss"></style>
