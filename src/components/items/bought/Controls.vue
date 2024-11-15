<script setup lang="ts">
import { ref, watch, computed, onBeforeMount } from "vue";
import Toggle from "@vueform/toggle/dist/toggle.js";

import router from "@/router/index";
import { useBoughtItemsControlsStore } from "@/stores/controls";
import { useBoughtItemFilterStore } from "@/stores/filter";
import { useBoughtItemsStore } from "@/stores/boughtItems";
import { useNotificationStore } from "@/stores/notification";
import { useUserStore } from "@/stores/user";
import { useResolutionStore } from "@/stores/resolution";
import { boughtItemsRequest } from "@/requests/items";
import { getBoughtItemsFilterParams } from "@/requests/params";
import { camelToTitle } from "@/helper/string.helper";

import ExcelImport from "@/components/items/bought/ExcelImport.vue";
import Prompt from "@/components/main/Prompt.vue";
import ButtonItemCreate from "@/components/elements/ButtonItemCreate.vue";
import ButtonEdit from "@/components/elements/ButtonEdit.vue";
import ButtonCopy from "@/components/elements/ButtonCopy.vue";
import ButtonDelete from "@/components/elements/ButtonDelete.vue";
import ButtonExcel from "@/components/elements/ButtonExcel.vue";
import ButtonSync from "@/components/elements/ButtonSync.vue";
import ButtonSyncOff from "@/components/elements/ButtonSyncOff.vue";
import ButtonFilterClear from "@/components/elements/ButtonFilterClear.vue";
import ButtonFilterSave from "@/components/elements/ButtonFilterSave.vue";
import ButtonFilterLoad from "@/components/elements/ButtonFilterLoad.vue";
import ButtonClear from "@/components/elements/ButtonClear.vue";
import ButtonShowInitial from "@/components/elements/ButtonShowInitial.vue";
import DropDownTableView from "@/components/elements/DropDownTableView.vue";
import DropDownTableColumns from "@/components/elements/DropDownTableColumns.vue";
import SelectPreText from "@/components/elements/SelectPreText.vue";

import type { AvailableOption } from "@/models/controls";

// Stores
const boughtItemsStore = useBoughtItemsStore();
const controlsStore = useBoughtItemsControlsStore();
const filterStore = useBoughtItemFilterStore();
const notificationStore = useNotificationStore();
const resolutionStore = useResolutionStore();
const userStore = useUserStore();

const is_guestuser = computed<boolean>(() => userStore.user.is_guestuser);
const gtMinWidthDesktop = computed<boolean>(
  () => resolutionStore.gtMinWidthDesktop,
);
const gtMinWidthTablet = computed<boolean>(
  () => resolutionStore.gtMinWidthTablet,
);

// Shows
const showDeletePrompt = ref<boolean>(false);
const showExcelImport = ref<boolean>(false);

// Buttons
const buttonItemCreateText = computed<string>(() => {
  return gtMinWidthTablet.value ? "New Item" : "";
});
const buttonItemEditText = computed<string>(() => {
  return gtMinWidthTablet.value ? "Edit Item" : "";
});
const buttonItemCopyText = computed<string>(() => {
  return gtMinWidthTablet.value ? "Copy Item" : "";
});
const buttonSyncText = computed<string>(() => {
  return gtMinWidthTablet.value ? "Sync" : "";
});
const buttonViewsText = computed<string>(() => {
  return gtMinWidthTablet.value ? "Views" : "";
});
const buttonColumnsText = computed<string>(() => {
  return gtMinWidthTablet.value ? "Columns" : "";
});
const buttonClearFilterText = computed<string>(() => {
  return gtMinWidthTablet.value ? "Clear Filter" : "";
});

// Selections
const availableOptionsLimit: Array<AvailableOption> = [
  { text: "50", value: "50" },
  { text: "100", value: "100" },
  { text: "250", value: "250" },
  { text: "500", value: "500" },
];
const availableOptionsOrderBy: Array<AvailableOption> = [
  { text: "ID", value: "id" },
  { text: "Created", value: "created" },
  { text: "Project", value: "project" },
  { text: "Product", value: "productNumber" },
  { text: "Group", value: "group1" },
  { text: "Manufacturer", value: "manufacturer" },
  { text: "Supplier", value: "supplier" },
];
const availableOptionsFilterPresets = computed<Array<AvailableOption>>(() => {
  let presets = [];
  for (const key in filterStore.presets) {
    presets.push({ text: camelToTitle(key), value: key });
  }
  return presets;
});
const selectedOptionFilterPreset = ref<string>("");

