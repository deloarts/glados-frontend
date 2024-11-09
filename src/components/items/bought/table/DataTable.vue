<script setup lang="ts">
import { ref, watch, onBeforeMount, onUnmounted } from "vue";

import { useBoughtItemsStore } from "@/stores/boughtItems";
import { useUnitsStore } from "@/stores/units";
import { useStatusStore } from "@/stores/status";
import { useBoughtItemsControlsStore } from "@/stores/controls";
import { useBoughtItemFilterStore } from "@/stores/filter";
import { useUsersStore } from "@/stores/user";
import { useNotificationStore } from "@/stores/notification";

import { boughtItemsRequest } from "@/requests/items";

import { capitalizeFirstLetter } from "@/helper/string.helper";
import {
  calcDiffInWeeks,
  calcDiffInWeeksFromToday,
} from "@/helper/date.helper";

import type { AvailableOption } from "@/models/controls";

import Spinner from "@/components/spinner/LoadingSpinner.vue";

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
const notificationStore = useNotificationStore();
const unitsStore = useUnitsStore();
const statusStore = useStatusStore();

// Select options
let availableOptionsStatusFilter: Array<AvailableOption> = [
  { text: "All", value: "" },
];
let availableOptionsStatus: Array<AvailableOption> = [];
let availableOptionsUnitFilter: Array<AvailableOption> = [
  { text: "All", value: "" },
];
let availableOptionsUnit: Array<AvailableOption> = [];
let availableOptionsUsers: Array<AvailableOption> = [
  { text: "All", value: "" },
];

// Items
const lineIndex = ref<number>(0);

// Dates
// let pickedExpectedDate = ref<Date>(new Date());
// let pickedDesiredDate = ref<Date>(new Date());

function setOptionsStatusFilter() {
  var tempAvailableOptions = [{ text: "All", value: "" }];
  for (const property in statusStore.boughtItemStatus) {
    tempAvailableOptions.push({
      text: capitalizeFirstLetter(property),
      value: statusStore.boughtItemStatus[property],
    });
  }
  availableOptionsStatusFilter = tempAvailableOptions;
}

function setOptionsStatus() {
  var tempAvailableOptions = [];
  for (const property in statusStore.boughtItemStatus) {
    tempAvailableOptions.push({
      text: capitalizeFirstLetter(property),
      value: statusStore.boughtItemStatus[property],
    });
  }
  availableOptionsStatus = tempAvailableOptions;
}

function setOptionsUnitsFilter() {
  var tempAvailableOptions = [{ text: "All", value: "" }];
  for (let i = 0; i < unitsStore.boughtItemUnits.values.length; i++) {
    tempAvailableOptions.push({
      text: unitsStore.boughtItemUnits.values[i],
      value: unitsStore.boughtItemUnits.values[i],
    });
  }
  availableOptionsUnitFilter = tempAvailableOptions;
}

function setOptionsUnits() {
  var tempAvailableOptions = [];
  for (let i = 0; i < unitsStore.boughtItemUnits.values.length; i++) {
    tempAvailableOptions.push({
      text: unitsStore.boughtItemUnits.values[i],
      value: unitsStore.boughtItemUnits.values[i],
    });
  }
  availableOptionsUnit = tempAvailableOptions;
}

function setOptionsUsers() {
  var tempAvailableOptions = [{ text: "All", value: "" }];
  for (let i = 0; i < usersStore.users.length; i++) {
    tempAvailableOptions.push({
      text: usersStore.users[i].full_name,
      value: String(usersStore.users[i].id),
    });
  }
  availableOptionsUsers = tempAvailableOptions;
}

// function pauseFetchBoughtItems(state: boolean) {
//   if (state) {
//     // Wait 100ms before stopping the auto fetch routine because if the user sets the focus on another
//     // element it could be possible, that the pause is reset by another element before it's set by the
//     // current element.
//     setTimeout(() => {
//       boughtItemsStore.pause(true);
//     }, 100);
//   } else {
//     boughtItemsStore.pause(false);
//   }
// }

function multiSelect(event: any, id: number, index: number) {
  var tempSelectedItemIds = boughtItemsStore.selectedIDs;

  if (event.ctrlKey) {
    if (tempSelectedItemIds.includes(id)) {
      tempSelectedItemIds.splice(tempSelectedItemIds.indexOf(id), 1);
    } else {
      tempSelectedItemIds.push(id);
    }
  } else if (event.shiftKey) {
    var indexRange = [];
    var highEnd = 0;
    var lowEnd = 0;
    tempSelectedItemIds = [];

    if (lineIndex.value > index) {
      highEnd = lineIndex.value + 1;
      lowEnd = index + 1;
    } else {
      highEnd = index + 1;
      lowEnd = lineIndex.value + 1;
    }
    var c = highEnd - lowEnd + 1;
    while (c--) {
      indexRange[c] = highEnd--;
    }
    for (var i = 0; i < indexRange.length; i++) {
      tempSelectedItemIds.push(boughtItemsStore.items[indexRange[i] - 1].id);
    }
  } else if (!tempSelectedItemIds.includes(id)) {
    tempSelectedItemIds = [id];
  }

  lineIndex.value = index;
  boughtItemsStore.selectedIDs = tempSelectedItemIds;
}

function removeSelection() {
  boughtItemsStore.clearSelection();
}

