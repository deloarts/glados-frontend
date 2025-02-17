<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment'

import type { UserTimeSchema } from '@/schemas/userTime'

import TableItemText from '@/components/dataTable/TableItemText.vue'

import { userTimeColumnWidth } from '@/presets/columnWidth'

const props = defineProps<{
  item: UserTimeSchema
  width: typeof userTimeColumnWidth
}>()

const computedTime = computed<string | null>(() => {
  if (props.item.logout) {
    const loginTime = moment.utc(props.item.login).local()
    const logoutTime = moment.utc(props.item.logout).local()
    if (logoutTime.date() > loginTime.date()) {
      return '23:59'
    }
    return logoutTime.format('HH:mm')
  }
  return null
})
</script>

<template>
  <TableItemText
    name="Logout"
    :value="computedTime"
    :width="props.width.logout"
    :fixed-height="true"
    :center="true"
  />
</template>

<style scoped lang="scss"></style>
