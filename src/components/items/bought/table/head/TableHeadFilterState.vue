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
    v-if="boughtItemsControlsStore.columns.state"
    name="State"
    value=""
    v-model:width="props.width.state"
  />
</template>

<style scoped lang="scss"></style>