// function looseFocus(event: any) {
//   event.target.blur();
// }

// function updateItemHandler(requestFn: Function, value: string, desc: string) {
//   var c = 0;
//   var confirmation = true;
//   const ids = boughtItemsStore.selectedIDs;
//   if (value == null) {
//     return;
//   }

//   if (ids.length > 1) {
//     confirmation = confirm(
//       `Do you want to change the ${desc.toLowerCase()} of ${
//         ids.length
//       } items to '${value}'?`,
//     );
//   }
//   if (confirmation) {
//     for (var i = 0; i < ids.length; i++) {
//       const id = ids[i];
//       requestFn(id, value).then((response) => {
//         c++;
//         if (response.status != 200) {
//           notificationStore.addWarn(response.data.detail);
//         }
//         if (c == ids.length) {
//           boughtItemsStore.get();
//         }
//       });
//     }
//   } else {
//     boughtItemsStore.get();
//   }
// }

// function updateStatus(status: string) {
//   updateItemHandler(boughtItemsRequest.putItemsStatus, status, "Status");
// }

// function updateGroup1(group: string) {
//   updateItemHandler(boughtItemsRequest.putItemsGroup1, group, "Group");
// }

// function updateProject(project_number: string) {
//   updateItemHandler(
//     boughtItemsRequest.putItemsProject,
//     project_number,
//     "Project",
//   );
// }

// function updateQuantity(qty: number) {
//   updateItemHandler(
//     boughtItemsRequest.putItemsQuantity,
//     String(qty),
//     "Quantity",
//   );
// }

// function updatePartnumber(partnumber: string) {
//   updateItemHandler(
//     boughtItemsRequest.putItemsPartnumber,
//     partnumber,
//     "Partnumber",
//   );
// }

// function updateOrderNumber(orderNumber: string) {
//   updateItemHandler(
//     boughtItemsRequest.putItemsOrderNumber,
//     orderNumber,
//     "Order Number",
//   );
// }

// function updateManufacturer(manufacturer: string) {
//   updateItemHandler(
//     boughtItemsRequest.putItemsManufacturer,
//     manufacturer,
//     "Manufacturer",
//   );
// }

// function updateSupplier(supplier: string) {
//   updateItemHandler(boughtItemsRequest.putItemsSupplier, supplier, "Supplier");
// }

// function updateNoteGeneral(note: string) {
//   updateItemHandler(
//     boughtItemsRequest.putItemsNoteGeneral,
//     note,
//     "General Note",
//   );
// }

// function updateNoteSupplier(note: string) {
//   updateItemHandler(
//     boughtItemsRequest.putItemsNoteSupplier,
//     note,
//     "Supplier Note",
//   );
// }

// function updateDesiredDeliveryDate() {
//   const formattedDate = moment(pickedDesiredDate.value).format("YYYY-MM-DD");
//   updateItemHandler(
//     boughtItemsRequest.putItemsDesiredDeliveryDate,
//     formattedDate,
//     "Desired Delivery Date",
//   );
// }

// function updateExpectedDeliveryDate() {
//   const formattedDate = moment(pickedExpectedDate.value).format("YYYY-MM-DD");
//   updateItemHandler(
//     boughtItemsRequest.putItemsExpectedDeliveryDate,
//     formattedDate,
//     "Expected Delivery Date",
//   );
// }

// function updateStorage(storage: string) {
//   updateItemHandler(
//     boughtItemsRequest.putItemsStorage,
//     storage,
//     "Storage Place",
//   );
// }

// function setDesiredDeliveryDate(date: Date) {
//   if (date != null && date != undefined) {
//     pickedDesiredDate.value = new Date(date);
//   } else {
//     pickedDesiredDate.value = null;
//   }
// }

// function setExpectedDeliveryDate(date: Date) {
//   if (date != null && date != undefined) {
//     pickedExpectedDate.value = new Date(date);
//   } else {
//     pickedExpectedDate.value = null;
//   }
// }

// function calcDiffInWeeks(fromDate: Date, toDate: Date) {
//   if (fromDate == null || toDate == null) {
//     return "";
//   }
//   const to = moment(toDate);
//   const from = moment(fromDate);
//   return to.diff(from, "week");
// }

// function calcDiffInWeeksFromToday(toDate: Date) {
//   if (toDate == null) {
//     return "";
//   }
//   const to = moment(toDate);
//   return to.diff(moment(), "week");
// }

// function resizeTextarea(event: any) {
//   var textarea = event.target;
//   textarea.style.width = "252px";
//   textarea.style.height = "20px";
//   textarea.style.height = textarea.scrollHeight + "px";
// }

function eventKeyUp(event: any) {
  if (event.key === "Escape") {
    removeSelection();
  }
}

onBeforeMount(() => {
  document.addEventListener("keyup", eventKeyUp);
  setOptionsUsers();
  setOptionsStatusFilter();
  setOptionsStatus();
  setOptionsUnitsFilter();
  setOptionsUnits();
});

onUnmounted(() => {
  document.removeEventListener("keyup", eventKeyUp);
});

watch(
  () => filterStore.$state,
  () => {
    boughtItemsStore.get();
  },
  { deep: true },
);

watch(
  () => usersStore.$state,
  () => {
    setOptionsUsers();
  },
  { deep: true },
);

