<script setup lang="ts">
import { computed } from "vue";

import { useBoughtItemsControlsStore } from "@/stores/controls";

import { boughtItemColumnWidths } from "@/presets/columnWidth";

import TableHeadRow from "@/components/dataTable/TableHeadRow.vue";
import TableHeadEmpty from "@/components/dataTable/TableHeadEmpty.vue";

import TableHeadTitleNumber from "./head/TableHeadTitleNumber.vue";
import TableHeadTitleState from "./head/TableHeadTitleState.vue";
import TableHeadTitleID from "./head/TableHeadTitleID.vue";
import TableHeadTitleStatus from "./head/TableHeadTitleStatus.vue";
import TableHeadTitleProjectNumber from "./head/TableHeadTitleProjectNumber.vue";
import TableHeadTitleProductNumber from "./head/TableHeadTitleProductNumber.vue";
import TableHeadTitleProjectCustomer from "./head/TableHeadTitleProjectCustomer.vue";
import TableHeadTitleProjectDescription from "./head/TableHeadTitleProjectDescription.vue";
import TableHeadTitleQuantity from "./head/TableHeadTitleQuantity.vue";
import TableHeadTitleUnit from "./head/TableHeadTitleUnit.vue";
import TableHeadTitleLink from "./head/TableHeadTitleLink.vue";
import TableHeadTitlePartNumber from "./head/TableHeadTitlePartNumber.vue";
import TableHeadTitleOrderNumber from "./head/TableHeadTitleOrderNumber.vue";
import TableHeadTitleManufacturer from "./head/TableHeadTitleManufacturer.vue";
import TableHeadTitleSupplier from "./head/TableHeadTitleSupplier.vue";
import TableHeadTitleGroup from "./head/TableHeadTitleGroup.vue";
import TableHeadTitleNoteGeneral from "./head/TableHeadTitleNoteGeneral.vue";
import TableHeadTitleNoteSupplier from "./head/TableHeadTitleNoteSupplier.vue";
import TableHeadTitleCreatedDate from "./head/TableHeadTitleCreatedDate.vue";
import TableHeadTitleCreatorID from "./head/TableHeadTitleCreatorID.vue";
import TableHeadTitleDesiredDate from "./head/TableHeadTitleDesiredDate.vue";
import TableHeadTitleRequestedDate from "./head/TableHeadTitleRequestedDate.vue";
import TableHeadTitleRequestorID from "./head/TableHeadTitleRequestorID.vue";
import TableHeadTitleOrderedDate from "./head/TableHeadTitleOrderedDate.vue";
import TableHeadTitleOrdererID from "./head/TableHeadTitleOrdererID.vue";
import TableHeadTitleExpectedDate from "./head/TableHeadTitleExpectedDate.vue";
import TableHeadTitleDeliveredDate from "./head/TableHeadTitleDeliveredDate.vue";
import TableHeadTitleReceiverID from "./head/TableHeadTitleReceiverID.vue";
import TableHeadTitleArrivalWeek from "./head/TableHeadTitleArrivalWeek.vue";
import TableHeadTitleTotalWeeks from "./head/TableHeadTitleTotalWeeks.vue";
import TableHeadTitleStoragePlace from "./head/TableHeadTitleStoragePlace.vue";

