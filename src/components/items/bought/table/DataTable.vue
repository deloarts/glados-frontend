<script setup lang="ts">
import { ref, onBeforeMount, onUnmounted } from "vue";

import { useBoughtItemsStore } from "@/stores/boughtItems";
import { useUnitsStore } from "@/stores/units";
import { useStatusStore } from "@/stores/status";
import { useBoughtItemsControlsStore } from "@/stores/controls";
import { useBoughtItemFilterStore } from "@/stores/filter";
import { useUsersStore } from "@/stores/user";

import { boughtItemsRequest } from "@/requests/items";

import { getSelection } from "@/helper/selection.helper";
import {
  calcDiffInWeeks,
  calcDiffInWeeksFromToday,
} from "@/helper/date.helper";

import Spinner from "@/components/spinner/LoadingSpinner.vue";

import { boughtItemColumnWidths } from "@/presets/boughtItemsColumnWidths";

import TableHeadRowNumber from "@/components/dataTable/TableHeadRowNumber.vue";
import TableRowHead from "@/components/dataTable/TableRowHead.vue";
import TableHeadTitle from "@/components/dataTable/TableHeadTitle.vue";
import TableHeadText from "@/components/dataTable/TableHeadText.vue";
import TableHeadFilterInput from "@/components/dataTable/TableHeadFilterInput.vue";
import TableHeadFilterSelect from "@/components/dataTable/TableHeadFilterSelect.vue";

import TableRowItems from "./TableRowItems.vue";
import TableItemRowNumber from "./TableItemRowNumber.vue";
import TableItemInput from "./TableItemInput.vue";
import TableItemTextarea from "./TableItemTextarea.vue";
import TableItemSelect from "./TableItemSelect.vue";
import TableItemText from "./TableItemText.vue";
import TableItemLink from "./TableItemLink.vue";
import TableItemDate from "./TableItemDate.vue";

// Store
const boughtItemsStore = useBoughtItemsStore();
const usersStore = useUsersStore();
const controlsStore = useBoughtItemsControlsStore();
const filterStore = useBoughtItemFilterStore();
const unitsStore = useUnitsStore();
const statusStore = useStatusStore();

// ColumnWidths
const colW = ref(boughtItemColumnWidths);

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

function eventKeyUp(event: any) {
  if (event.key === "Escape") {
    boughtItemsStore.clearSelection();
  }
}

onBeforeMount(() => {
  document.addEventListener("keyup", eventKeyUp);
});

onUnmounted(() => {
  document.removeEventListener("keyup", eventKeyUp);
});
</script>

