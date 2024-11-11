<script setup lang="ts">
import TableHeadTitle from "@/components/dataTable/TableHeadTitle.vue";

import { boughtItemColumnWidths } from "@/presets/boughtItemsColumnWidths";

const props = defineProps<{
  width: typeof boughtItemColumnWidths;
}>();
</script>

<template>
  <TableHeadTitle name="Part Number" v-model:width="props.width.partnumber" />
</template>

<style scoped lang="scss"></style>
