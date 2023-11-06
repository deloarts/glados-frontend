<script setup>
import { ref, watch, onBeforeMount, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import moment from "moment";
import Datepicker from "vue3-datepicker";

import { useBoughtItemsStore } from "@/stores/boughtItems.js";
import { useUnitsStore } from "@/stores/units.js";
import { useStatusStore } from "@/stores/status.js";
import { useBoughtItemsControlsStore } from "@/stores/controls.js";
import { useBoughtItemFilterStore } from "@/stores/filter.js";
import { boughtItemsRequest } from "@/requests/items";
import { capitalizeFirstLetter } from "@/helper/string.helper";
import { useUserStore, useUsersStore } from "@/stores/user.js";
import { useNotificationStore } from "@/stores/notification.js";

import Spinner from "@/components/spinner/LoadingSpinner.vue";
import IconBellRing from "@/components/icons/IconBellRing.vue";

// Props & Emits
const props = defineProps(["selectedItemIds", "triggerGetNewData"]);
const emit = defineEmits([
  "update:selectedItemIds",
  "update:triggerGetNewData",
]);

// Router
const route = useRoute();

// Store
const boughtItemsStore = useBoughtItemsStore();
const userStore = useUserStore();
const usersStore = useUsersStore();
const controlsStore = useBoughtItemsControlsStore();
const filterStore = useBoughtItemFilterStore();
const notificationStore = useNotificationStore();
const unitsStore = useUnitsStore();
const statusStore = useStatusStore();

// Select options
let availableOptionsStatus = [{ text: "All", value: "" }];
let availableOptionsUnit = [{ text: "All", value: "" }];
let availableOptionsUsers = [{ text: "All", value: "" }];

// Items
const lineIndex = ref(0);

// Dates
let pickedExpectedDate = ref(new Date());
let pickedDesiredDate = ref(new Date());

function setOptionsStatus() {
  var tempAvailableOptions = [{ text: "All", value: "" }];
  for (const property in statusStore.boughtItemStatus) {
    tempAvailableOptions.push({
      text: capitalizeFirstLetter(property),
      value: statusStore.boughtItemStatus[property],
    });
  }
  availableOptionsStatus = tempAvailableOptions;
}

function setOptionsUnits() {
  var tempAvailableOptions = [{ text: "All", value: "" }];
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
      value: usersStore.users[i].id,
    });
  }
  availableOptionsUsers = tempAvailableOptions;
}

function pauseFetchBoughtItems(state) {
  if (state) {
    // Wait 100ms before stopping the auto fetch routine because if the user sets the focus on another
    // element it could be possible, that the pause is reset by another element before it's set by the
    // current element.
    setTimeout(() => {
      boughtItemsStore.pause(true);
    }, 100);
  } else {
    boughtItemsStore.pause(false);
  }
}

function multiSelect(event, id, index) {
  var tempSelectedItemIds = props.selectedItemIds;

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
  emit("update:selectedItemIds", tempSelectedItemIds);
}

function removeSelection() {
  emit("update:selectedItemIds", []);
}

function looseFocus(event) {
  event.target.blur();
}

function updateItemHandler(requestFn, value, desc) {
  var c = 0;
  var confirmation = true;
  const ids = props.selectedItemIds;
  if (value == null) {
    return;
  }

  if (ids.length > 1) {
    confirmation = confirm(
      `Do you want to change the ${desc.toLowerCase()} of ${
        ids.length
      } items to '${value}'?`,
    );
  }
  if (confirmation) {
    for (var i = 0; i < ids.length; i++) {
      const id = ids[i];
      requestFn(id, value).then((response) => {
        c++;
        if (response.status == 403) {
          notificationStore.warning = response.data.detail;
        }
      });
    }
  } else {
    boughtItemsStore.get();
  }
}

function updateStatus(status) {
  updateItemHandler(boughtItemsRequest.putItemsStatus, status, "Status");
}

function updateGroup1(group) {
  updateItemHandler(boughtItemsRequest.putItemsGroup1, group, "Group");
}

function updateProject(project) {
  updateItemHandler(boughtItemsRequest.putItemsProject, project, "Project");
}

function updateMachine(machine) {
  updateItemHandler(boughtItemsRequest.putItemsMachine, machine, "Machine");
}

function updateQuantity(qty) {
  updateItemHandler(boughtItemsRequest.putItemsQuantity, qty, "Quantity");
}

function updatePartnumber(partnumber) {
  updateItemHandler(
    boughtItemsRequest.putItemsPartnumber,
    partnumber,
    "Partnumber",
  );
}