import TableHeadFilterNumber from "./head/TableHeadFilterNumber.vue";
import TableHeadFilterState from "./head/TableHeadFilterState.vue";
import TableHeadFilterID from "./head/TableHeadFilterID.vue";
import TableHeadFilterStatus from "./head/TableHeadFilterStatus.vue";
import TableHeadFilterProjectNumber from "./head/TableHeadFilterProjectNumber.vue";
import TableHeadFilterProductNumber from "./head/TableHeadFilterProductNumber.vue";
import TableHeadFilterProjectCustomer from "./head/TableHeadFilterProjectCustomer.vue";
import TableHeadFilterProjectDescription from "./head/TableHeadFilterProjectDescription.vue";
import TableHeadFilterQuantity from "./head/TableHeadFilterQuantity.vue";
import TableHeadFilterUnit from "./head/TableHeadFilterUnit.vue";
import TableHeadFilterLink from "./head/TableHeadFilterLink.vue";
import TableHeadFilterPartNumber from "./head/TableHeadFilterPartNumber.vue";
import TableHeadFilterOrderNumber from "./head/TableHeadFilterOrderNumber.vue";
import TableHeadFilterManufacturer from "./head/TableHeadFilterManufacturer.vue";
import TableHeadFilterSupplier from "./head/TableHeadFilterSupplier.vue";
import TableHeadFilterGroup from "./head/TableHeadFilterGroup.vue";
import TableHeadFilterNoteGeneral from "./head/TableHeadFilterNoteGeneral.vue";
import TableHeadFilterNoteSupplier from "./head/TableHeadFilterNoteSupplier.vue";
import TableHeadFilterCreatedDate from "./head/TableHeadFilterCreatedDate.vue";
import TableHeadFilterCreatorID from "./head/TableHeadFilterCreatorID.vue";
import TableHeadFilterDesiredDate from "./head/TableHeadFilterDesiredDate.vue";
import TableHeadFilterRequestedDate from "./head/TableHeadFilterRequestedDate.vue";
import TableHeadFilterRequesterID from "./head/TableHeadFilterRequesterID.vue";
import TableHeadFilterOrderedDate from "./head/TableHeadFilterOrderedDate.vue";
import TableHeadFilterOrdererID from "./head/TableHeadFilterOrdererID.vue";
import TableHeadFilterExpectedDate from "./head/TableHeadFilterExpectedDate.vue";
import TableHeadFilterDeliveredDate from "./head/TableHeadFilterDeliveredDate.vue";
import TableHeadFilterReceiverID from "./head/TableHeadFilterReceiverID.vue";
import TableHeadFilterArrivalWeeks from "./head/TableHeadFilterArrivalWeeks.vue";
import TableHeadFilterTotalWeeks from "./head/TableHeadFilterTotalWeeks.vue";
import TableHeadFilterStoragePlace from "./head/TableHeadFilterStoragePlace.vue";

const controlsStore = useBoughtItemsControlsStore();

const props = defineProps<{
  colW: typeof boughtItemColumnWidths;
}>();
const emit = defineEmits<{
  (e: "update:colW", v: typeof boughtItemColumnWidths): void;
}>();

const computedColW = computed<typeof boughtItemColumnWidths>({
  get() {
    return props.colW;
  },
  set(newValue) {
    emit("update:colW", newValue);
    return newValue;
  },
});
</script>

