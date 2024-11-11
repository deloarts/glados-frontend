<script setup lang="ts">
import { ref, onBeforeMount, onUnmounted, computed } from "vue";

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

import TableRowHead from "@/components/dataTable/TableRowHead.vue";
import TableHeadTitle from "@/components/dataTable/TableHeadTitle.vue";
import TableHeadRowNumber from "@/components/dataTable/TableHeadRowNumber.vue";
import TableHeadText from "@/components/dataTable/TableHeadText.vue";
import TableHeadFilterInput from "@/components/dataTable/TableHeadFilterInput.vue";
import TableHeadFilterSelect from "@/components/dataTable/TableHeadFilterSelect.vue";

import TableItemRowNumber from "@/components/dataTable/TableItemRowNumber.vue";
import TableItemText from "@/components/dataTable/TableItemText.vue";
import TableItemInput from "@/components/dataTable/TableItemInput.vue";
import TableItemSelect from "@/components/dataTable/TableItemSelect.vue";
import TableItemLink from "@/components/dataTable/TableItemLink.vue";
import TableItemTextarea from "@/components/dataTable/TableItemTextarea.vue";
import TableItemDate from "@/components/dataTable/TableItemDate.vue";

import TableRowItems from "./TableRowItems.vue";

// Store
const boughtItemsStore = useBoughtItemsStore();
const usersStore = useUsersStore();
const controlsStore = useBoughtItemsControlsStore();
const filterStore = useBoughtItemFilterStore();
const unitsStore = useUnitsStore();
const statusStore = useStatusStore();