function updateDefinition(definition) {
  updateItemHandler(
    boughtItemsRequest.putItemsDefinition,
    definition,
    "Definition",
  );
}

function updateManufacturer(manufacturer) {
  updateItemHandler(
    boughtItemsRequest.putItemsManufacturer,
    manufacturer,
    "Manufacturer",
  );
}

function updateSupplier(supplier) {
  updateItemHandler(boughtItemsRequest.putItemsSupplier, supplier, "Supplier");
}

function updateNoteGeneral(note) {
  updateItemHandler(
    boughtItemsRequest.putItemsNoteGeneral,
    note,
    "General Note",
  );
}

function updateNoteSupplier(note) {
  updateItemHandler(
    boughtItemsRequest.putItemsNoteSupplier,
    note,
    "Supplier Note",
  );
}

function updateDesiredDeliveryDate() {
  const formattedDate = moment(pickedDesiredDate).format("YYYY-MM-DD");
  updateItemHandler(
    boughtItemsRequest.putItemsDesiredDeliveryDate,
    formattedDate,
    "Desired Delivery Date",
  );
}

function updateExpectedDeliveryDate() {
  const formattedDate = moment(pickedExpectedDate).format("YYYY-MM-DD");
  updateItemHandler(
    boughtItemsRequest.putItemsExpectedDeliveryDate,
    formattedDate,
    "Expected Delivery Date",
  );
}

function updateStorage(storage) {
  updateItemHandler(
    boughtItemsRequest.putItemsStorage,
    storage,
    "Storage Place",
  );
}

function setDesiredDeliveryDate(date) {
  if (date != null && date != undefined) {
    pickedDesiredDate = new Date(date);
  } else {
    pickedDesiredDate = null;
  }
}

function setExpectedDeliveryDate(date) {
  if (date != null && date != undefined) {
    pickedExpectedDate = new Date(date);
  } else {
    pickedExpectedDate = null;
  }
}

function calcDiffInWeeks(fromDate, toDate) {
  if (fromDate == null || toDate == null) {
    return "";
  }
  const to = moment(toDate);
  const from = moment(fromDate);
  return to.diff(from, "week");
}

function calcDiffInWeeksFromToday(toDate) {
  if (toDate == null) {
    return "";
  }
  const to = moment(toDate);
  return to.diff(moment(), "week");
}

function resizeTextarea(event) {
  var textarea = event.target;
  textarea.style.width = "252px";
  textarea.style.height = "20px";
  textarea.style.height = textarea.scrollHeight + "px";
}

function eventKeyUp(event) {
  if (event.key === "Escape") {
    removeSelection();
  }
}

onMounted(() => {
  setOptionsUsers();
  setOptionsStatus();
  setOptionsUnits();
});

onBeforeMount(() => {
  document.addEventListener("keyup", eventKeyUp);
});

onUnmounted(() => {
  document.removeEventListener("keyup", eventKeyUp);
});

watch(
  () => props.triggerGetNewData,
  () => {
    if (props.triggerGetNewData) {
      boughtItemsStore.get();
      emit("update:triggerGetNewData", false);
      emit("update:selectedItemIds", []);
    }
  },
);

watch(
  filterStore.state,
  () => {
    emit("update:selectedItemIds", []);
    boughtItemsStore.get();
  },
  { deep: true },
);

watch(usersStore.$state, () => {
  setOptionsUsers();
});

watch(unitsStore.$state, () => {
  setOptionsUnits();
});

