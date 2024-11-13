<script setup lang="ts">
import TableHeadFilterSelect from "@/components/dataTable/TableHeadFilterSelect.vue";

import { boughtItemColumnWidths } from "@/presets/columnWidth";

import { useBoughtItemsStore } from "@/stores/boughtItems";
import { useBoughtItemFilterStore } from "@/stores/filter";
import { useUnitsStore } from "@/stores/units";
import { useBoughtItemsControlsStore } from "@/stores/controls";

const boughtItemsControlsStore = useBoughtItemsControlsStore();
const boughtItemsStore = useBoughtItemsStore();
const boughtItemsFilterStore = useBoughtItemFilterStore();
const unitsStore = useUnitsStore();

const props = defineProps<{
  width: typeof boughtItemColumnWidths;
}>();
</script>

<template>
  <TableHeadFilterSelect
    v-if="boughtItemsControlsStore.columns.unit"
    name="Unit"
    :options="unitsStore.boughtItemUnitsOptionFilter"
    :item-store="boughtItemsStore"
    :filter-store="boughtItemsFilterStore"
    filter-store-key="unit"
    v-model:width="props.width.unit"
  />
</template>

<style scoped lang="scss"></style>