<template>
  <div class="scope">
    <Spinner
      class="spinner"
      v-if="boughtItemsStore.loading && boughtItemsStore.items.length == 0"
    />
    <div class="wrapper">
      <table>
        <thead>
          <TableRowHead>
            <TableHeadRowNumber value="#" v-model:width="colW.number" />
            <TableHeadTitle name="ID" v-model:width="colW.id" />
            <TableHeadTitle name="Status" v-model:width="colW.status" />
            <TableHeadTitle name="Project" v-model:width="colW.projectNumber" />
            <TableHeadTitle name="Product" v-model:width="colW.productNumber" />
            <TableHeadTitle name="QTY" v-model:width="colW.quantity" />
            <TableHeadTitle name="Unit" v-model:width="colW.unit" />
            <TableHeadTitle name="Link" v-model:width="colW.weblink" />
            <TableHeadTitle
              name="Part Number"
              v-model:width="colW.partnumber"
            />
            <TableHeadTitle
              name="Order Number"
              v-model:width="colW.orderNumber"
            />
            <TableHeadTitle
              name="Manufacturer"
              v-model:width="colW.manufacturer"
            />
            <TableHeadTitle name="Supplier" v-model:width="colW.supplier" />
            <TableHeadTitle name="Group" v-model:width="colW.group1" />
            <TableHeadTitle name="Note" v-model:width="colW.noteGeneral" />
            <TableHeadTitle
              name="Supplier Note"
              v-model:width="colW.noteSupplier"
            />
            <TableHeadTitle name="Created" v-model:width="colW.createdDate" />
            <TableHeadTitle
              name="Creator"
              v-if="!controlsStore.state.unclutter"
              v-model:width="colW.creatorId"
            />
            <TableHeadTitle name="Desired" v-model:width="colW.desiredDate" />
            <TableHeadTitle
              name="Requested"
              v-model:width="colW.requestedDate"
            />
            <TableHeadTitle
              name="Requester"
              v-if="!controlsStore.state.unclutter"
              v-model:width="colW.requesterId"
            />
            <TableHeadTitle name="Ordered" v-model:width="colW.orderedDate" />
            <TableHeadTitle
              name="Orderer"
              v-model:width="colW.ordererId"
              v-if="!controlsStore.state.unclutter"
            />
            <TableHeadTitle name="Expected" v-model:width="colW.expectedDate" />
            <TableHeadTitle
              name="Delivered"
              v-model:width="colW.deliveredDate"
            />
            <TableHeadTitle
              name="Receiver"
              v-if="!controlsStore.state.unclutter"
              v-model:width="colW.receiverId"
            />
            <TableHeadTitle
              name="Arrival"
              v-if="!controlsStore.state.unclutter"
              v-model:width="colW.arrivalWeeks"
            />
            <TableHeadTitle
              name="Total"
              v-if="!controlsStore.state.unclutter"
              v-model:width="colW.totalWeeks"
            />
            <TableHeadTitle name="Storage" v-model:width="colW.storagePlace" />
          </TableRowHead>
          <TableRowHead v-if="controlsStore.state.textOnly == false">
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
          </TableRowHead>
        </thead>
        <tbody>
          <TableRowItems
            v-for="(item, index) in boughtItemsStore.items"
            :key="item.id"
            :selected="boughtItemsStore.getSelection().includes(item.id)"
            :status="item.status"
            v-on:click="multiSelect($event, item.id, index)"
          >
            <TableItemRowNumber
              :number="index + 1"
              :locked-icon="!item.project_is_active"
              :bell-icon="item.high_priority"
              v-model:width="colW.number"
            />
            <TableItemText
              name="ID"
              filter-store-key="id"
              :value="item.id"
              :center="true"
              v-model:width="colW.id"
            />
            <TableItemSelect
              name="Status"
              filter-store-key="status"
              :value="item.status"
              :options="statusStore.boughtItemStatusOption"
              :update-method="boughtItemsRequest.putItemsStatus"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
              v-model:width="colW.status"
            />
            <TableItemInput
              name="Project Number"
              filter-store-key="projectNumber"
              :value="item.project_number"
              :update-method="boughtItemsRequest.putItemsProject"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
              v-model:width="colW.projectNumber"
            />
            <TableItemText
              name="Product Number"
              filter-store-key="productNumber"
              :value="item.product_number"
              v-model:width="colW.productNumber"
            />
            <TableItemInput
              name="Quantity"
              type="number"
              filter-store-key="quantity"
              :value="item.quantity"
              :update-method="boughtItemsRequest.putItemsQuantity"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
              :center="true"
              v-model:width="colW.quantity"
            />
            <!-- UNIT ENDPOINT NOT AVAILABLE IN BACKEND -->
            <TableItemSelect
              name="Unit"
              filter-store-key="unit"
              :value="item.unit"
              :options="unitsStore.boughtItemUnitsOption"
              :update-method="boughtItemsRequest.putItemsUnit"
              :edit-mode="false"
              v-model:width="colW.unit"
            />
            <TableItemLink
              name="Weblink"
              :value="item.weblink"
              :display-icon="true"
              :center="true"
              v-model:width="colW.weblink"
            />
            <TableItemInput
              name="Part Number"
              filter-store-key="partnumber"
              :value="item.partnumber"
              :update-method="boughtItemsRequest.putItemsPartnumber"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
              v-model:width="colW.partnumber"
            />
            <TableItemInput
              name="Order Number"
              filter-store-key="orderNumber"
              :value="item.order_number"
              :update-method="boughtItemsRequest.putItemsOrderNumber"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
              v-model:width="colW.orderNumber"
            />
            <TableItemInput
              name="Manufacturer"
              filter-store-key="manufacturer"
              :value="item.manufacturer"
              :update-method="boughtItemsRequest.putItemsManufacturer"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
              v-model:width="colW.manufacturer"
            />
            <TableItemInput
              name="Supplier"
              filter-store-key="supplier"
              :value="item.supplier"
              :update-method="boughtItemsRequest.putItemsSupplier"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
              v-model:width="colW.supplier"
            />
            <TableItemInput
              name="Group"
              filter-store-key="group1"
              :value="item.group_1"
              :update-method="boughtItemsRequest.putItemsGroup1"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
              v-model:width="colW.group1"
            />
            <TableItemTextarea
              name="General Note"
              filter-store-key="noteGeneral"
              :value="item.note_general"
              :update-method="boughtItemsRequest.putItemsNoteGeneral"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
              v-model:width="colW.noteGeneral"
            />
            <TableItemTextarea
              name="Supplier Note"
              filter-store-key="noteSupplier"
              :value="item.note_general"
              :update-method="boughtItemsRequest.putItemsNoteSupplier"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
              v-model:width="colW.noteSupplier"
            />
            <TableItemText
              name="Created"
              filter-store-key="createdDate"
              :value="item.created"
              :center="true"
              v-model:width="colW.createdDate"
            />
            <TableItemText
              v-if="!controlsStore.state.unclutter"
              name="Creator"
              filter-store-key="creatorId"
              :value="item.creator_id"
              :display-value="usersStore.getNameByID(item.creator_id)"
              v-model:width="colW.creatorId"
            />
            <TableItemDate
              name="Desired Delivery Date"
              filter-store-key="desiredDate"
              :value="item.desired_delivery_date"
              :update-method="boughtItemsRequest.putItemsDesiredDeliveryDate"
              :center="true"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
              v-model:width="colW.desiredDate"
            />
            <TableItemText
              name="Requested Delivery Date"
              filter-store-key="requestedDate"
              :value="item.requested_date"
              :center="true"
              v-model:width="colW.requestedDate"
            />
            <TableItemText
              v-if="!controlsStore.state.unclutter"
              name="Requester"
              filter-store-key="requesterId"
              :value="item.requester_id"
              :display-value="usersStore.getNameByID(item.requester_id)"
              v-model:width="colW.requesterId"
            />
            <TableItemText
              name="Ordered"
              filter-store-key="orderedDate"
              :value="item.ordered_date"
              :center="true"
              v-model:width="colW.orderedDate"
            />
            <TableItemText
              v-if="!controlsStore.state.unclutter"
              name="Orderer"
              filter-store-key="ordererId"
              :value="item.orderer_id"
              :display-value="usersStore.getNameByID(item.orderer_id)"
              v-model:width="colW.ordererId"
            />
            <TableItemDate
              name="Expected Delivery Date"
              filter-store-key="expectedDate"
              :value="item.expected_delivery_date"
              :update-method="boughtItemsRequest.putItemsExpectedDeliveryDate"
              :center="true"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
              v-model:width="colW.expectedDate"
            />
            <TableItemText
              name="Delivered"
              filter-store-key="deliveredDate"
              :value="item.delivery_date"
              :center="true"
              v-model:width="colW.deliveredDate"
            />
            <TableItemText
              v-if="!controlsStore.state.unclutter"
              name="Receiver"
              filter-store-key="receiverId"
              :value="item.receiver_id"
              :display-value="usersStore.getNameByID(item.receiver_id)"
              v-model:width="colW.receiverId"
            />
            <TableItemText
              v-if="!controlsStore.state.unclutter"
              name="Arrival Weeks"
              :value="calcDiffInWeeksFromToday(item.expected_delivery_date)"
              v-model:width="colW.arrivalWeeks"
            />
            <TableItemText
              v-if="!controlsStore.state.unclutter"
              name="Total Weeks"
              :value="calcDiffInWeeks(item.ordered_date, item.delivery_date)"
              v-model:width="colW.totalWeeks"
            />
            <TableItemInput
              name="Storage Place"
              filter-store-key="storagePlace"
              :value="item.storage_place"
              :update-method="boughtItemsRequest.putItemsStorage"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
              v-model:width="colW.storagePlace"
            />
          </TableRowItems>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.scope {
  height: 100%;
  width: calc(100% - 10px);
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 5px;

  overflow: hidden;
}

.wrapper {
  overflow-x: auto;
  overflow-y: auto;
  height: calc(100% - 20px);

  position: relative;

  background-color: $main-background-color-dark;

  border-style: solid;
  border-color: $main-background-color-dark;
  border-width: 10px;
  border-radius: $main-border-radius;
}

table {
  border-collapse: separate;
  border-spacing: 0;

  width: 100%;
  border-radius: $main-border-radius;
  background-color: $main-background-color-dark;
}

.spinner {
  z-index: 999;
  position: absolute;
  width: auto;
  height: auto;
  left: 50vw;
  top: 260px;
  transform: translate(-50%, -50%);
}
</style>