watch(statusStore.$state, () => {
  setOptionsStatus();
});
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
          <tr>
            <th class="first sticky-col" id="number">#</th>
            <th class="first sticky-col" id="item-id">ID</th>
            <th class="first sticky-col" id="status">Status</th>
            <th class="first sticky-col" id="project">Project</th>
            <th class="first sticky-col" id="machine">Machine</th>
            <th class="first sticky-col" id="quantity">Qty</th>
            <th class="first sticky-col" id="unit">Unit</th>
            <th class="first sticky-col" id="partnumber">Partnumber</th>
            <th class="first" id="definition">Definition</th>
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
              Taken by
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
              v-if="
                !controlsStore.state.unclutter &&
                !controlsStore.state.requestView
              "
            >
              Storage
            </th>
          </tr>
          <tr v-if="controlsStore.state.textOnly == false">
            <th class="second sticky-col" id="number">
              <!-- {{ filterStore.limit }} -->
            </th>
            <th
              class="second sticky-col"
              id="item-id"
              @contextmenu.prevent="
                () => {
                  filterStore.state.id = '';
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
              class="second sticky-col"
              id="status"
              @contextmenu.prevent="
                () => {
                  filterStore.state.status = '';
                }
              "
            >
              <select
                class="filter-select"
                v-model="filterStore.state.status"
                @change="boughtItemsStore.get()"
              >
                <option
                  v-for="option in availableOptionsStatus"
                  :key="option"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </th>
            <th
              class="second sticky-col"
              id="project"
              @contextmenu.prevent="
                () => {
                  filterStore.state.project = '';
                }
              "
            >
              <input
                class="filter-input"
                v-model="filterStore.state.project"
                v-on:keyup.enter="boughtItemsStore.get()"
                type="text"
                placeholder="Filter"
              />
            </th>
            <th
              class="second sticky-col"
              id="machine"
              @contextmenu.prevent="
                () => {
                  filterStore.state.machine = '';
                }
              "
            >
              <input
                class="filter-input"
                v-model="filterStore.state.machine"
                v-on:keyup.enter="boughtItemsStore.get()"
                type="text"
                placeholder="Filter"
              />
            </th>
            <th
              class="second sticky-col"
              id="quantity"
              @contextmenu.prevent="
                () => {
                  filterStore.state.quantity = '';
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
              class="second sticky-col"
              id="unit"
              @contextmenu.prevent="
                () => {
                  filterStore.state.unit = '';
                }
              "
            >
              <select
                class="filter-select"
                v-model="filterStore.state.unit"
                @change="boughtItemsStore.get()"
              >
                <option
                  v-for="option in availableOptionsUnit"
                  :key="option"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </th>
            <th
              class="second sticky-col"
              id="partnumber"
              @contextmenu.prevent="
                () => {
                  filterStore.state.partnumber = '';
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
              id="definition"
              @contextmenu.prevent="
                () => {
                  filterStore.state.definition = '';
                }
              "
            >
              <input
                class="filter-input"
                v-model="filterStore.state.definition"
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
                  filterStore.state.manufacturer = '';
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
                  filterStore.state.supplier = '';
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
                  filterStore.state.group1 = '';
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
                  filterStore.state.noteGeneral = '';
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
                  filterStore.state.noteSupplier = '';
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
                  filterStore.state.createdDate = '';
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
                  filterStore.state.creatorId = '';
                }
              "
            >
              <select
                class="filter-select"
                v-model="filterStore.state.creatorId"
                @change="boughtItemsStore.get()"
              >
                <option
                  v-for="option in availableOptionsUsers"
                  :key="option"
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
                  filterStore.state.desiredDate = '';
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
                  filterStore.state.requestedDate = '';
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
                  filterStore.state.requesterId = '';
                }
              "
            >
              <select
                class="filter-select"
                v-model="filterStore.state.requesterId"
                @change="boughtItemsStore.get()"
              >
                <option
                  v-for="option in availableOptionsUsers"
                  :key="option"
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
                  filterStore.state.orderedDate = '';
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
                  filterStore.state.ordererId = '';
                }
              "
            >
              <select
                class="filter-select"
                v-model="filterStore.state.ordererId"
                @change="boughtItemsStore.get()"
              >
                <option
                  v-for="option in availableOptionsUsers"
                  :key="option"
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
                  filterStore.state.expectedDate = '';
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
                  filterStore.state.deliveredDate = '';
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
                  filterStore.state.takeOverId = '';
                }
              "
            >
              <select
                class="filter-select"
                v-model="filterStore.state.takeOverId"
                @change="boughtItemsStore.get()"
              >
                <option
                  v-for="option in availableOptionsUsers"
                  :key="option"
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
              v-if="
                !controlsStore.state.unclutter &&
                !controlsStore.state.requestView
              "
              @contextmenu.prevent="
                () => {
                  filterStore.state.storagePlace = '';
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
            v-on:click="
              multiSelect($event, item.id, index),
                setExpectedDeliveryDate(item.expected_delivery_date),
                setDesiredDeliveryDate(item.desired_delivery_date)
            "
            v-bind:class="{
              selected: props.selectedItemIds.includes(item.id),
              open: controlsStore.state.rainbow && item.status == 'open',
              requested:
                controlsStore.state.rainbow && item.status == 'requested',
              ordered: controlsStore.state.rainbow && item.status == 'ordered',
              late: controlsStore.state.rainbow && item.status == 'late',
              partial: controlsStore.state.rainbow && item.status == 'partial',
              delivered:
                controlsStore.state.rainbow && item.status == 'delivered',
              canceled:
                controlsStore.state.rainbow && item.status == 'canceled',
              lost: controlsStore.state.rainbow && item.status == 'lost',
            }"
          >
            <td id="number" class="sticky-col">
              <IconBellRing v-if="item.high_priority" class="bell-icon" />
              <span v-else>{{ index + 1 }}</span>
            </td>
            <td
              id="item-id"
              class="sticky-col"
              @contextmenu.prevent="
                () => {
                  filterStore.state.id = item.id;
                }
              "
            >
              {{ item.id }}
            </td>
            <td
              id="status"
              class="sticky-col"
              @contextmenu.prevent="
                () => {
                  filterStore.status = item.status;
                }
              "
            >
              <Spinner v-if="statusStore.loading" />
              <select
                v-else-if="
                  (userStore.is_superuser || userStore.is_adminuser) &&
                  controlsStore.state.textOnly == false
                "
                class="cell-select"
                v-model="item.status"
                @change="updateStatus(item.status)"
              >
                <option
                  v-for="option in availableOptionsStatus"
                  :key="option"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
              <div v-else>
                {{ item.status.toUpperCase() }}
              </div>
            </td>
            <td
              id="project"
              class="sticky-col"
              @contextmenu.prevent="
                () => {
                  filterStore.state.project = item.project;
                }
              "
            >
              <div
                v-if="
                  (userStore.is_superuser || userStore.is_adminuser) &&
                  props.selectedItemIds.includes(item.id) &&
                  controlsStore.state.textOnly == false
                "
              >
                <input
                  class="cell-input"
                  v-model="item.project"
                  type="text"
                  @focusin="pauseFetchBoughtItems(true)"
                  @focusout="
                    updateProject(item.project), pauseFetchBoughtItems(false)
                  "
                  v-on:keyup.enter="
                    looseFocus($event), pauseFetchBoughtItems(false)
                  "
                />
              </div>
              <div
                v-else
                v-bind:class="{ 'fix-height': controlsStore.state.fixedHeight }"
              >
                {{ item.project }}
              </div>
            </td>
            <td
              id="machine"
              class="sticky-col"
              @contextmenu.prevent="
                () => {
                  filterStore.state.machine = item.machine;
                }
              "
            >
              <div
                v-if="
                  (userStore.is_superuser || userStore.is_adminuser) &&
                  props.selectedItemIds.includes(item.id) &&
                  controlsStore.state.textOnly == false
                "
              >
                <input
                  class="cell-input"
                  v-model="item.machine"
                  type="text"
                  @focusin="pauseFetchBoughtItems(true)"
                  @focusout="
                    updateMachine(item.machine), pauseFetchBoughtItems(false)
                  "
                  v-on:keyup.enter="
                    looseFocus($event), pauseFetchBoughtItems(false)
                  "
                />
              </div>
              <div
                v-else
                v-bind:class="{ 'fix-height': controlsStore.state.fixedHeight }"
              >
                {{ item.machine }}
              </div>
            </td>
            <td
              id="quantity"
              class="sticky-col"
              @contextmenu.prevent="
                () => {
                  filterStore.state.quantity = item.quantity;
                }
              "
            >
              <div
                v-if="
                  (userStore.is_superuser || userStore.is_adminuser) &&
                  props.selectedItemIds.includes(item.id) &&
                  controlsStore.state.textOnly == false
                "
              >
                <input
                  class="cell-input"
                  v-model="item.quantity"
                  type="number"
                  @focusin="pauseFetchBoughtItems(true)"
                  @focusout="
                    updateQuantity(item.quantity), pauseFetchBoughtItems(false)
                  "
                  v-on:keyup.enter="
                    looseFocus($event), pauseFetchBoughtItems(false)
                  "
                />
              </div>
              <div
                v-else
                v-bind:class="{ 'fix-height': controlsStore.state.fixedHeight }"
              >
                {{ item.quantity }}
              </div>
            </td>
            <td
              id="unit"
              class="sticky-col"
              @contextmenu.prevent="
                () => {
                  filterStore.state.unit = item.unit;
                }
              "
            >
              <div
                v-bind:class="{ 'fix-height': controlsStore.state.fixedHeight }"
              >
                {{ item.unit }}
              </div>
            </td>
            <td
              id="partnumber"
              class="sticky-col"
              @contextmenu.prevent="
                () => {
                  filterStore.state.partnumber = item.partnumber;
                }
              "
            >
              <div
                v-if="
                  (userStore.is_superuser || userStore.is_adminuser) &&
                  props.selectedItemIds.includes(item.id) &&
                  controlsStore.state.textOnly == false
                "
              >
                <input
                  class="cell-input"
                  v-model="item.partnumber"
                  type="text"
                  @focusin="pauseFetchBoughtItems(true)"
                  @focusout="
                    updatePartnumber(item.partnumber),
                      pauseFetchBoughtItems(false)
                  "
                  v-on:keyup.enter="
                    looseFocus($event), pauseFetchBoughtItems(false)
                  "
                />
              </div>
              <div
                v-else
                v-bind:class="{ 'fix-height': controlsStore.state.fixedHeight }"
              >
                {{ item.partnumber }}
              </div>
            </td>
            <td
              id="definition"
              @contextmenu.prevent="
                () => {
                  filterStore.state.definition = item.definition;
                }
              "
            >
              <div
                v-if="
                  (userStore.is_superuser || userStore.is_adminuser) &&
                  props.selectedItemIds.includes(item.id) &&
                  controlsStore.state.textOnly == false
                "
              >
                <input
                  class="cell-input"
                  v-model="item.definition"
                  type="text"
                  @focusin="pauseFetchBoughtItems(true)"
                  @focusout="
                    updateDefinition(item.definition),
                      pauseFetchBoughtItems(false)
                  "
                  v-on:keyup.enter="
                    looseFocus($event), pauseFetchBoughtItems(false)
                  "
                />
              </div>
              <div
                v-else
                v-bind:class="{ 'fix-height': controlsStore.state.fixedHeight }"
              >
                {{ item.definition }}
              </div>
            </td>
            <td
              id="manufacturer"
              @contextmenu.prevent="
                () => {
                  filterStore.state.manufacturer = item.manufacturer;
                }
              "
            >
              <div
                v-if="
                  (userStore.is_superuser || userStore.is_adminuser) &&
                  props.selectedItemIds.includes(item.id) &&
                  controlsStore.state.textOnly == false
                "
              >
                <input
                  class="cell-input"
                  v-model="item.manufacturer"
                  type="text"
                  @focusin="pauseFetchBoughtItems(true)"
                  @focusout="
                    updateManufacturer(item.manufacturer),
                      pauseFetchBoughtItems(false)
                  "
                  v-on:keyup.enter="
                    looseFocus($event), pauseFetchBoughtItems(false)
                  "
                />
              </div>
              <div
                v-else
                v-bind:class="{ 'fix-height': controlsStore.state.fixedHeight }"
              >
                {{ item.manufacturer }}
              </div>
            </td>
            <td
              id="supplier"
              @contextmenu.prevent="
                () => {
                  filterStore.state.supplier = item.supplier;
                }
              "
            >
              <div
                v-if="
                  (userStore.is_superuser || userStore.is_adminuser) &&
                  props.selectedItemIds.includes(item.id) &&
                  controlsStore.state.textOnly == false
                "
              >
                <input
                  class="cell-input"
                  v-model="item.supplier"
                  type="text"
                  @focusin="pauseFetchBoughtItems(true)"
                  @focusout="
                    updateSupplier(item.supplier), pauseFetchBoughtItems(false)
                  "
                  v-on:keyup.enter="
                    looseFocus($event), pauseFetchBoughtItems(false)
                  "
                />
              </div>
              <div
                v-else
                v-bind:class="{ 'fix-height': controlsStore.state.fixedHeight }"
              >
                {{ item.supplier }}
              </div>
            </td>
            <td
              id="group"
              @contextmenu.prevent="
                () => {
                  filterStore.state.group1 = item.group_1;
                }
              "
            >
              <div
                v-if="
                  (userStore.is_superuser || userStore.is_adminuser) &&
                  props.selectedItemIds.includes(item.id) &&
                  controlsStore.state.textOnly == false
                "
              >
                <input
                  class="cell-input"
                  v-model="item.group_1"
                  type="text"
                  @focusin="pauseFetchBoughtItems(true)"
                  @focusout="
                    updateGroup1(item.group_1), pauseFetchBoughtItems(false)
                  "
                  v-on:keyup.enter="
                    looseFocus($event), pauseFetchBoughtItems(false)
                  "
                />
              </div>
              <div
                v-else
                v-bind:class="{ 'fix-height': controlsStore.state.fixedHeight }"
              >
                {{ item.group_1 }}
              </div>
            </td>
            <td
              id="note-general"
              @contextmenu.prevent="
                () => {
                  filterStore.state.noteGeneral = item.note_general;
                }
              "
            >
              <div
                v-if="
                  (userStore.is_superuser || userStore.is_adminuser) &&
                  props.selectedItemIds.includes(item.id) &&
                  controlsStore.state.textOnly == false
                "
              >
                <textarea
                  class="cell-textarea-note"
                  v-model="item.note_general"
                  type="text"
                  @input="resizeTextarea($event)"
                  @focusin="pauseFetchBoughtItems(true), resizeTextarea($event)"
                  @focusout="
                    updateNoteGeneral(item.note_general),
                      pauseFetchBoughtItems(false)
                  "
                  v-on:keyup.enter="
                    looseFocus($event), pauseFetchBoughtItems(false)
                  "
                ></textarea>
              </div>
              <div
                v-else
                v-bind:class="{ 'fix-height': controlsStore.state.fixedHeight }"
              >
                {{ item.note_general }}
              </div>
            </td>
            <td
              id="note-supplier"
              @contextmenu.prevent="
                () => {
                  filterStore.state.noteSupplier = item.note_supplier;
                }
              "
            >
              <div
                v-if="
                  (userStore.is_superuser || userStore.is_adminuser) &&
                  props.selectedItemIds.includes(item.id) &&
                  controlsStore.state.textOnly == false
                "
              >
                <textarea
                  class="cell-textarea-note"
                  v-model="item.note_supplier"
                  type="text"
                  @input="resizeTextarea($event)"
                  @focusin="pauseFetchBoughtItems(true), resizeTextarea($event)"
                  @focusout="
                    updateNoteSupplier(item.note_supplier),
                      pauseFetchBoughtItems(false)
                  "
                  v-on:keyup.enter="
                    looseFocus($event), pauseFetchBoughtItems(false)
                  "
                ></textarea>
              </div>
              <div
                v-else
                v-bind:class="{ 'fix-height': controlsStore.state.fixedHeight }"
              >
                {{ item.note_supplier }}
              </div>
            </td>
            <td
              id="created"
              v-if="!controlsStore.state.requestView"
              @contextmenu.prevent="
                () => {
                  filterStore.state.createdDate = item.created;
                }
              "
            >
              {{ item.created }}
            </td>
            <td
              id="creator"
              v-if="
                !controlsStore.state.unclutter &&
                !controlsStore.state.requestView
              "
              @contextmenu.prevent="
                () => {
                  filterStore.state.creatorId = item.creator_id;
                }
              "
            >
              <div
                v-bind:class="{ 'fix-height': controlsStore.state.fixedHeight }"
              >
                {{ usersStore.getNameByID(item.creator_id) }}
              </div>
            </td>
            <td
              id="desired"
              @contextmenu.prevent="
                () => {
                  filterStore.state.desiredDate = item.desired_delivery_date;
                }
              "
            >
              <div
                v-if="
                  (userStore.is_superuser || userStore.is_adminuser) &&
                  props.selectedItemIds.includes(item.id) &&
                  controlsStore.state.textOnly == false
                "
              >
                <!-- <Datepicker class="datepicker" v-model="pickedDesiredDate" style="width:75px;text-align:center" /> -->
                <Datepicker
                  class="datepicker"
                  v-model="pickedDesiredDate"
                  @update:model-value="updateDesiredDeliveryDate"
                  style="width: 75px; height: 14px; text-align: center"
                />
              </div>
              <div v-else>
                {{ item.desired_delivery_date }}
              </div>
            </td>
            <td
              id="requested"
              v-if="!controlsStore.state.requestView"
              @contextmenu.prevent="
                () => {
                  filterStore.state.requestedDate = item.requested_date;
                }
              "
            >
              {{ item.requested_date }}
            </td>
            <td
              id="requester"
              v-if="
                !controlsStore.state.unclutter &&
                !controlsStore.state.requestView
              "
              @contextmenu.prevent="
                () => {
                  filterStore.state.requesterId = item.requester_id;
                }
              "
            >
              <div
                v-bind:class="{ 'fix-height': controlsStore.state.fixedHeight }"
              >
                {{ usersStore.getNameByID(item.requester_id) }}
              </div>
            </td>
            <td
              id="ordered"
              v-if="!controlsStore.state.requestView"
              @contextmenu.prevent="
                () => {
                  filterStore.state.orderedDate = item.ordered_date;
                }
              "
            >
              {{ item.ordered_date }}
            </td>
            <td
              id="orderer"
              v-if="
                !controlsStore.state.unclutter &&
                !controlsStore.state.requestView
              "
              @contextmenu.prevent="
                () => {
                  filterStore.state.ordererId = item.orderer_id;
                }
              "
            >
              <div
                v-bind:class="{ 'fix-height': controlsStore.state.fixedHeight }"
              >
                {{ usersStore.getNameByID(item.orderer_id) }}
              </div>
            </td>
            <td
              id="expected"
              v-if="!controlsStore.state.requestView"
              @contextmenu.prevent="
                () => {
                  filterStore.state.expectedDate = item.expected_delivery_date;
                }
              "
            >
              <div
                v-if="
                  (userStore.is_superuser || userStore.is_adminuser) &&
                  props.selectedItemIds.includes(item.id) &&
                  controlsStore.state.textOnly == false
                "
              >
                <!-- <Datepicker class="datepicker" v-model="pickedExpectedDate" style="width:75px;text-align:center" /> -->
                <Datepicker
                  class="datepicker"
                  v-model="pickedExpectedDate"
                  @update:model-value="updateExpectedDeliveryDate"
                  style="width: 75px; height: 14px; text-align: center"
                />
              </div>
              <div v-else>
                {{ item.expected_delivery_date }}
              </div>
            </td>
            <td
              id="delivered"
              v-if="!controlsStore.state.requestView"
              @contextmenu.prevent="
                () => {
                  filterStore.state.deliveredDate = item.delivery_date;
                }
              "
            >
              {{ item.delivery_date }}
            </td>
            <td
              id="taken-over-by"
              v-if="
                !controlsStore.state.unclutter &&
                !controlsStore.state.requestView
              "
              @contextmenu.prevent="
                () => {
                  filterStore.state.takeOverId = item.taken_over_id;
                }
              "
            >
              <div
                v-bind:class="{ 'fix-height': controlsStore.state.fixedHeight }"
              >
                {{ usersStore.getNameByID(item.taken_over_id) }}
              </div>
            </td>
            <td
              id="arrival-weeks"
              v-if="
                !controlsStore.state.unclutter &&
                !controlsStore.state.requestView
              "
            >
              {{ calcDiffInWeeksFromToday(item.expected_delivery_date) }}
            </td>
            <td
              id="total-delivery-weeks"
              v-if="
                !controlsStore.state.unclutter &&
                !controlsStore.state.requestView
              "
            >
              {{ calcDiffInWeeks(item.ordered_date, item.delivery_date) }}
            </td>
            <td
              id="storage-place"
              v-if="
                !controlsStore.state.unclutter &&
                !controlsStore.state.requestView
              "
              @contextmenu.prevent="
                () => {
                  filterStore.state.storagePlace = item.storage_place;
                }
              "
            >
              <div
                v-if="
                  (userStore.is_superuser || userStore.is_adminuser) &&
                  props.selectedItemIds.includes(item.id) &&
                  controlsStore.state.textOnly == false
                "
              >
                <input
                  class="cell-input"
                  v-model="item.storage_place"
                  type="text"
                  @focusin="pauseFetchBoughtItems(true)"
                  @focusout="
                    updateStorage(item.storage_place),
                      pauseFetchBoughtItems(false)
                  "
                  v-on:keyup.enter="
                    looseFocus($event), pauseFetchBoughtItems(false)
                  "
                />
              </div>
              <div
                v-else
                v-bind:class="{ 'fix-height': controlsStore.state.fixedHeight }"
              >
                {{ item.storage_place }}
              </div>
            </td>
          </tr>
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

