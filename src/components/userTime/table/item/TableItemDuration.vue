<script setup lang="ts">
import { computed } from 'vue';
import moment from 'moment';

import type { UserTimeSchema } from "@/schemas/userTime";

import TableItemText from "@/components/dataTable/TableItemText.vue";

import { userTimeColumnWidth } from "@/presets/columnWidth";

const props = defineProps<{
  item: UserTimeSchema;
  width: typeof userTimeColumnWidth;
}>();

const duration = computed<string>(() => {
  let m: moment.Duration
  if (props.item.duration_minutes) {
    m = moment.duration(props.item.duration_minutes, 'minutes');
  } else {
    m = moment.duration(moment().diff(moment.utc(props.item.login)))
  }
  return `${String(m.hours()).padStart(2, '0')}:${String(Math.abs(m.minutes())).padStart(2, '0')}`
})
</script>

<template>
  <TableItemText
    name="Duration"
    :value="duration"
    :width="props.width.duration"
    :fixed-height="true"
    :center="true"
  />
</template>

<style scoped lang="scss"></style>
