<script setup lang="ts">
import TableHeadRowNumber from "@/components/dataTable/TableHeadRowNumber.vue";

import { boughtItemColumnWidths } from "@/presets/columnWidth";
import { useBoughtItemsControlsStore } from "@/stores/controls";

const boughtItemsControlsStore = useBoughtItemsControlsStore();

const props = defineProps<{
  width: typeof boughtItemColumnWidths;
}>();
</script>

<template>
  <TableHeadRowNumber
    v-if="boughtItemsControlsStore.columns.weblink"
    value=""
    :width="props.width.weblink"
  />
</template>

<style scoped lang="scss"></style>
