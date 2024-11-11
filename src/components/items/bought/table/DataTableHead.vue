<script setup lang="ts">
import { useBoughtItemsStore } from "@/stores/boughtItems";
import { useUnitsStore } from "@/stores/units";
import { useStatusStore } from "@/stores/status";
import { useBoughtItemsControlsStore } from "@/stores/controls";
import { useBoughtItemFilterStore } from "@/stores/filter";
import { useUsersStore } from "@/stores/user";

import { boughtItemColumnWidths } from "@/presets/boughtItemsColumnWidths";

import TableHeadRow from "@/components/dataTable/TableHeadRow.vue";

import TableHeadTitle from "@/components/dataTable/TableHeadTitle.vue";
import TableHeadRowNumber from "@/components/dataTable/TableHeadRowNumber.vue";
import TableHeadText from "@/components/dataTable/TableHeadText.vue";
import TableHeadFilterInput from "@/components/dataTable/TableHeadFilterInput.vue";
import TableHeadFilterSelect from "@/components/dataTable/TableHeadFilterSelect.vue";

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

const boughtItemsStore = useBoughtItemsStore();
const usersStore = useUsersStore();
const controlsStore = useBoughtItemsControlsStore();
const filterStore = useBoughtItemFilterStore();
const unitsStore = useUnitsStore();
const statusStore = useStatusStore();

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
      <TableHeadRowNumber value="" />
      <TableHeadFilterInput
        name="ID"
        :item-store="boughtItemsStore"
        :filter-store="filterStore"
        filter-store-key="id"
      />
      <TableHeadFilterSelect
        name="Status"
        :options="statusStore.boughtItemStatusOptionFilter"
        :item-store="boughtItemsStore"
        :filter-store="filterStore"
        filter-store-key="status"
      />
      <TableHeadFilterInput
        name="Project Number"
        :item-store="boughtItemsStore"
        :filter-store="filterStore"
        filter-store-key="projectNumber"
      />
      <TableHeadFilterInput
        name="Product Number"
        :item-store="boughtItemsStore"
        :filter-store="filterStore"
        filter-store-key="productNumber"
      />
      <TableHeadFilterInput
        name="Quantity"
        :item-store="boughtItemsStore"
        :filter-store="filterStore"
        filter-store-key="quantity"
      />
      <TableHeadFilterSelect
        name="Unit"
        :options="unitsStore.boughtItemUnitsOptionFilter"
        :item-store="boughtItemsStore"
        :filter-store="filterStore"
        filter-store-key="unit"
      />
      <TableHeadTitle name="Link" value="" />
      <TableHeadFilterInput
        name="Part Number"
        :item-store="boughtItemsStore"
        :filter-store="filterStore"
        filter-store-key="partnumber"
      />
      <TableHeadFilterInput
        name="Order Number"
        :item-store="boughtItemsStore"
        :filter-store="filterStore"
        filter-store-key="orderNumber"
      />
      <TableHeadFilterInput
        name="Manufacturer"
        :item-store="boughtItemsStore"
        :filter-store="filterStore"
        filter-store-key="manufacturer"
      />
      <TableHeadFilterInput
        name="Supplier"
        :item-store="boughtItemsStore"
        :filter-store="filterStore"
        filter-store-key="supplier"
      />
      <TableHeadFilterInput
        name="Group"
        :item-store="boughtItemsStore"
        :filter-store="filterStore"
        filter-store-key="group1"
      />
      <TableHeadFilterInput
        name="General Note"
        :item-store="boughtItemsStore"
        :filter-store="filterStore"
        filter-store-key="noteGeneral"
      />
      <TableHeadFilterInput
        name="Supplier Note"
        :item-store="boughtItemsStore"
        :filter-store="filterStore"
        filter-store-key="noteSupplier"
      />
      <TableHeadFilterInput
        name="Created Date"
        :item-store="boughtItemsStore"
        :filter-store="filterStore"
        filter-store-key="createdDate"
      />
      <TableHeadFilterSelect
        v-if="!controlsStore.state.unclutter"
        name="Creator"
        :options="usersStore.usersOptionsFilter"
        :item-store="boughtItemsStore"
        :filter-store="filterStore"
        filter-store-key="creatorId"
      />
      <TableHeadFilterInput
        name="Desired Date"
        :item-store="boughtItemsStore"
        :filter-store="filterStore"
        filter-store-key="desiredDate"
      />
      <TableHeadFilterInput
        name="Requested Date"
        :item-store="boughtItemsStore"
        :filter-store="filterStore"
        filter-store-key="requestedDate"
      />
      <TableHeadFilterSelect
        v-if="!controlsStore.state.unclutter"
        name="Requester"
        :options="usersStore.usersOptionsFilter"
        :item-store="boughtItemsStore"
        :filter-store="filterStore"
        filter-store-key="requesterId"
      />
      <TableHeadFilterInput
        name="Ordered Date"
        :item-store="boughtItemsStore"
        :filter-store="filterStore"
        filter-store-key="orderedDate"
      />
      <TableHeadFilterSelect
        v-if="!controlsStore.state.unclutter"
        name="Orderer"
        :options="usersStore.usersOptionsFilter"
        :item-store="boughtItemsStore"
        :filter-store="filterStore"
        filter-store-key="ordererId"
      />
      <TableHeadFilterInput
        name="Expected Date"
        :item-store="boughtItemsStore"
        :filter-store="filterStore"
        filter-store-key="expectedDate"
      />
      <TableHeadFilterInput
        name="Delivered Date"
        :item-store="boughtItemsStore"
        :filter-store="filterStore"
        filter-store-key="deliveredDate"
      />
      <TableHeadFilterSelect
        v-if="!controlsStore.state.unclutter"
        name="Receiver"
        :options="usersStore.usersOptionsFilter"
        :item-store="boughtItemsStore"
        :filter-store="filterStore"
        filter-store-key="receiverId"
      />
      <TableHeadText
        v-if="!controlsStore.state.unclutter"
        name="Arrival"
        value="(weeks)"
      />
      <TableHeadText
        v-if="!controlsStore.state.unclutter"
        name="Total"
        value="(weeks)"
      />
      <TableHeadFilterInput
        name="Storage Place"
        :item-store="boughtItemsStore"
        :filter-store="filterStore"
        filter-store-key="storagePlace"
      />
    </TableHeadRow>
  </thead>
</template>

<style lang="scss"></style>