.bell-icon {
  color: red;
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
  height: 20px;
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

// tr.partial > td {
//   background: rgb(90, 250, 90);
//   background: linear-gradient(
//     0deg,
//     rgba(90, 250, 90, 1) 0%,
//     rgba(240, 230, 70, 1) 50%
//   );
// }

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
  // filter: brightness(1.05);
  background: $table-row-hover !important;
}

tr.selected > td {
  background: $table-row-active !important;
  // background: rgb(160, 220, 255);
  // color: black;
  // font-weight: bold;
}

tr.selected:hover > td {
  background: $table-row-active-hover !important;
  // background: rgb(170, 230, 255);
}

td {
  z-index: 0;
  height: 22px;

  font-size: 14px; //0.8em;

  margin: 0;
  padding: 0;
  // padding-top: 1px;
  // padding-bottom: 1px;
  // margin-left: 2px;
  // margin-right: 2px;

  word-wrap: break-word;
  // border-right: solid thin rgb(220, 220, 220);
  border-bottom: solid thin rgb(100, 100, 100);
  border-right: solid thin $table-head-background;
}

.fix-height {
  // height: 20px;
  // max-height: 20px;
  height: min-content;
  width: 100%; // calc(100% - 5px);

  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
  white-space: nowrap;

  // background-color: aqua;
}

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

  // background: rgb(207, 207, 207);
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

  // background: rgb(207, 207, 207);
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