function saveFilter() {
  filterStore.saveMy();
  boughtItemsStore.getItems();
  notificationStore.addInfo("Saved new filter.");
}

function loadFilter() {
  filterStore.loadMy();
  boughtItemsStore.getItems();
}

function clearFilter() {
  selectedOptionFilterPreset.value = "";
  filterStore.reset();
  boughtItemsStore.getItems();
  console.log("Cleared filter");
}

function onButtonNewItem() {
  router.push({ name: "NewBoughtItem" });
}

function onButtonEdit() {
  if (boughtItemsStore.getSelection().length == 0) {
    notificationStore.addWarn("Select an item first.");
  } else if (boughtItemsStore.getSelection().length != 1) {
    notificationStore.addWarn("You can only edit one item.");
  } else {
    router.push(`/items/bought/edit/${boughtItemsStore.getSelection()[0]}`);
  }
}

function onButtonCopy() {
  if (boughtItemsStore.getSelection().length == 0) {
    notificationStore.addWarn("Select an item first.");
  } else if (boughtItemsStore.getSelection().length != 1) {
    notificationStore.addWarn("You can only edit one item.");
  } else {
    router.push(`/items/bought/copy/${boughtItemsStore.getSelection()[0]}`);
  }
}

function onButtonDelete() {
  if (boughtItemsStore.getSelection().length == 0) {
    notificationStore.addWarn("Select an item first.");
  } else if (boughtItemsStore.getSelection().length != 1) {
    notificationStore.addWarn("You can only delete one item.");
  } else {
    showDeletePrompt.value = true;
  }
}

