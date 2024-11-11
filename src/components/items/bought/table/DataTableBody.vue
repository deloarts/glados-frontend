<script setup lang="ts">
import { ref } from "vue";

import { useBoughtItemsStore } from "@/stores/boughtItems";

import { getSelection } from "@/helper/selection.helper";

import { boughtItemColumnWidths } from "@/presets/boughtItemsColumnWidths";

import DataTableBodyRow from "./DataTableBodyRow.vue";

import TableItemNumber from "./item/TableItemNumber.vue";
import TableItemID from "./item/TableItemID.vue";
import TableItemStatus from "./item/TableItemStatus.vue";
import TableItemProjectNumber from "./item/TableItemProjectNumber.vue";
import TableItemProductNumber from "./item/TableItemProductNumber.vue";
import TableItemQuantity from "./item/TableItemQuantity.vue";
import TableItemUnit from "./item/TableItemUnit.vue";
import TableItemWeblink from "./item/TableItemWeblink.vue";
import TableItemPartNumber from "./item/TableItemPartNumber.vue";
import TableItemOrderNumber from "./item/TableItemOrderNumber.vue";
import TableItemManufacturer from "./item/TableItemManufacturer.vue";
import TableItemSupplier from "./item/TableItemSupplier.vue";
import TableItemGroup from "./item/TableItemGroup.vue";
import TableItemNoteGeneral from "./item/TableItemNoteGeneral.vue";
import TableItemNoteSupplier from "./item/TableItemNoteSupplier.vue";
import TableItemCreatedDate from "./item/TableItemCreatedDate.vue";
import TableItemCreatorName from "./item/TableItemCreatorName.vue";
import TableItemDesiredDate from "./item/TableItemDesiredDate.vue";
import TableItemRequestedDate from "./item/TableItemRequestedDate.vue";
import TableItemRequesterID from "./item/TableItemRequesterID.vue";
import TableItemOrderedDate from "./item/TableItemOrderedDate.vue";
import TableItemOrdererID from "./item/TableItemOrdererID.vue";
import TableItemExpectedDate from "./item/TableItemExpectedDate.vue";
import TableItemDeliveredDate from "./item/TableItemDeliveredDate.vue";
import TableItemReceiverID from "./item/TableItemReceiverID.vue";
import TableItemArrivalWeeks from "./item/TableItemArrivalWeeks.vue";
import TableItemTotalWeeks from "./item/TableItemTotalWeeks.vue";
import TableItemStoragePlace from "./item/TableItemStoragePlace.vue";

const boughtItemsStore = useBoughtItemsStore();

const props = defineProps<{
  colW: typeof boughtItemColumnWidths;
}>();

// Selection
const lineIndex = ref<number>(0);
function multiSelect(event: Event, id: number, index: number) {
  lineIndex.value = getSelection(
    event,
    id,
    index,
    lineIndex.value,
    boughtItemsStore,
  );
}
</script>

<template>
  <tbody>
    <DataTableBodyRow
      v-for="(item, index) in boughtItemsStore.items"
      :key="item.id"
      :selected="boughtItemsStore.getSelection().includes(item.id)"
      :status="item.status"
      v-on:click="multiSelect($event, item.id, index)"
    >
      <TableItemNumber :index="index" :item="item" v-model:width="props.colW" />
      <TableItemID :item="item" v-model:width="props.colW" />
      <TableItemStatus :item="item" v-model:width="props.colW" />
      <TableItemProjectNumber :item="item" v-model:width="props.colW" />
      <TableItemProductNumber :item="item" v-model:width="props.colW" />
      <TableItemQuantity :item="item" v-model:width="props.colW" />
      <TableItemUnit :item="item" v-model:width="props.colW" />
      <TableItemWeblink :item="item" v-model:width="props.colW" />
      <TableItemPartNumber :item="item" v-model:width="props.colW" />
      <TableItemOrderNumber :item="item" v-model:width="props.colW" />
      <TableItemManufacturer :item="item" v-model:width="props.colW" />
      <TableItemSupplier :item="item" v-model:width="props.colW" />
      <TableItemGroup :item="item" v-model:width="props.colW" />
      <TableItemNoteGeneral :item="item" v-model:width="props.colW" />
      <TableItemNoteSupplier :item="item" v-model:width="props.colW" />
      <TableItemCreatedDate :item="item" v-model:width="props.colW" />
      <TableItemCreatorName :item="item" v-model:width="props.colW" />
      <TableItemDesiredDate :item="item" v-model:width="props.colW" />
      <TableItemRequestedDate :item="item" v-model:width="props.colW" />
      <TableItemRequesterID :item="item" v-model:width="props.colW" />
      <TableItemOrderedDate :item="item" v-model:width="props.colW" />
      <TableItemOrdererID :item="item" v-model:width="props.colW" />
      <TableItemExpectedDate :item="item" v-model:width="props.colW" />
      <TableItemDeliveredDate :item="item" v-model:width="props.colW" />
      <TableItemReceiverID :item="item" v-model:width="props.colW" />
      <TableItemArrivalWeeks :item="item" v-model:width="props.colW" />
      <TableItemTotalWeeks :item="item" v-model:width="props.colW" />
      <TableItemStoragePlace :item="item" v-model:width="props.colW" />
    </DataTableBodyRow>
  </tbody>
</template>

<style lang="scss"></style>