// columns
#number {
  width: 35px;
  min-width: 35px;
  max-width: 35px;
  left: 0px;
  text-align: center;
}

#item-id {
  width: 45px;
  min-width: 45px;
  max-width: 45px;
  left: 37px;
  text-align: center;
}

#status {
  width: 86px;
  min-width: 86px;
  min-width: 86px;
  left: 84px;
}

#project {
  width: 61px;
  min-width: 61px;
  max-width: 61px;
  left: 172px;
  // text-align: center;
}

#machine {
  width: 61px;
  min-width: 61px;
  max-width: 61px;
  left: 235px;
  // text-align: center;
}

#quantity {
  width: 41px;
  min-width: 41px;
  max-width: 41px;
  left: 298px;
  text-align: center;
}

#unit {
  width: 41px;
  min-width: 41px;
  max-width: 41px;
  left: 341px;
  text-align: center;
}

#partnumber {
  width: 301px;
  min-width: 301px;
  max-width: 301px;
  left: 384px;
}

#definition {
  width: 200px;
  min-width: 200px;
  max-width: 200px;
}

#manufacturer {
  width: 150px;
  min-width: 150px;
  max-width: 150px;
}

#supplier {
  width: 150px;
  min-width: 150px;
  max-width: 150px;
}

#group {
  width: 150px;
  min-width: 150px;
  max-width: 150px;
}

