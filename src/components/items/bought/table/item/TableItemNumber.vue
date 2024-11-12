<script setup lang="ts">
import type { BoughtItemSchema } from "@/schemas/boughtItem";

import TableItemRowNumber from "@/components/dataTable/TableItemRowNumber.vue";

import { boughtItemColumnWidths } from "@/presets/columnWidth";

import { useBoughtItemsControlsStore } from "@/stores/controls";

const controlsStore = useBoughtItemsControlsStore();

const props = defineProps<{
  index: number;
  item: BoughtItemSchema;
  width: typeof boughtItemColumnWidths;
}>();
</script>

<template>
  <TableItemRowNumber
    :number="index + 1"
    :id="item.id"
    copy-url="items/bought"
    :locked-icon="!item.project_is_active"
    :bell-icon="item.high_priority"
    v-model:width="props.width.number"
    :fixed-height="controlsStore.state.fixedHeight"
  />
</template>

<style scoped lang="scss"></style>