<template>
  <thead>
    <TableHeadRow
      v-bind:class="{
        'text-mode': controlsStore.state.textView,
      }"
    >
      <TableHeadTitleNumber v-model:width="computedColW" />
      <TableHeadTitleID v-model:width="computedColW" />
      <TableHeadTitleState v-model:width="computedColW" />
      <TableHeadTitleStatus v-model:width="computedColW" />
      <TableHeadTitleProjectNumber v-model:width="computedColW" />
      <TableHeadTitleProductNumber v-model:width="computedColW" />
      <TableHeadTitleProjectCustomer v-model:width="computedColW" />
      <TableHeadTitleProjectDescription v-model:width="computedColW" />
      <TableHeadTitleQuantity v-model:width="computedColW" />
      <TableHeadTitleUnit v-model:width="computedColW" />
      <TableHeadTitleLink v-model:width="computedColW" />
      <TableHeadTitlePartNumber v-model:width="computedColW" />
      <TableHeadTitleOrderNumber v-model:width="computedColW" />
      <TableHeadTitleManufacturer v-model:width="computedColW" />
      <TableHeadTitleSupplier v-model:width="computedColW" />
      <TableHeadTitleGroup v-model:width="computedColW" />
      <TableHeadTitleNoteGeneral v-model:width="computedColW" />
      <TableHeadTitleNoteSupplier v-model:width="computedColW" />
      <TableHeadTitleCreatedDate v-model:width="computedColW" />
      <TableHeadTitleCreatorID v-model:width="computedColW" />
      <TableHeadTitleDesiredDate v-model:width="computedColW" />
      <TableHeadTitleRequestedDate v-model:width="computedColW" />
      <TableHeadTitleRequestorID v-model:width="computedColW" />
      <TableHeadTitleOrderedDate v-model:width="computedColW" />
      <TableHeadTitleOrdererID v-model:width="computedColW" />
      <TableHeadTitleExpectedDate v-model:width="computedColW" />
      <TableHeadTitleDeliveredDate v-model:width="computedColW" />
      <TableHeadTitleReceiverID v-model:width="computedColW" />
      <TableHeadTitleArrivalWeek v-model:width="computedColW" />
      <TableHeadTitleTotalWeeks v-model:width="computedColW" />
      <TableHeadTitleStoragePlace v-model:width="computedColW" />
      <TableHeadEmpty />
    </TableHeadRow>
    <TableHeadRow v-if="!controlsStore.state.textView">
      <TableHeadFilterNumber v-model:width="computedColW" />
      <TableHeadFilterID v-model:width="computedColW" />
      <TableHeadFilterState v-model:width="computedColW" />
      <TableHeadFilterStatus v-model:width="computedColW" />
      <TableHeadFilterProjectNumber v-model:width="computedColW" />
      <TableHeadFilterProductNumber v-model:width="computedColW" />
      <TableHeadFilterProjectCustomer v-model:width="computedColW" />
      <TableHeadFilterProjectDescription v-model:width="computedColW" />
      <TableHeadFilterQuantity v-model:width="computedColW" />
      <TableHeadFilterUnit v-model:width="computedColW" />
      <TableHeadFilterLink v-model:width="computedColW" />
      <TableHeadFilterPartNumber v-model:width="computedColW" />
      <TableHeadFilterOrderNumber v-model:width="computedColW" />
      <TableHeadFilterManufacturer v-model:width="computedColW" />
      <TableHeadFilterSupplier v-model:width="computedColW" />
      <TableHeadFilterGroup v-model:width="computedColW" />
      <TableHeadFilterNoteGeneral v-model:width="computedColW" />
      <TableHeadFilterNoteSupplier v-model:width="computedColW" />
      <TableHeadFilterCreatedDate v-model:width="computedColW" />
      <TableHeadFilterCreatorID v-model:width="computedColW" />
      <TableHeadFilterDesiredDate v-model:width="computedColW" />
      <TableHeadFilterRequestedDate v-model:width="computedColW" />
      <TableHeadFilterRequesterID v-model:width="computedColW" />
      <TableHeadFilterOrderedDate v-model:width="computedColW" />
      <TableHeadFilterOrdererID v-model:width="computedColW" />
      <TableHeadFilterExpectedDate v-model:width="computedColW" />
      <TableHeadFilterDeliveredDate v-model:width="computedColW" />
      <TableHeadFilterReceiverID v-model:width="computedColW" />
      <TableHeadFilterArrivalWeeks v-model:width="computedColW" />
      <TableHeadFilterTotalWeeks v-model:width="computedColW" />
      <TableHeadFilterStoragePlace v-model:width="computedColW" />
      <TableHeadEmpty />
    </TableHeadRow>
  </thead>
</template>

<style lang="scss">
tr.text-mode > th {
  background: lightgray !important;
  color: black !important;

  border-bottom: solid thin black;
  border-right: solid thin black;

  cursor: text !important;
  user-select: text !important;
}
tr.text-mode:hover > th {
  background: lightgrey !important;
  color: black !important;
}
</style>
