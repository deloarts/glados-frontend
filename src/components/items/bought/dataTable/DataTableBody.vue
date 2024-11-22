<script setup lang="ts">
import { ref, computed } from "vue";

import { useBoughtItemsStore } from "@/stores/boughtItems";

import { getSelection } from "@/helper/selection.helper";

import { boughtItemColumnWidths } from "@/presets/columnWidth";

import TableItemEmpty from "@/components/dataTable/TableItemEmpty.vue";

import DataTableBodyRow from "./DataTableBodyRow.vue";
import TableItemNumber from "./item/TableItemNumber.vue";
import TableItemState from "./item/TableItemState.vue";
import TableItemID from "./item/TableItemID.vue";
import TableItemStatus from "./item/TableItemStatus.vue";
import TableItemProjectNumber from "./item/TableItemProjectNumber.vue";
import TableItemProductNumber from "./item/TableItemProductNumber.vue";
import TableItemProjectCustomer from "./item/TableItemProjectCustomer.vue";
import TableItemProjectDescription from "./item/TableItemProjectDescription.vue";
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
      <TableItemNumber
        :index="index"
        :item="item"
        v-model:width="computedColW"
      />
      <TableItemID :item="item" v-model:width="computedColW" />
      <TableItemState :item="item" v-model:width="computedColW" />
      <TableItemStatus :item="item" v-model:width="computedColW" />
      <TableItemProjectNumber :item="item" v-model:width="computedColW" />
      <TableItemProductNumber :item="item" v-model:width="computedColW" />
      <TableItemProjectCustomer :item="item" v-model:width="computedColW" />
      <TableItemProjectDescription :item="item" v-model:width="computedColW" />
      <TableItemQuantity :item="item" v-model:width="computedColW" />
      <TableItemUnit :item="item" v-model:width="computedColW" />
      <TableItemWeblink :item="item" v-model:width="computedColW" />
      <TableItemPartNumber :item="item" v-model:width="computedColW" />
      <TableItemOrderNumber :item="item" v-model:width="computedColW" />
      <TableItemManufacturer :item="item" v-model:width="computedColW" />
      <TableItemSupplier :item="item" v-model:width="computedColW" />
      <TableItemGroup :item="item" v-model:width="computedColW" />
      <TableItemNoteGeneral :item="item" v-model:width="computedColW" />
      <TableItemNoteSupplier :item="item" v-model:width="computedColW" />
      <TableItemCreatedDate :item="item" v-model:width="computedColW" />
      <TableItemCreatorName :item="item" v-model:width="computedColW" />
      <TableItemDesiredDate :item="item" v-model:width="computedColW" />
      <TableItemRequestedDate :item="item" v-model:width="computedColW" />
      <TableItemRequesterID :item="item" v-model:width="computedColW" />
      <TableItemOrderedDate :item="item" v-model:width="computedColW" />
      <TableItemOrdererID :item="item" v-model:width="computedColW" />
      <TableItemExpectedDate :item="item" v-model:width="computedColW" />
      <TableItemDeliveredDate :item="item" v-model:width="computedColW" />
      <TableItemReceiverID :item="item" v-model:width="computedColW" />
      <TableItemArrivalWeeks :item="item" v-model:width="computedColW" />
      <TableItemTotalWeeks :item="item" v-model:width="computedColW" />
      <TableItemStoragePlace :item="item" v-model:width="computedColW" />
      <TableItemEmpty />
    </DataTableBodyRow>
  </tbody>
</template>

<style lang="scss"></style>