watch(
  () => unitsStore.$state,
  () => {
    setOptionsUnits();
  },
  { deep: true },
);

watch(
  () => statusStore.$state,
  () => {
    setOptionsStatus();
  },
  { deep: true },
);
</script>

<template>
  <div class="scope" v-on:keyup.esc="removeSelection">
    <Spinner
      class="spinner"
      v-if="boughtItemsStore.loading && boughtItemsStore.items.length == 0"
    />
    <div class="wrapper">
      <table
        class="cursor-default"
        v-bind:class="{
          'allow-text-select': controlsStore.state.textOnly,
          'cursor-text': controlsStore.state.textOnly,
        }"
      >
        <thead>
          <tr
            v-bind:class="{
              'request-view': controlsStore.state.requestView,
            }"
          >
            <th
              class="first"
              v-bind:class="{ 'sticky-col': controlsStore.state.lockCols }"
              id="number"
            >
              #
            </th>
            <th
              class="first"
              v-bind:class="{ 'sticky-col': controlsStore.state.lockCols }"
              id="item-id"
            >
              ID
            </th>
            <th
              class="first"
              v-bind:class="{ 'sticky-col': controlsStore.state.lockCols }"
              id="status"
            >
              Status
            </th>
            <th
              class="first"
              v-bind:class="{ 'sticky-col': controlsStore.state.lockCols }"
              id="project"
            >
              Project
            </th>
            <th
              class="first"
              v-bind:class="{ 'sticky-col': controlsStore.state.lockCols }"
              id="product-number"
            >
              Product
            </th>
            <th
              class="first"
              v-bind:class="{ 'sticky-col': controlsStore.state.lockCols }"
              id="quantity"
            >
              Qty
            </th>
            <th
              class="first"
              v-bind:class="{ 'sticky-col': controlsStore.state.lockCols }"
              id="unit"
            >
              Unit
            </th>
            <th
              class="first"
              v-bind:class="{ 'sticky-col': controlsStore.state.lockCols }"
              id="weblink"
            >
              Link
            </th>
            <th
              class="first"
              v-bind:class="{ 'sticky-col': controlsStore.state.lockCols }"
              id="partnumber"
            >
              Part Number
            </th>
            <th class="first" id="order-number">Order Number</th>
            <th class="first" id="manufacturer">Manufacturer</th>
            <th class="first" id="supplier">Supplier</th>
            <th class="first" id="group">Group</th>
            <th class="first" id="note-general">Note</th>
            <th class="first" id="note-supplier">Supplier Note</th>
            <th
              class="first"
              id="created"
              v-if="!controlsStore.state.requestView"
            >
              Created
            </th>
            <th
              class="first"
              id="creator"
              v-if="
                !controlsStore.state.unclutter &&
                !controlsStore.state.requestView
              "
            >
              Creator
            </th>
            <th class="first" id="desired">Desired</th>
            <th
              class="first"
              id="requested"
              v-if="!controlsStore.state.requestView"
            >
              Requested
            </th>
            <th
              class="first"
              id="requester"
              v-if="
                !controlsStore.state.unclutter &&
                !controlsStore.state.requestView
              "
            >
              Requester
            </th>
            <th
              class="first"
              id="ordered"
              v-if="!controlsStore.state.requestView"
            >
              Ordered
            </th>
            <th
              class="first"
              id="orderer"
              v-if="
                !controlsStore.state.unclutter &&
                !controlsStore.state.requestView
              "
            >
              Orderer
            </th>
            <th
              class="first"
              id="expected"
              v-if="!controlsStore.state.requestView"
            >
              Expected
            </th>
            <th
              class="first"
              id="delivered"
              v-if="!controlsStore.state.requestView"
            >
              Delivered
            </th>
            <th
              class="first"
              id="taken-over-by"
              v-if="
                !controlsStore.state.unclutter &&
                !controlsStore.state.requestView
              "
            >
              Receiver
            </th>
            <th
              class="first"
              id="arrival-weeks"
              v-if="
                !controlsStore.state.unclutter &&
                !controlsStore.state.requestView
              "
            >
              Arrival
            </th>
            <th
              class="first"
              id="total-delivery-weeks"
              v-if="
                !controlsStore.state.unclutter &&
                !controlsStore.state.requestView
              "
            >
              Total
            </th>
            <th
              class="first"
              id="storage-place"
              v-if="!controlsStore.state.requestView"
            >
              Storage
            </th>
          </tr>
          <tr
            v-if="controlsStore.state.textOnly == false"
            v-bind:class="{
              'request-view': controlsStore.state.requestView,
            }"
          >
            <th
              class="second"
              v-bind:class="{ 'sticky-col': controlsStore.state.lockCols }"
              id="number"
            >
              <!-- {{ filterStore.limit }} -->
            </th>
            <th
              class="second"
              v-bind:class="{ 'sticky-col': controlsStore.state.lockCols }"
              id="item-id"
              @contextmenu.prevent="
                () => {
                  filterStore.state.id = null;
                }
              "
            >
              <input
                class="filter-input"
                v-model="filterStore.state.id"
                v-on:keyup.enter="boughtItemsStore.get()"
                type="text"
                placeholder="Filter"
              />
            </th>
            <th
              class="second"
              v-bind:class="{ 'sticky-col': controlsStore.state.lockCols }"
              id="status"
              @contextmenu.prevent="
                () => {
                  filterStore.state.status = null;
                }
              "
            >
              <select
                class="filter-select"
                v-model="filterStore.state.status"
                @change="boughtItemsStore.get()"
              >
                <option
                  v-for="(option, index) in availableOptionsStatusFilter"
                  :key="index"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </th>
            <th
              class="second"
              v-bind:class="{ 'sticky-col': controlsStore.state.lockCols }"
              id="project"
              @contextmenu.prevent="
                () => {
                  filterStore.state.projectNumber = null;
                }
              "
            >
              <input
                class="filter-input"
                v-model="filterStore.state.projectNumber"
                v-on:keyup.enter="boughtItemsStore.get()"
                type="text"
                placeholder="Filter"
              />
            </th>
            <th
              class="second"
              v-bind:class="{ 'sticky-col': controlsStore.state.lockCols }"
              id="product-number"
              @contextmenu.prevent="
                () => {
                  filterStore.state.productNumber = null;
                }
              "
            >
              <input
                class="filter-input"
                v-model="filterStore.state.productNumber"
                v-on:keyup.enter="boughtItemsStore.get()"
                type="text"
                placeholder="Filter"
              />
            </th>
            <th
              class="second"
              v-bind:class="{ 'sticky-col': controlsStore.state.lockCols }"
              id="quantity"
              @contextmenu.prevent="
                () => {
                  filterStore.state.quantity = null;
                }
              "
            >
              <input
                class="filter-input"
                v-model="filterStore.state.quantity"
                v-on:keyup.enter="boughtItemsStore.get()"
                type="text"
                placeholder="Filter"
              />
            </th>
            <th
              class="second"
              v-bind:class="{ 'sticky-col': controlsStore.state.lockCols }"
              id="unit"
              @contextmenu.prevent="
                () => {
                  filterStore.state.unit = null;
                }
              "
            >
              <select
                class="filter-select"
                v-model="filterStore.state.unit"
                @change="boughtItemsStore.get()"
              >
                <option
                  v-for="(option, index) in availableOptionsUnitFilter"
                  :key="index"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </th>
            <th
              class="second"
              v-bind:class="{ 'sticky-col': controlsStore.state.lockCols }"
              id="weblink"
            ></th>
            <th
              class="second"
              v-bind:class="{ 'sticky-col': controlsStore.state.lockCols }"
              id="partnumber"
              @contextmenu.prevent="
                () => {
                  filterStore.state.partnumber = null;
                }
              "
            >
              <input
                class="filter-input"
                v-model="filterStore.state.partnumber"
                v-on:keyup.enter="boughtItemsStore.get()"
                type="text"
                placeholder="Filter"
              />
            </th>
            <th
              class="second"
              id="order-number"
              @contextmenu.prevent="
                () => {
                  filterStore.state.orderNumber = null;
                }
              "
            >
              <input
                class="filter-input"
                v-model="filterStore.state.orderNumber"
                v-on:keyup.enter="boughtItemsStore.get()"
                type="text"
                placeholder="Filter"
              />
            </th>
            <th
              class="second"
              id="manufacturer"
              @contextmenu.prevent="
                () => {
                  filterStore.state.manufacturer = null;
                }
              "
            >
              <input
                class="filter-input"
                v-model="filterStore.state.manufacturer"
                v-on:keyup.enter="boughtItemsStore.get()"
                type="text"
                placeholder="Filter"
              />
            </th>
            <th
              class="second"
              id="supplier"
              @contextmenu.prevent="
                () => {
                  filterStore.state.supplier = null;
                }
              "
            >
              <input
                class="filter-input"
                v-model="filterStore.state.supplier"
                v-on:keyup.enter="boughtItemsStore.get()"
                type="text"
                placeholder="Filter"
              />
            </th>
            <th
              class="second"
              id="group"
              @contextmenu.prevent="
                () => {
                  filterStore.state.group1 = null;
                }
              "
            >
              <input
                class="filter-input"
                v-model="filterStore.state.group1"
                v-on:keyup.enter="boughtItemsStore.get()"
                type="text"
                placeholder="Filter"
              />
            </th>
            <th
              class="second"
              id="note-general"
              @contextmenu.prevent="
                () => {
                  filterStore.state.noteGeneral = null;
                }
              "
            >
              <input
                class="filter-input"
                v-model="filterStore.state.noteGeneral"
                v-on:keyup.enter="boughtItemsStore.get()"
                type="text"
                placeholder="Filter"
              />
            </th>
            <th
              class="second"
              id="note-supplier"
              @contextmenu.prevent="
                () => {
                  filterStore.state.noteSupplier = null;
                }
              "
            >
              <input
                class="filter-input"
                v-model="filterStore.state.noteSupplier"
                v-on:keyup.enter="boughtItemsStore.get()"
                type="text"
                placeholder="Filter"
              />
            </th>
            <th
              class="second"
              id="created"
              v-if="!controlsStore.state.requestView"
              @contextmenu.prevent="
                () => {
                  filterStore.state.createdDate = null;
                }
              "
            >
              <input
                class="filter-input"
                v-model="filterStore.state.createdDate"
                v-on:keyup.enter="boughtItemsStore.get()"
                type="text"
                placeholder="Filter"
              />
            </th>
            <th
              class="second"
              id="creator"
              v-if="
                !controlsStore.state.unclutter &&
                !controlsStore.state.requestView
              "
              @contextmenu.prevent="
                () => {
                  filterStore.state.creatorId = null;
                }
              "
            >
              <select
                class="filter-select"
                v-model="filterStore.state.creatorId"
                @change="boughtItemsStore.get()"
              >
                <option
                  v-for="(option, index) in availableOptionsUsers"
                  :key="index"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </th>
            <th
              class="second"
              id="desired"
              @contextmenu.prevent="
                () => {
                  filterStore.state.desiredDate = null;
                }
              "
            >
              <input
                class="filter-input"
                v-model="filterStore.state.desiredDate"
                v-on:keyup.enter="boughtItemsStore.get()"
                type="text"
                placeholder="Filter"
              />
            </th>
            <th
              class="second"
              id="requested"
              v-if="!controlsStore.state.requestView"
              @contextmenu.prevent="
                () => {
                  filterStore.state.requestedDate = null;
                }
              "
            >
              <input
                class="filter-input"
                v-model="filterStore.state.requestedDate"
                v-on:keyup.enter="boughtItemsStore.get()"
                type="text"
                placeholder="Filter"
              />
            </th>
            <th
              class="second"
              id="requester"
              v-if="
                !controlsStore.state.unclutter &&
                !controlsStore.state.requestView
              "
              @contextmenu.prevent="
                () => {
                  filterStore.state.requesterId = null;
                }
              "
            >
              <select
                class="filter-select"
                v-model="filterStore.state.requesterId"
                @change="boughtItemsStore.get()"
              >
                <option
                  v-for="(option, index) in availableOptionsUsers"
                  :key="index"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </th>
            <th
              class="second"
              id="ordered"
              v-if="!controlsStore.state.requestView"
              @contextmenu.prevent="
                () => {
                  filterStore.state.orderedDate = null;
                }
              "
            >
              <input
                class="filter-input"
                v-model="filterStore.state.orderedDate"
                v-on:keyup.enter="boughtItemsStore.get()"
                type="text"
                placeholder="Filter"
              />
            </th>
            <th
              class="second"
              id="orderer"
              v-if="
                !controlsStore.state.unclutter &&
                !controlsStore.state.requestView
              "
              @contextmenu.prevent="
                () => {
                  filterStore.state.ordererId = null;
                }
              "
            >
              <select
                class="filter-select"
                v-model="filterStore.state.ordererId"
                @change="boughtItemsStore.get()"
              >
                <option
                  v-for="(option, index) in availableOptionsUsers"
                  :key="index"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </th>
            <th
              class="second"
              id="expected"
              v-if="!controlsStore.state.requestView"
              @contextmenu.prevent="
                () => {
                  filterStore.state.expectedDate = null;
                }
              "
            >
              <input
                class="filter-input"
                v-model="filterStore.state.expectedDate"
                v-on:keyup.enter="boughtItemsStore.get()"
                type="text"
                placeholder="Filter"
              />
            </th>
            <th
              class="second"
              id="delivered"
              v-if="!controlsStore.state.requestView"
              @contextmenu.prevent="
                () => {
                  filterStore.state.deliveredDate = null;
                }
              "
            >
              <input
                class="filter-input"
                v-model="filterStore.state.deliveredDate"
                v-on:keyup.enter="boughtItemsStore.get()"
                type="text"
                placeholder="Filter"
              />
            </th>
            <th
              class="second"
              id="taken-over-by"
              v-if="
                !controlsStore.state.unclutter &&
                !controlsStore.state.requestView
              "
              @contextmenu.prevent="
                () => {
                  filterStore.state.receiverId = null;
                }
              "
            >
              <select
                class="filter-select"
                v-model="filterStore.state.receiverId"
                @change="boughtItemsStore.get()"
              >
                <option
                  v-for="(option, index) in availableOptionsUsers"
                  :key="index"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </th>
            <th
              class="second"
              id="arrival-weeks"
              v-if="
                !controlsStore.state.unclutter &&
                !controlsStore.state.requestView
              "
            >
              (Weeks)
            </th>
            <th
              class="second"
              id="total-delivery-weeks"
              v-if="
                !controlsStore.state.unclutter &&
                !controlsStore.state.requestView
              "
            >
              (Weeks)
            </th>
            <th
              class="second"
              id="storage-place"
              v-if="!controlsStore.state.requestView"
              @contextmenu.prevent="
                () => {
                  filterStore.state.storagePlace = null;
                }
              "
            >
              <input
                class="filter-input"
                v-model="filterStore.state.storagePlace"
                v-on:keyup.enter="boughtItemsStore.get()"
                type="text"
                placeholder="Filter"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in boughtItemsStore.items"
            :key="item.id"
            v-on:click="multiSelect($event, item.id, index)"
            v-bind:class="{
              selected: boughtItemsStore.selectedIDs.includes(item.id),
              open:
                controlsStore.state.rainbow &&
                !controlsStore.state.requestView &&
                item.status == 'open',
              requested:
                controlsStore.state.rainbow &&
                !controlsStore.state.requestView &&
                item.status == 'requested',
              ordered:
                controlsStore.state.rainbow &&
                !controlsStore.state.requestView &&
                item.status == 'ordered',
              late:
                controlsStore.state.rainbow &&
                !controlsStore.state.requestView &&
                item.status == 'late',
              partial:
                controlsStore.state.rainbow &&
                !controlsStore.state.requestView &&
                item.status == 'partial',
              delivered:
                controlsStore.state.rainbow &&
                !controlsStore.state.requestView &&
                item.status == 'delivered',
              canceled:
                controlsStore.state.rainbow &&
                !controlsStore.state.requestView &&
                item.status == 'canceled',
              lost:
                controlsStore.state.rainbow &&
                !controlsStore.state.requestView &&
                item.status == 'lost',
              'request-view': controlsStore.state.requestView,
            }"
          >
            <TableItemRowNumber
              :number="index + 1"
              :locked-icon="!item.project_is_active"
              :bell-icon="item.high_priority"
            />
            <TableItemText
              name="ID"
              filter-store-key="id"
              :value="item.id"
              :width="45"
              :center="true"
            />
            <TableItemSelect
              name="Status"
              filter-store-key="status"
              :value="item.status"
              :options="availableOptionsStatus"
              :update-method="boughtItemsRequest.putItemsStatus"
              :width="85"
              :edit-mode="boughtItemsStore.selectedIDs.includes(item.id)"
            />
            <TableItemInput
              name="Project Number"
              filter-store-key="projectNumber"
              :value="item.project_number"
              :update-method="boughtItemsRequest.putItemsProject"
              :width="85"
              :edit-mode="boughtItemsStore.selectedIDs.includes(item.id)"
            />
            <TableItemText
              name="Product Number"
              filter-store-key="productNumber"
              :value="item.product_number"
              :width="85"
            />
            <TableItemInput
              name="Quantity"
              type="number"
              filter-store-key="quantity"
              :value="item.quantity"
              :update-method="boughtItemsRequest.putItemsQuantity"
              :width="41"
              :edit-mode="boughtItemsStore.selectedIDs.includes(item.id)"
            />
            <!-- UNIT ENDPOINT NOT AVAILABLE IN BACKEND -->
            <TableItemSelect
              name="Unit"
              filter-store-key="unit"
              :value="item.unit"
              :options="availableOptionsUnit"
              :update-method="boughtItemsRequest.putItemsUnit"
              :width="41"
              :edit-mode="false"
            />
            <TableItemLink
              name="Weblink"
              :value="item.weblink"
              :display-icon="true"
              :width="35"
              :center="true"
            />
            <TableItemInput
              name="Part Number"
              filter-store-key="partnumber"
              :value="item.partnumber"
              :update-method="boughtItemsRequest.putItemsPartnumber"
              :width="250"
              :edit-mode="boughtItemsStore.selectedIDs.includes(item.id)"
            />
            <TableItemInput
              name="Order Number"
              filter-store-key="orderNumber"
              :value="item.order_number"
              :update-method="boughtItemsRequest.putItemsOrderNumber"
              :width="200"
              :edit-mode="boughtItemsStore.selectedIDs.includes(item.id)"
            />
            <TableItemInput
              name="Manufacturer"
              filter-store-key="manufacturer"
              :value="item.manufacturer"
              :update-method="boughtItemsRequest.putItemsManufacturer"
              :width="150"
              :edit-mode="boughtItemsStore.selectedIDs.includes(item.id)"
            />
            <TableItemInput
              name="Supplier"
              filter-store-key="supplier"
              :value="item.supplier"
              :update-method="boughtItemsRequest.putItemsSupplier"
              :width="150"
              :edit-mode="boughtItemsStore.selectedIDs.includes(item.id)"
            />
            <TableItemInput
              name="Group"
              filter-store-key="group1"
              :value="item.group_1"
              :update-method="boughtItemsRequest.putItemsGroup1"
              :width="170"
              :edit-mode="boughtItemsStore.selectedIDs.includes(item.id)"
            />
            <TableItemTextarea
              name="General Note"
              filter-store-key="noteGeneral"
              :value="item.note_general"
              :update-method="boughtItemsRequest.putItemsNoteGeneral"
              :edit-mode="boughtItemsStore.selectedIDs.includes(item.id)"
              :width="300"
            />
            <TableItemTextarea
              name="Supplier Note"
              filter-store-key="noteSupplier"
              :value="item.note_general"
              :update-method="boughtItemsRequest.putItemsNoteSupplier"
              :edit-mode="boughtItemsStore.selectedIDs.includes(item.id)"
              :width="300"
            />
            <TableItemText
              name="Created"
              filter-store-key="createdDate"
              :value="item.created"
              :width="81"
              :center="true"
            />
            <TableItemText
              v-if="!controlsStore.state.unclutter"
              name="Creator"
              filter-store-key="creatorId"
              :value="item.creator_id"
              :display-value="usersStore.getNameByID(item.creator_id)"
              :width="121"
            />
            <TableItemDate
              name="Desired Delivery Date"
              filter-store-key="desiredDate"
              :value="item.desired_delivery_date"
              :update-method="boughtItemsRequest.putItemsDesiredDeliveryDate"
              :edit-mode="boughtItemsStore.selectedIDs.includes(item.id)"
            />
            <TableItemText
              name="Requested Delivery Date"
              filter-store-key="requestedDate"
              :value="item.requested_date"
              :width="81"
              :center="true"
            />
            <TableItemText
              v-if="!controlsStore.state.unclutter"
              name="Requester"
              filter-store-key="requesterId"
              :value="item.requester_id"
              :display-value="usersStore.getNameByID(item.requester_id)"
              :width="121"
            />
            <TableItemText
              name="Ordered"
              filter-store-key="orderedDate"
              :value="item.ordered_date"
              :width="81"
              :center="true"
            />
            <TableItemText
              v-if="!controlsStore.state.unclutter"
              name="Orderer"
              filter-store-key="ordererId"
              :value="item.orderer_id"
              :display-value="usersStore.getNameByID(item.orderer_id)"
              :width="121"
            />
            <TableItemDate
              name="Expected Delivery Date"
              filter-store-key="expectedDate"
              :value="item.expected_delivery_date"
              :update-method="boughtItemsRequest.putItemsExpectedDeliveryDate"
              :edit-mode="boughtItemsStore.selectedIDs.includes(item.id)"
            />
            <TableItemText
              name="Delivered"
              filter-store-key="deliveredDate"
              :value="item.delivery_date"
              :width="81"
              :center="true"
            />
            <TableItemText
              v-if="!controlsStore.state.unclutter"
              name="Receiver"
              filter-store-key="receiverId"
              :value="item.receiver_id"
              :display-value="usersStore.getNameByID(item.receiver_id)"
              :width="121"
            />
            <TableItemText
              v-if="!controlsStore.state.unclutter"
              name="Arrival Weeks"
              :value="calcDiffInWeeksFromToday(item.expected_delivery_date)"
              :width="61"
            />
            <TableItemText
              v-if="!controlsStore.state.unclutter"
              name="Total Weeks"
              :value="calcDiffInWeeks(item.ordered_date, item.delivery_date)"
              :width="61"
            />
            <TableItemInput
              name="Storage Place"
              filter-store-key="storagePlace"
              :value="item.storage_place"
              :update-method="boughtItemsRequest.putItemsStorage"
              :width="300"
              :edit-mode="boughtItemsStore.selectedIDs.includes(item.id)"
            />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/dataTable/filter.scss";

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

