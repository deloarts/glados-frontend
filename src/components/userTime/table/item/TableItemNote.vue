<script setup lang="ts">
import type { UserTimeSchema } from '@/schemas/userTime'

import TableItemInput from '@/components/dataTable/TableItemInput.vue'

import { userTimeColumnWidth } from '@/presets/columnWidth'

import { userTimeRequest } from '@/requests/api/userTime'

import { useUserTimeStore } from '@/stores/userTime'

const userTimeStore = useUserTimeStore()

const props = defineProps<{
  item: UserTimeSchema
  width: typeof userTimeColumnWidth
}>()
</script>

<template>
  <TableItemInput
    name="Note"
    :value="props.item.note"
    :update-method="userTimeRequest.putUserTimeNote"
    :item-store="userTimeStore"
    :width="props.width.note"
    :fixed-height="true"
    :edit-mode="userTimeStore.getSelection().includes(props.item.id)"
    :force-edit-mode="true"
  />
</template>

<style scoped lang="scss"></style>