function onButtonDownloadExcel() {
  const params = getBoughtItemsFilterParams(filterStore.state);
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

function deleteItem() {
  const itemId = boughtItemsStore.getSelection()[0];
  boughtItemsRequest.deleteItemsId(itemId).then((response) => {
    if (response.status === 200) {
      notificationStore.addInfo(`Deleted item #${itemId}`);
      boughtItemsStore.getItems();
    } else {
      notificationStore.addWarn(response.data.detail);
    }
  });
  showDeletePrompt.value = false;
}

function onButtonClear() {
  boughtItemsStore.clearSelection();
  boughtItemsStore.getItems();
}

function setupMobileView() {
  if (!gtMinWidthTablet.value) {
    controlsStore.state.lockCols = false;
  }
}

function setupTabletView() {
  if (!gtMinWidthDesktop.value) {
    controlsStore.state.lockCols = false;
  }
}

watch(selectedOptionFilterPreset, () => {
  const name = selectedOptionFilterPreset.value;
  filterStore.applyPreset(name);
  boughtItemsStore.getItems();
});

watch(gtMinWidthTablet, () => {
  setupMobileView();
});

watch(gtMinWidthDesktop, () => {
  setupTabletView();
});

onBeforeMount(setupMobileView);
onBeforeMount(setupTabletView);
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
        v-model:text="buttonItemCreateText"
        v-on:click="onButtonNewItem"
      />
      <ButtonExcel
        class="controls-base-element"
        text="Import Excel"
        v-if="gtMinWidthDesktop"
        v-on:click="onButtonUploadExcel"
      />
      <ButtonExcel
        v-if="gtMinWidthDesktop"
        class="controls-base-element"
        text="Export Excel"
        v-on:click="onButtonDownloadExcel"
      />
      <ButtonEdit
        class="controls-base-element"
        v-model:text="buttonItemEditText"
        v-on:click="onButtonEdit"
      />
      <ButtonCopy
        class="controls-base-element"
        v-model:text="buttonItemCopyText"
        v-on:click="onButtonCopy"
      />
      <ButtonDelete
        v-if="gtMinWidthTablet"
        class="controls-base-element"
        text="Delete Item"
        v-on:click="onButtonDelete"
      />
      <ButtonClear
        class="controls-base-element"
        text="Unselect"
        v-on:click="onButtonClear"
      />
    </div>
    <div id="filter-controls" class="controls-base-container">
      <ButtonSyncOff
        v-if="boughtItemsStore.paused"
        class="controls-base-element"
        v-model:text="buttonSyncText"
      />

      <ButtonSync
        v-else
        class="controls-base-element"
        v-model:text="buttonSyncText"
        v-model:rotate="boughtItemsStore.loading"
        v-on:click="boughtItemsStore.getItems()"
      />

      <DropDownTableView
        class="controls-base-element"
        v-model:text="buttonViewsText"
        :hide-when-clicked="false"
      >
        <div class="drop-down-toggle-item">
          <Toggle
            v-model="filterStore.state.ignoreDelivered"
            @change="boughtItemsStore.getItems()"
          />
          <span class="drop-down-toggle-item-text">Ignore Delivered</span>
        </div>
        <div class="drop-down-toggle-item">
          <Toggle
            v-model="filterStore.state.ignoreCanceled"
            @change="boughtItemsStore.getItems()"
          />
          <span class="drop-down-toggle-item-text">Ignore Canceled</span>
        </div>
        <div class="drop-down-toggle-item">
          <Toggle
            v-model="filterStore.state.ignoreLost"
            @change="boughtItemsStore.getItems()"
          />
          <span class="drop-down-toggle-item-text">Ignore Lost</span>
        </div>

        <hr />

        <div
          v-for="(value, key) in controlsStore.state"
          v-bind:key="key"
          class="drop-down-toggle-item"
        >
          <Toggle v-model="controlsStore.state[key]" />
          <span class="drop-down-toggle-item-text">{{
            camelToTitle(key)
          }}</span>
        </div>
      </DropDownTableView>

      <DropDownTableColumns
        class="controls-base-element"
        v-model:text="buttonColumnsText"
        :hide-when-clicked="false"
      >
        <div class="drop-down-button-item">
          <ButtonShowInitial
            text="Show All"
            v-on:click="controlsStore.enableAllColumns()"
          />
        </div>

        <div
          v-for="(value, key) in controlsStore.columns"
          v-bind:key="key"
          class="drop-down-toggle-item"
        >
          <Toggle v-model="controlsStore.columns[key]" />
          <span class="drop-down-toggle-item-text">{{
            camelToTitle(key)
          }}</span>
        </div>
      </DropDownTableColumns>

      <ButtonFilterSave
        v-if="gtMinWidthDesktop"
        class="controls-base-element"
        text="Save Filter"
        v-on:click="saveFilter"
      />
      <ButtonFilterLoad
        v-if="gtMinWidthDesktop"
        class="controls-base-element"
        text="Load Filter"
        v-on:click="loadFilter"
      />
      <ButtonFilterClear
        class="controls-base-element"
        v-model:text="buttonClearFilterText"
        v-on:click="clearFilter"
      />

      <SelectPreText
        v-if="gtMinWidthDesktop"
        class="controls-base-element"
        text="Limit"
        v-model:selection="filterStore.state.limit"
        v-on:update:selection="boughtItemsStore.getItems()"
        :options="availableOptionsLimit"
      />
      <SelectPreText
        v-if="gtMinWidthTablet"
        class="controls-base-element"
        text="Sort By"
        v-model:selection="filterStore.state.sortBy"
        v-on:update:selection="boughtItemsStore.getItems()"
        :options="availableOptionsOrderBy"
      />
      <SelectPreText
        class="controls-base-element"
        text="Preset"
        v-model:selection="selectedOptionFilterPreset"
        v-on:update:selection="boughtItemsStore.getItems()"
        :options="availableOptionsFilterPresets"
      />
    </div>
  </div>

  <Prompt
    text="Delete item?"
    yes-is-danger
    v-bind:at-mouse="gtMinWidthDesktop"
    v-model:show="showDeletePrompt"
    v-bind:on-yes="deleteItem"
    v-bind:on-no="
      () => {
        showDeletePrompt = false;
      }
    "
  />
  <ExcelImport
    v-bind:on-success="boughtItemsStore.getItems"
    v-model:show-uploader="showExcelImport"
  />
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/controls/controlsBase.scss";
</style>
