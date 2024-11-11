<script setup lang="ts">
import TableHeadTitle from "@/components/dataTable/TableHeadTitle.vue";

import { boughtItemColumnWidths } from "@/presets/boughtItemsColumnWidths";

const props = defineProps<{
  width: typeof boughtItemColumnWidths;
}>();
</script>

<template>
  <TableHeadTitle
    name="Storage Place"
    v-model:width="props.width.storagePlace"
  />
</template>

<style scoped lang="scss"></style>
