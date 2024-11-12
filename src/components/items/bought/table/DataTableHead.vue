<script setup lang="ts">
import { boughtItemColumnWidths } from "@/presets/boughtItemsColumnWidths";

import TableHeadRow from "@/components/dataTable/TableHeadRow.vue";

import TableHeadTitleNumber from "./head/TableHeadTitleNumber.vue";
import TableHeadTitleID from "./head/TableHeadTitleID.vue";
import TableHeadTitleStatus from "./head/TableHeadTitleStatus.vue";
import TableHeadTitleProjectNumber from "./head/TableHeadTitleProjectNumber.vue";
import TableHeadTitleProductNumber from "./head/TableHeadTitleProductNumber.vue";
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
import TableHeadFilterID from "./head/TableHeadFilterID.vue";
import TableHeadFilterStatus from "./head/TableHeadFilterStatus.vue";
import TableHeadFilterProjectNumber from "./head/TableHeadFilterProjectNumber.vue";
import TableHeadFilterProductNumber from "./head/TableHeadFilterProductNumber.vue";
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

const props = defineProps<{
  colW: typeof boughtItemColumnWidths;
}>();
</script>

<template>
  <thead>
    <TableHeadRow>
      <TableHeadTitleNumber v-model:width="props.colW" />
      <TableHeadTitleID v-model:width="props.colW" />
      <TableHeadTitleStatus v-model:width="props.colW" />
      <TableHeadTitleProjectNumber v-model:width="props.colW" />
      <TableHeadTitleProductNumber v-model:width="props.colW" />
      <TableHeadTitleQuantity v-model:width="props.colW" />
      <TableHeadTitleUnit v-model:width="props.colW" />
      <TableHeadTitleLink v-model:width="props.colW" />
      <TableHeadTitlePartNumber v-model:width="props.colW" />
      <TableHeadTitleOrderNumber v-model:width="props.colW" />
      <TableHeadTitleManufacturer v-model:width="props.colW" />
      <TableHeadTitleSupplier v-model:width="props.colW" />
      <TableHeadTitleGroup v-model:width="props.colW" />
      <TableHeadTitleNoteGeneral v-model:width="props.colW" />
      <TableHeadTitleNoteSupplier v-model:width="props.colW" />
      <TableHeadTitleCreatedDate v-model:width="props.colW" />
      <TableHeadTitleCreatorID v-model:width="props.colW" />
      <TableHeadTitleDesiredDate v-model:width="props.colW" />
      <TableHeadTitleRequestedDate v-model:width="props.colW" />
      <TableHeadTitleRequestorID v-model:width="props.colW" />
      <TableHeadTitleOrderedDate v-model:width="props.colW" />
      <TableHeadTitleOrdererID v-model:width="props.colW" />
      <TableHeadTitleExpectedDate v-model:width="props.colW" />
      <TableHeadTitleDeliveredDate v-model:width="props.colW" />
      <TableHeadTitleReceiverID v-model:width="props.colW" />
      <TableHeadTitleArrivalWeek v-model:width="props.colW" />
      <TableHeadTitleTotalWeeks v-model:width="props.colW" />
      <TableHeadTitleStoragePlace v-model:width="props.colW" />
    </TableHeadRow>
    <TableHeadRow>
      <TableHeadFilterNumber v-model:width="props.colW" />
      <TableHeadFilterID v-model:width="props.colW" />
      <TableHeadFilterStatus v-model:width="props.colW" />
      <TableHeadFilterProjectNumber v-model:width="props.colW" />
      <TableHeadFilterProductNumber v-model:width="props.colW" />
      <TableHeadFilterQuantity v-model:width="props.colW" />
      <TableHeadFilterUnit v-model:width="props.colW" />
      <TableHeadFilterLink v-model:width="props.colW" />
      <TableHeadFilterPartNumber v-model:width="props.colW" />
      <TableHeadFilterOrderNumber v-model:width="props.colW" />
      <TableHeadFilterManufacturer v-model:width="props.colW" />
      <TableHeadFilterSupplier v-model:width="props.colW" />
      <TableHeadFilterGroup v-model:width="props.colW" />
      <TableHeadFilterNoteGeneral v-model:width="props.colW" />
      <TableHeadFilterNoteSupplier v-model:width="props.colW" />
      <TableHeadFilterCreatedDate v-model:width="props.colW" />
      <TableHeadFilterCreatorID v-model:width="props.colW" />
      <TableHeadFilterDesiredDate v-model:width="props.colW" />
      <TableHeadFilterRequestedDate v-model:width="props.colW" />
      <TableHeadFilterRequesterID v-model:width="props.colW" />
      <TableHeadFilterOrderedDate v-model:width="props.colW" />
      <TableHeadFilterOrdererID v-model:width="props.colW" />
      <TableHeadFilterExpectedDate v-model:width="props.colW" />
      <TableHeadFilterDeliveredDate v-model:width="props.colW" />
      <TableHeadFilterReceiverID v-model:width="props.colW" />
      <TableHeadFilterArrivalWeeks v-model:width="props.colW" />
      <TableHeadFilterTotalWeeks v-model:width="props.colW" />
      <TableHeadFilterStoragePlace v-model:width="props.colW" />
    </TableHeadRow>
  </thead>
</template>

<style lang="scss"></style>
