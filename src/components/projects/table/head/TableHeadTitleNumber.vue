<script setup lang="ts">
import TableHeadRowNumber from "@/components/dataTable/TableHeadRowNumber.vue";

import { projectsColumnWidths } from "@/presets/columnWidth";

const props = defineProps<{
  width: typeof projectsColumnWidths;
}>();
</script>

<template>
  <TableHeadRowNumber value="#" v-model:width="props.width.number" />
</template>

<style scoped lang="scss"></style>
