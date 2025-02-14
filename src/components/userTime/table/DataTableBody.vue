<script setup lang="ts">
import { ref, computed } from 'vue'

import { useUserTimeStore } from "@/stores/userTime";

import { getSelection } from '@/helper/selection.helper'

import { userTimeColumnWidth } from "@/presets/columnWidth";

import DataTableBodyRow from '@/components/dataTable/DataTableBodyRow.vue';
import TableItemEmpty from '@/components/dataTable/TableItemEmpty.vue';

import TableItemNumber from './item/TableItemNumber.vue';
// import TableItemID from './item/TableItemID.vue;'
import TableItemWeek from './item/TableItemWeek.vue';
import TableItemDay from './item/TableItemDay.vue';
import TableItemDate from './item/TableItemDate.vue';
import TableItemLogin from './item/TableItemLogin.vue';
import TableItemLogout from './item/TableItemLogout.vue';
import TableItemDuration from './item/TableItemDuration.vue';
import TableItemNote from './item/TableItemNote.vue';

const userTimeStore = useUserTimeStore();

const props = defineProps<{
  colW: typeof userTimeColumnWidth
}>()
const emit = defineEmits<{
  (e: 'update:colW', v: typeof userTimeColumnWidth): void
}>()

const computedColW = computed<typeof userTimeColumnWidth>({
  get() {
    return props.colW
  },
  set(newValue) {
    emit('update:colW', newValue)
    return newValue
  },
})

// Selection
const lineIndex = ref<number>(0)
function multiSelect(event: Event, id: number, index: number) {
  lineIndex.value = getSelection(event, id, index, lineIndex.value, userTimeStore)
}
</script>

<template>
  <tbody>
    <DataTableBodyRow
      v-for="(item, index) in userTimeStore.items"
      :key="item.id"
      :selected="userTimeStore.getSelection().includes(item.id)"
      v-on:click="multiSelect($event, item.id, index)"
    >
      <TableItemNumber
        :index="index + (userTimeStore.page.current - 1) * userTimeStore.page.limit"
        :item="item"
        v-model:width="computedColW"
      />
      <!-- <TableItemID :item="item" v-model:width="computedColW" /> -->
      <TableItemWeek :item="item" v-model:width="computedColW" />
      <TableItemDay :item="item" v-model:width="computedColW" />
      <TableItemDate :item="item" v-model:width="computedColW" />
      <TableItemLogin :item="item" v-model:width="computedColW" />
      <TableItemLogout :item="item" v-model:width="computedColW" />
      <TableItemDuration :item="item" v-model:width="computedColW" />
      <TableItemNote :item="item" v-model:width="computedColW" />
      <TableItemEmpty />
    </DataTableBodyRow>
  </tbody>
</template>

<style lang="scss"></style>
