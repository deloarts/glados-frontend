<script setup lang="ts">
import TableHeadText from "@/components/dataTable/TableHeadText.vue";

import { boughtItemColumnWidths } from "@/presets/columnWidth";

import { useBoughtItemsControlsStore } from "@/stores/controls";

const boughtItemsControlsStore = useBoughtItemsControlsStore();

const props = defineProps<{
  width: typeof boughtItemColumnWidths;
}>();
</script>

<template>
  <TableHeadText
    v-if="boughtItemsControlsStore.columns.arrivalWeeks"
    name="Arrival"
    value="(weeks)"
    :width="props.width.arrivalWeeks"
  />
</template>

<style scoped lang="scss"></style>
