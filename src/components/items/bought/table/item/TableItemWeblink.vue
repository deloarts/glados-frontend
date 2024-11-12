<script setup lang="ts">
import type { BoughtItemSchema } from "@/schemas/boughtItem";

import TableItemLink from "@/components/dataTable/TableItemLink.vue";

import { boughtItemColumnWidths } from "@/presets/columnWidth";

import { useBoughtItemsControlsStore } from "@/stores/controls";

const controlsStore = useBoughtItemsControlsStore();

const props = defineProps<{
  item: BoughtItemSchema;
  width: typeof boughtItemColumnWidths;
}>();
</script>

<template>
  <TableItemLink
    v-if="controlsStore.columns.weblink"
    name="Weblink"
    :value="item.weblink"
    :display-icon="true"
    :center="true"
    v-model:width="props.width.weblink"
    :fixed-height="controlsStore.state.fixedHeight"
  />
</template>

<style scoped lang="scss"></style>