#note-general {
  width: auto;
  min-width: 152px;
  max-width: 252px;
}

#note-supplier {
  width: auto;
  min-width: 152px;
  max-width: 252px;
}

#created {
  width: 81px;
  min-width: 81px;
  max-width: 81px;
  text-align: center;
}

#creator {
  min-width: 121px;
  max-width: 121px;
}

#desired {
  text-align: center;
  min-width: 81px;
  max-width: 81px;
}

#requested {
  text-align: center;
  min-width: 81px;
  max-width: 81px;
}

#requester {
  min-width: 121px;
  max-width: 121px;
}

#ordered {
  text-align: center;
  min-width: 81px;
  max-width: 81px;
}

#orderer {
  min-width: 121px;
  max-width: 121px;
}

#expected {
  text-align: center;
  min-width: 81px;
  max-width: 81px;
}

#delivered {
  text-align: center;
  min-width: 81px;
  max-width: 81px;
}

#taken-over-by {
  min-width: 121px;
  max-width: 121px;
}

#total-delivery-weeks {
  text-align: center;
  min-width: 61px;
  max-width: 61px;
}

#arrival-weeks {
  text-align: center;
  min-width: 61px;
  max-width: 61px;
}

#storage-place {
  min-width: 221px;
  max-width: 221px;
}

