<script setup lang="ts">
import type { UserTimeSchema } from "@/schemas/userTime";

import TableItemRowNumber from "@/components/dataTable/TableItemRowNumber.vue";

import { userTimeColumnWidth } from "@/presets/columnWidth";

const props = defineProps<{
  index: number;
  item: UserTimeSchema;
  width: typeof userTimeColumnWidth;
}>();
</script>

<template>
  <TableItemRowNumber
    :number="index + 1"
    :id="item.id"
    :width="props.width.number"
    :fixed-height="true"
  />
</template>

<style scoped lang="scss"></style>