const fixedHeight = computed(() => {
  return controlsStore.state.fixedHeight;
});

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
          <TableRowHead>
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
              :id="item.id"
              :locked-icon="!item.project_is_active"
              :bell-icon="item.high_priority"
              v-model:width="colW.number"
              :fixed-height="fixedHeight"
            />
            <TableItemText
              name="ID"
              :value="item.id"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              filter-store-key="id"
              v-model:width="colW.id"
              :center="true"
              :fixed-height="fixedHeight"
            />
            <TableItemSelect
              name="Status"
              :value="item.status"
              :options="statusStore.boughtItemStatusOption"
              :update-method="boughtItemsRequest.putItemsStatus"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              filter-store-key="status"
              v-model:width="colW.status"
              :center="true"
              :fixed-height="fixedHeight"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
            />
            <TableItemInput
              name="Project Number"
              :value="item.project_number"
              :update-method="boughtItemsRequest.putItemsProject"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              filter-store-key="projectNumber"
              v-model:width="colW.projectNumber"
              :center="true"
              :fixed-height="fixedHeight"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
            />
            <TableItemText
              name="Product Number"
              :value="item.product_number"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              filter-store-key="productNumber"
              v-model:width="colW.productNumber"
              :center="true"
              :fixed-height="fixedHeight"
            />
            <TableItemInput
              name="Quantity"
              :value="item.quantity"
              :update-method="boughtItemsRequest.putItemsQuantity"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              filter-store-key="quantity"
              type="number"
              v-model:width="colW.quantity"
              :center="true"
              :fixed-height="fixedHeight"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
            />
            <!-- UNIT ENDPOINT NOT AVAILABLE IN BACKEND -->
            <TableItemSelect
              name="Unit"
              :value="item.unit"
              :options="unitsStore.boughtItemUnitsOption"
              :update-method="boughtItemsRequest.putItemsUnit"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              filter-store-key="unit"
              v-model:width="colW.unit"
              :center="true"
              :fixed-height="fixedHeight"
              :edit-mode="false"
            />
            <TableItemLink
              name="Weblink"
              :value="item.weblink"
              :display-icon="true"
              :center="true"
              v-model:width="colW.weblink"
              :fixed-height="fixedHeight"
            />
            <TableItemInput
              name="Part Number"
              :value="item.partnumber"
              :update-method="boughtItemsRequest.putItemsPartnumber"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              filter-store-key="partnumber"
              v-model:width="colW.partnumber"
              :fixed-height="fixedHeight"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
            />
            <TableItemInput
              name="Order Number"
              :value="item.order_number"
              :update-method="boughtItemsRequest.putItemsOrderNumber"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              filter-store-key="orderNumber"
              v-model:width="colW.orderNumber"
              :fixed-height="fixedHeight"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
            />
            <TableItemInput
              name="Manufacturer"
              :value="item.manufacturer"
              :update-method="boughtItemsRequest.putItemsManufacturer"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              filter-store-key="manufacturer"
              v-model:width="colW.manufacturer"
              :fixed-height="fixedHeight"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
            />
            <TableItemInput
              name="Supplier"
              :value="item.supplier"
              :update-method="boughtItemsRequest.putItemsSupplier"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              filter-store-key="supplier"
              v-model:width="colW.supplier"
              :fixed-height="fixedHeight"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
            />
            <TableItemInput
              name="Group"
              :value="item.group_1"
              :update-method="boughtItemsRequest.putItemsGroup1"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              filter-store-key="group1"
              v-model:width="colW.group1"
              :fixed-height="fixedHeight"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
            />
            <TableItemTextarea
              name="General Note"
              :value="item.note_general"
              :update-method="boughtItemsRequest.putItemsNoteGeneral"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              filter-store-key="noteGeneral"
              v-model:width="colW.noteGeneral"
              :fixed-height="fixedHeight"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
            />
            <TableItemTextarea
              name="Supplier Note"
              :value="item.note_general"
              :update-method="boughtItemsRequest.putItemsNoteSupplier"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              filter-store-key="noteSupplier"
              v-model:width="colW.noteSupplier"
              :fixed-height="fixedHeight"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
            />
            <TableItemText
              name="Created"
              :value="item.created"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              filter-store-key="createdDate"
              v-model:width="colW.createdDate"
              :center="true"
              :fixed-height="fixedHeight"
            />
            <TableItemText
              v-if="!controlsStore.state.unclutter"
              name="Creator"
              :value="item.creator_id"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              :display-value="usersStore.getNameByID(item.creator_id)"
              filter-store-key="creatorId"
              v-model:width="colW.creatorId"
              :fixed-height="fixedHeight"
            />
            <TableItemDate
              name="Desired Delivery Date"
              :value="item.desired_delivery_date"
              :update-method="boughtItemsRequest.putItemsDesiredDeliveryDate"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              filter-store-key="desiredDate"
              v-model:width="colW.desiredDate"
              :center="true"
              :fixed-height="fixedHeight"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
            />
            <TableItemText
              name="Requested Delivery Date"
              :value="item.requested_date"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              filter-store-key="requestedDate"
              v-model:width="colW.requestedDate"
              :center="true"
              :fixed-height="fixedHeight"
            />
            <TableItemText
              v-if="!controlsStore.state.unclutter"
              name="Requester"
              :value="item.requester_id"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              filter-store-key="requesterId"
              :display-value="usersStore.getNameByID(item.requester_id)"
              v-model:width="colW.requesterId"
              :fixed-height="fixedHeight"
            />
            <TableItemText
              name="Ordered"
              :value="item.ordered_date"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              filter-store-key="orderedDate"
              :center="true"
              v-model:width="colW.orderedDate"
              :fixed-height="fixedHeight"
            />
            <TableItemText
              v-if="!controlsStore.state.unclutter"
              name="Orderer"
              :value="item.orderer_id"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              :display-value="usersStore.getNameByID(item.orderer_id)"
              filter-store-key="ordererId"
              v-model:width="colW.ordererId"
              :fixed-height="fixedHeight"
            />
            <TableItemDate
              name="Expected Delivery Date"
              :value="item.expected_delivery_date"
              :update-method="boughtItemsRequest.putItemsExpectedDeliveryDate"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              filter-store-key="expectedDate"
              v-model:width="colW.expectedDate"
              :center="true"
              :fixed-height="fixedHeight"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
            />
            <TableItemText
              name="Delivered"
              :value="item.delivery_date"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              filter-store-key="deliveredDate"
              v-model:width="colW.deliveredDate"
              :center="true"
              :fixed-height="fixedHeight"
            />
            <TableItemText
              v-if="!controlsStore.state.unclutter"
              name="Receiver"
              :value="item.receiver_id"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              :display-value="usersStore.getNameByID(item.receiver_id)"
              filter-store-key="receiverId"
              v-model:width="colW.receiverId"
              :fixed-height="fixedHeight"
            />
            <TableItemText
              v-if="!controlsStore.state.unclutter"
              name="Arrival Weeks"
              :value="calcDiffInWeeksFromToday(item.expected_delivery_date)"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              v-model:width="colW.arrivalWeeks"
              :fixed-height="fixedHeight"
            />
            <TableItemText
              v-if="!controlsStore.state.unclutter"
              name="Total Weeks"
              :value="calcDiffInWeeks(item.ordered_date, item.delivery_date)"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              v-model:width="colW.totalWeeks"
              :fixed-height="fixedHeight"
            />
            <TableItemInput
              name="Storage Place"
              :value="item.storage_place"
              :update-method="boughtItemsRequest.putItemsStorage"
              :item-store="boughtItemsStore"
              :filter-store="filterStore"
              filter-store-key="storagePlace"
              v-model:width="colW.storagePlace"
              :fixed-height="fixedHeight"
              :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
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
