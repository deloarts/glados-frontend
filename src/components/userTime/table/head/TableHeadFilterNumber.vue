<script setup lang="ts">
import TableHeadRowNumber from "@/components/dataTable/TableHeadRowNumber.vue";

import { userTimeColumnWidth } from "@/presets/columnWidth";

const props = defineProps<{
  width: typeof userTimeColumnWidth;
}>();
</script>

<template>
  <TableHeadRowNumber value="" :width="props.width.number" />
</template>

<style scoped lang="scss"></style>