// input elements
select {
  padding: 0;
  margin: 0;

  outline: none;
}

input {
  padding: 0;
  margin: 0;
}

.cell-select {
  width: 100%;
  height: 18px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;

  border: none;

  color: white;
  background-color: transparent;

  font-size: 12px; //0.9em;
}

.cell-select > option {
  color: white;
  background-color: $main-background-color-dark-2;
}

.cell-input {
  width: 100%;
  height: 18px;

  box-shadow: none;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;

  color: white;
  background-color: transparent;

  outline: none;
  border: none;
  border-color: inherit;

  font-size: 12.25px;
  // font-size: 13px; //0.9em;
}

.cell-textarea-note {
  width: 100%;
  min-width: 152px;
  max-width: 252px;

  height: 18px;
  min-height: 18px;
  // margin-top: 3px;
  // max-height: 300px;

  overflow: hidden;
  resize: none;

  box-shadow: none;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;

  color: white;

  background-color: transparent;
  outline: none;
  border: none;
  border-color: inherit;

  font-family: Calibri, Arial, Helvetica, sans-serif;
  font-size: 13.5px; //1em;
}

.filter-select {
  width: 100%;
  height: 22px;

  color: white;
  background-color: $main-background-color-dark-2;

  border-width: $main-border-width;
  border-style: $main-border-style;
  border-color: $main-background-color-dark;
  border-radius: $main-border-radius;
  outline: none;

  box-sizing: border-box;

  transition: all 0.2s ease;
}

.filter-select:hover {
  background-color: $main-background-color-hover;
}

.filter-select:focus {
  border-color: $main-color;
}

.filter-select > option {
  color: white;
  background-color: $main-background-color-dark-2;
}

.filter-input {
  width: 100%;
  height: 22px;

  color: white;
  background-color: $main-background-color-dark-2;

  border-width: $main-border-width;
  border-style: $main-border-style;
  border-color: $main-background-color-dark;
  border-radius: $main-border-radius;
  outline: none;

  box-sizing: border-box;

  transition: all 0.2s ease;
}

.filter-input:hover {
  background-color: $main-background-color-hover;
}

.filter-input:focus {
  border-color: $main-color;
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
