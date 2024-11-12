<script setup lang="ts">
import TableHeadTitle from "@/components/dataTable/TableHeadTitle.vue";

import { boughtItemColumnWidths } from "@/presets/columnWidth";
import { useBoughtItemsControlsStore } from "@/stores/controls";

const boughtItemsControlsStore = useBoughtItemsControlsStore();

const props = defineProps<{
  width: typeof boughtItemColumnWidths;
}>();
</script>

<template>
  <TableHeadTitle
    v-if="boughtItemsControlsStore.columns.manufacturer"
    name="Manufacturer"
    v-model:width="props.width.manufacturer"
  />
</template>

<style scoped lang="scss"></style>