.bell-icon {
  color: red;
  height: 12px;
  width: 12px;
  vertical-align: middle;
}

.locked-icon {
  color: orange;
  height: 12px;
  width: 12px;
  vertical-align: middle;
}

.weblink-icon {
  color: white;
  height: 12px;
  width: 12px;
  vertical-align: middle;
}

table {
  // border-collapse: collapse;
  border-collapse: separate;
  border-spacing: 0;

  width: 100%;
  border-radius: $main-border-radius;
  background-color: $main-background-color-dark;
}

th {
  z-index: 10;
  font-family: "Play", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 14px; //0.9em;
}

tr {
  margin: 0;
  padding: 0;
  height: 24px;
}

tbody tr {
  border-bottom: solid thin $main-color;
}

tr:nth-child(even) > td {
  // background: rgb(230, 230, 230);
  color: white;
  background: $table-row-even;
}

tr:nth-child(odd) > td {
  // background: rgb(240, 240, 240);
  color: white;
  background: $table-row-odd;
}

tr.open:nth-child(even) > td {
  // background: rgb(230, 230, 230);
  background: $table-background-open-even;
}

tr.open:nth-child(odd) > td {
  background: $table-background-open-odd;
}

tr.requested:nth-child(even) > td {
  background: $table-background-requested-even;
}

