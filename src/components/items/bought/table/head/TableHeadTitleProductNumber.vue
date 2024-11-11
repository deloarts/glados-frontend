<script setup lang="ts">
import TableHeadTitle from "@/components/dataTable/TableHeadTitle.vue";

import { boughtItemColumnWidths } from "@/presets/boughtItemsColumnWidths";

const props = defineProps<{
  width: typeof boughtItemColumnWidths;
}>();
</script>

<template>
  <TableHeadTitle name="Product" v-model:width="props.width.productNumber" />
</template>

<style scoped lang="scss"></style>
