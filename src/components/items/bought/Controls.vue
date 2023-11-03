<script setup>
import {
  ref,
  watch,
  computed,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from "vue";
import Toggle from "@vueform/toggle";

import constants from "@/constants";
import router from "@/router/index";
import { useBoughtItemsControlsStore } from "@/stores/controls.js";
import { useBoughtItemFilterStore } from "@/stores/filter.js";
import { useNotificationStore } from "@/stores/notification.js";
import { useUserStore } from "@/stores/user.js";
import { boughtItemsRequest } from "@/requests/items";
import { getFilterParams } from "@/requests/params";

import ExcelImport from "@/components/items/bought/ExcelImport.vue";
import Prompt from "@/components/main/Prompt.vue";
import ButtonItemCreate from "@/components/elements/ButtonItemCreate.vue";
import ButtonEdit from "@/components/elements/ButtonEdit.vue";
import ButtonCopy from "@/components/elements/ButtonCopy.vue";
import ButtonDelete from "@/components/elements/ButtonDelete.vue";
import ButtonExcel from "@/components/elements/ButtonExcel.vue";
import ButtonFilterClear from "@/components/elements/ButtonFilterClear.vue";
import ButtonFilterSave from "@/components/elements/ButtonFilterSave.vue";
import ButtonFilterLoad from "@/components/elements/ButtonFilterLoad.vue";
import ButtonClear from "@/components/elements/ButtonClear.vue";
import DropDownTableView from "@/components/elements/DropDownTableView.vue";
import SelectControls from "@/components/elements/SelectControls.vue";

// Props & Emits
const props = defineProps(["selectedItemIds"]);
const emit = defineEmits([
  "update:selectedItemIds",
  "update:triggerGetNewData",
]);

// Stores
const controlsStore = useBoughtItemsControlsStore();
const filterStore = useBoughtItemFilterStore();
const notificationStore = useNotificationStore();
const userStore = useUserStore();
const is_guestuser = computed(() => userStore.is_guestuser);

// Shows
const showDeletePrompt = ref(false);
const showExcelImport = ref(false);

// Media
const minWidth1 = ref(false);

// Selections
const availableOptionsLimit = [
  { text: "100", value: "100" },
  { text: "500", value: "500" },
  { text: "1000", value: "1000" },
  { text: "All", value: "" },
];
const availableOptionsOrderBy = [
  { text: "ID", value: "id" },
  { text: "Created", value: "created" },
  { text: "Project", value: "project" },
  { text: "Machine", value: "machine" },
  { text: "Group", value: "group1" },
  { text: "Manufacturer", value: "manufacturer" },
  { text: "Supplier", value: "supplier" },
];
const availableOptionsFilterPresets = [
  { text: "None", value: "reset" },
  { text: "All Open", value: "allOpen" },
  { text: "All Requested", value: "allRequested" },
  { text: "All Ordered", value: "allOrdered" },
  { text: "All Active", value: "allActive" },
  { text: "All Prioritized", value: "allPrioritized" },
];
const selectedOptionFilterPreset = ref("");

// const dropDownViewOptions = ref([
//   { "name": "Changelog", "model": controlsStore.changelog },
//   { "name": "Fixed Height", "model": controlsStore.fixedHeight },
// ])

function saveFilter() {
  localStorage.setItem(
    "gladosBoughtItemDataTableMyFilter",
    JSON.stringify(filterStore.$state),
  );
  notificationStore.info = "Saved new filter.";
}

function loadFilter() {
  const filterObject = localStorage.getItem(
    "gladosBoughtItemDataTableMyFilter",
  );
  if (filterObject != null) {
    filterStore.$state = JSON.parse(filterObject);
  }
}

function clearFilter() {
  filterStore.reset();
  console.log("Cleared filter");
}

function onButtonNewItem() {
  router.push({ name: "NewBoughtItem" });
}

function onButtonEdit() {
  if (props.selectedItemIds.length == 0) {
    notificationStore.warning = "Select an item first.";
  } else if (props.selectedItemIds.length != 1) {
    notificationStore.warning = "You can only edit one item.";
  } else {
    router.push(`/items/bought/edit/${props.selectedItemIds[0]}`);
  }
}

function onButtonCopy() {
  if (props.selectedItemIds.length == 0) {
    notificationStore.warning = "Select an item first.";
  } else if (props.selectedItemIds.length != 1) {
    notificationStore.warning = "You can only edit one item.";
  } else {
    router.push(`/items/bought/copy/${props.selectedItemIds[0]}`);
  }
}

function onButtonDelete() {
  if (props.selectedItemIds.length == 0) {
    notificationStore.warning = "Select an item first.";
  } else if (props.selectedItemIds.length != 1) {
    notificationStore.warning = "You can only delete one item.";
  } else {
    showDeletePrompt.value = true;
  }
}

function onButtonDownloadExcel() {
  const params = getFilterParams(filterStore.$state);
  boughtItemsRequest.getItemsExcel(params).then((response) => {
    let blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      url = window.URL.createObjectURL(blob);
    window.open(url);
  });
}

function onButtonUploadExcel() {
  showExcelImport.value = true;
}

function getNewData() {
  emit("update:triggerGetNewData", true);
}

function deleteItem() {
  const itemId = props.selectedItemIds[0];
  boughtItemsRequest.deleteItemsId(itemId).then((response) => {
    if (response.status === 200) {
      notificationStore.info = `Deleted item #${itemId}`;
      getNewData();
    } else {
      notificationStore.warning = response.data.detail;
    }
  });
  showDeletePrompt.value = false;
}

function onButtonClear() {
  emit("update:selectedItemIds", []);
}

function onResize() {
  if (window.innerWidth < constants.minWidth1) {
    minWidth1.value = true;
  } else {
    minWidth1.value = false;
  }
}

watch(selectedOptionFilterPreset, () => {
  const value = selectedOptionFilterPreset.value;
  if (value == "allOpen") {
    filterStore.allOpen();
  } else if (value == "allRequested") {
    filterStore.allRequested();
  } else if (value == "allOrdered") {
    filterStore.allOrdered();
  } else if (value == "allActive") {
    filterStore.allActive();
  } else if (value == "allPrioritized") {
    filterStore.allPrioritized();
  } else {
    filterStore.reset();
  }
});

onMounted(() => {
  onResize();
  nextTick(() => {
    window.addEventListener("resize", onResize);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});
</script>

<template>
  <div class="controls-base-scope">
    <div
      id="item-controls"
      v-if="!is_guestuser"
      class="controls-base-container"
    >
      <ButtonItemCreate
        class="controls-base-element"
        text="New Item"
        v-on:click="onButtonNewItem"
      ></ButtonItemCreate>
      <ButtonExcel
        class="controls-base-element"
        text="Import Excel"
        v-if="!minWidth1"
        v-on:click="onButtonUploadExcel"
      ></ButtonExcel>
      <ButtonExcel
        v-if="!minWidth1"
        class="controls-base-element"
        text="Export Excel"
        v-on:click="onButtonDownloadExcel"
      ></ButtonExcel>
      <ButtonEdit
        class="controls-base-element"
        text="Edit Item"
        v-on:click="onButtonEdit"
      ></ButtonEdit>
      <ButtonCopy
        class="controls-base-element"
        text="Copy Item"
        v-on:click="onButtonCopy"
      ></ButtonCopy>
      <ButtonDelete
        class="controls-base-element"
        text="Delete Item"
        v-on:click="onButtonDelete"
      ></ButtonDelete>
      <ButtonClear
        class="controls-base-element"
        text="Unselect"
        v-on:click="onButtonClear"
      ></ButtonClear>
    </div>
    <div id="filter-controls" class="controls-base-container">
      <DropDownTableView
        class="controls-base-element"
        text="Views"
        :hide-when-clicked="false"
      >
        <div class="drop-down-toggle-item">
          <Toggle v-model="filterStore.ignoreDelivered"></Toggle
          ><span class="drop-down-toggle-item-text">Ignore Delivered</span>
        </div>
        <div class="drop-down-toggle-item">
          <Toggle v-model="filterStore.ignoreCanceled"></Toggle
          ><span class="drop-down-toggle-item-text">Ignore Canceled</span>
        </div>
        <div class="drop-down-toggle-item">
          <Toggle v-model="filterStore.ignoreLost"></Toggle
          ><span class="drop-down-toggle-item-text">Ignore Lost</span>
        </div>
        <div class="drop-down-toggle-item">
          <Toggle v-model="controlsStore.fixedHeight"></Toggle
          ><span class="drop-down-toggle-item-text">Fixed Height</span>
        </div>
        <div class="drop-down-toggle-item">
          <Toggle v-model="controlsStore.unclutter"></Toggle
          ><span class="drop-down-toggle-item-text">Unclutter</span>
        </div>
        <div class="drop-down-toggle-item">
          <Toggle v-model="controlsStore.requestView"></Toggle
          ><span class="drop-down-toggle-item-text">Request View</span>
        </div>
        <div class="drop-down-toggle-item">
          <Toggle v-model="controlsStore.changelog"></Toggle
          ><span class="drop-down-toggle-item-text">Changelog</span>
        </div>
        <div class="drop-down-toggle-item">
          <Toggle v-model="controlsStore.rainbow"></Toggle
          ><span class="drop-down-toggle-item-text">Rainbow</span>
        </div>
        <div class="drop-down-toggle-item">
          <Toggle v-model="controlsStore.textOnly"></Toggle
          ><span class="drop-down-toggle-item-text">Text Only</span>
        </div>
      </DropDownTableView>

      <ButtonFilterSave
        class="controls-base-element"
        text="Save Filter"
        v-on:click="saveFilter"
      ></ButtonFilterSave>
      <ButtonFilterLoad
        class="controls-base-element"
        text="Load Filter"
        v-on:click="loadFilter"
      ></ButtonFilterLoad>
      <ButtonFilterClear
        class="controls-base-element"
        text="Clear Filter"
        v-on:click="clearFilter"
      ></ButtonFilterClear>

      <SelectControls
        class="controls-base-element"
        text="Limit"
        v-model:selection="filterStore.limit"
        :options="availableOptionsLimit"
      ></SelectControls>
      <SelectControls
        class="controls-base-element"
        text="Sort By"
        v-model:selection="filterStore.sortBy"
        :options="availableOptionsOrderBy"
      ></SelectControls>
      <SelectControls
        class="controls-base-element"
        text="Preset"
        v-model:selection="selectedOptionFilterPreset"
        :options="availableOptionsFilterPresets"
      ></SelectControls>
    </div>
  </div>

  <Prompt
    text="Delete item?"
    at-mouse
    yes-is-danger
    v-model:show="showDeletePrompt"
    v-bind:on-yes="deleteItem"
    v-bind:on-no="
      () => {
        showDeletePrompt = false;
      }
    "
  />
  <ExcelImport
    v-bind:on-success="getNewData"
    v-model:show-uploader="showExcelImport"
  />
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/controls/controlsBase.scss";
</style>
