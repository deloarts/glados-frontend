<script setup lang="ts">
import moment from 'moment'

import type { UserTimeSchema } from "@/schemas/userTime";

import TableItemText from "@/components/dataTable/TableItemText.vue";

import { userTimeColumnWidth } from "@/presets/columnWidth";

const props = defineProps<{
  item: UserTimeSchema;
  width: typeof userTimeColumnWidth;
}>();
</script>

<template>
  <TableItemText
    name="Date"
    :value="moment.utc(item.login).local().format('DD.MM.YYYY')"
    :width="props.width.date"
    :fixed-height="true"
    :center="true"
  />
</template>

<style scoped lang="scss"></style>
