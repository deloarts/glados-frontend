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
    v-if="boughtItemsControlsStore.columns.noteGeneral"
    name="Note"
    v-model:width="props.width.noteGeneral"
  />
</template>

<style scoped lang="scss"></style>
