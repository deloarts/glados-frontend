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
    name="Logout"
    :value="item.logout ? moment.utc(item.logout).local().format('HH:mm'): null"
    :width="props.width.logout"
    :fixed-height="true"
    :center="true"
  />
</template>

<style scoped lang="scss"></style>