tr.requested:nth-child(odd) > td {
  background: $table-background-requested-odd;
}

tr.ordered:nth-child(even) > td {
  background: $table-background-ordered-even;
}

tr.ordered:nth-child(odd) > td {
  background: $table-background-ordered-odd;
}

tr.late:nth-child(even) > td {
  background: $table-background-late-even;
}

tr.late:nth-child(odd) > td {
  background: $table-background-late-odd;
}

tr.partial:nth-child(even) > td {
  background: $table-background-partial-even;
}

tr.partial:nth-child(odd) > td {
  background: $table-background-partial-odd;
}

tr.delivered:nth-child(even) > td {
  background: $table-background-delivered-even;
}

tr.delivered:nth-child(odd) > td {
  background: $table-background-delivered-odd;
}

tr.canceled:nth-child(even) > td {
  background: $table-background-canceled-even;
}

tr.canceled:nth-child(odd) > td {
  background: $table-background-canceled-odd;
}

tr.lost:nth-child(even) > td {
  background: $table-background-lost-even;
}

tr.lost:nth-child(odd) > td {
  background: $table-background-lost-odd;
}

tr:hover > td {
  background: $table-row-hover !important;
}

tr.selected > td {
  background: $table-row-active !important;
}

tr.selected:hover > td {
  background: $table-row-active-hover !important;
}

