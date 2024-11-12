<script setup lang="ts">
import TableHeadTitle from "@/components/dataTable/TableHeadTitle.vue";

import { boughtItemColumnWidths } from "@/presets/boughtItemsColumnWidths";
import { useBoughtItemsControlsStore } from "@/stores/controls";

const boughtItemsControlsStore = useBoughtItemsControlsStore();

const props = defineProps<{
  width: typeof boughtItemColumnWidths;
}>();
</script>

<template>
  <TableHeadTitle
    v-if="boughtItemsControlsStore.columns.deliveredDate"
    name="Delivered"
    v-model:width="props.width.deliveredDate"
  />
</template>

<style scoped lang="scss"></style>
