<script setup lang="ts">
import TableHeadText from "@/components/dataTable/TableHeadText.vue";

import { userTimeColumnWidth } from "@/presets/columnWidth";

const props = defineProps<{
  width: typeof userTimeColumnWidth;
}>();
</script>

<template>
  <TableHeadText
    name=""
    :width="props.width.login"
  />
</template>

<style scoped lang="scss"></style>