.request-view > td,
.request-view > th {
  color: black !important;
  background-color: white !important;
}

// td {
//   z-index: 0;
//   height: 24px;

//   font-size: 14px;

//   margin: 0;
//   padding: 0;

//   word-wrap: break-word;
//   border-bottom: solid thin rgb(100, 100, 100);
//   border-right: solid thin $table-head-background;
// }

// .fix-height {
//   height: min-content;
//   width: 100%;

//   text-overflow: ellipsis;
//   overflow: hidden;
//   display: block;
//   white-space: nowrap;
// }

// Sticky rows & cols

.first {
  position: sticky;
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  top: 0px;

  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;

  color: white;
  background: $table-head-background;
}

.second {
  position: sticky;
  height: 30px;
  min-height: 30px;
  max-height: 30px;
  top: 40px;

  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;

  border-bottom: solid thin rgb(50, 50, 50);

  color: white;
  background: $table-head-background;
}

.sticky-col {
  position: -webkit-sticky;
  position: sticky;
  z-index: 20;
}

th.sticky-col {
  z-index: 40;
}

td.sticky-col {
  z-index: 30;
}

// #number {
//   width: 35px;
//   min-width: 35px;
//   max-width: 35px;
//   text-align: center;
// }
// #number.sticky-col {
//   left: 0px;
// }

