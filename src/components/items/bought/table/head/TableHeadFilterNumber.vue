<script setup lang="ts">
import TableHeadRowNumber from "@/components/dataTable/TableHeadRowNumber.vue";

import { boughtItemColumnWidths } from "@/presets/columnWidth";

const props = defineProps<{
  width: typeof boughtItemColumnWidths;
}>();
</script>

<template>
  <TableHeadRowNumber value="" v-model:width="props.width.number" />
</template>

<style scoped lang="scss"></style>