// #item-id {
//   width: 45px;
//   min-width: 45px;
//   max-width: 45px;
//   text-align: center;
// }
// #item-id.sticky-col {
//   left: 37px;
// }

// #status {
//   width: 86px;
//   min-width: 86px;
//   min-width: 86px;
// }
// #status.sticky-col {
//   left: 84px;
// }

// #project {
//   width: 85px;
//   min-width: 85px;
//   max-width: 85px;
// }
// #project.sticky-col {
//   left: 172px;
// }

// #product-number {
//   width: 85px;
//   min-width: 85px;
//   max-width: 85px;
// }
// #product-number.sticky-col {
//   left: 259px;
// }

// #quantity {
//   width: 41px;
//   min-width: 41px;
//   max-width: 41px;
//   text-align: center;
// }
// #quantity.sticky-col {
//   left: 346px;
// }

// #unit {
//   width: 41px;
//   min-width: 41px;
//   max-width: 41px;
//   text-align: center;
// }
// #unit.sticky-col {
//   left: 389px;
// }

// #weblink {
//   width: 35px;
//   min-width: 35px;
//   max-width: 35px;
//   text-align: center;
// }
// #weblink.sticky-col {
//   left: 432px;
// }

// #partnumber {
//   width: auto;
//   min-width: 150px;
//   max-width: 400px;
// }
// #partnumber.sticky-col {
//   left: 469px;
// }

// #order-number {
//   width: auto;
//   min-width: 150px;
//   max-width: 250px;
// }

// #manufacturer {
//   width: auto;
//   min-width: 100px;
//   max-width: 200px;
// }

// #supplier {
//   width: auto;
//   min-width: 100px;
//   max-width: 200px;
// }

// #group {
//   width: auto;
//   min-width: 100px;
//   max-width: 150px;
// }

// #note-general {
//   width: auto;
//   min-width: 150px;
//   max-width: 300px;
// }

// #note-supplier {
//   width: auto;
//   min-width: 150px;
//   max-width: 300px;
// }

// #created {
//   width: 81px;
//   min-width: 81px;
//   max-width: 81px;
//   text-align: center;
// }

// #creator {
//   min-width: 121px;
//   max-width: 121px;
// }

// #desired {
//   text-align: center;
//   min-width: 81px;
//   max-width: 81px;
// }

// #requested {
//   text-align: center;
//   min-width: 81px;
//   max-width: 81px;
// }

// #requester {
//   min-width: 121px;
//   max-width: 121px;
// }

// #ordered {
//   text-align: center;
//   min-width: 81px;
//   max-width: 81px;
// }

// #orderer {
//   min-width: 121px;
//   max-width: 121px;
// }

// #expected {
//   text-align: center;
//   min-width: 81px;
//   max-width: 81px;
// }

// #delivered {
//   text-align: center;
//   min-width: 81px;
//   max-width: 81px;
// }

// #taken-over-by {
//   min-width: 121px;
//   max-width: 121px;
// }

// #total-delivery-weeks {
//   text-align: center;
//   min-width: 61px;
//   max-width: 61px;
// }

// #arrival-weeks {
//   text-align: center;
//   min-width: 61px;
//   max-width: 61px;
// }

// #storage-place {
//   min-width: 221px;
//   max-width: 221px;
// }

// select {
//   padding: 0;
//   margin: 0;

//   outline: none;
// }

// input {
//   padding: 0;
//   margin: 0;
// }

// .cell-select {
//   width: 100%;
//   height: 18px;
//   box-sizing: border-box;
//   -webkit-box-sizing: border-box;

//   border: none;

//   color: white;
//   background-color: transparent;

//   font-size: 12px;
// }

// .cell-select > option {
//   color: white;
//   background-color: $main-background-color-dark-2;
// }

// .cell-input {
//   width: 100%;
//   height: 18px;

//   box-shadow: none;
//   box-sizing: border-box;
//   -webkit-box-sizing: border-box;

//   color: white;
//   background-color: transparent;

//   outline: none;
//   border: none;
//   border-color: inherit;

//   font-size: 12.25px;
// }

// .cell-textarea-note {
//   width: 100%;
//   min-width: 152px;
//   max-width: 252px;

//   height: 18px;
//   min-height: 18px;

//   overflow: hidden;
//   resize: none;

//   box-shadow: none;
//   box-sizing: border-box;
//   -webkit-box-sizing: border-box;

//   color: white;

//   background-color: transparent;
//   outline: none;
//   border: none;
//   border-color: inherit;

//   font-family: Calibri, Arial, Helvetica, sans-serif;
//   font-size: 13.5px;
// }

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
