<script setup>
import { ref, watch } from "vue"
import Toggle from "@vueform/toggle"

import router from "@/router/index"
import { useBoughtItemsControlsStore } from "@/stores/controls.js"
import { useBoughtItemFilterStore } from "@/stores/filter.js"
import { useNotificationStore } from "@/stores/notification.js"
import { boughtItemsRequest } from "@/requests/items"
import { getFilterParams } from "@/requests/params"

import ExcelImport from "@/components/items/bought/ExcelImport.vue"
import Prompt from "@/components/main/Prompt.vue"
import ButtonItemCreate from "@/components/elements/ButtonItemCreate.vue"
import ButtonEdit from "@/components/elements/ButtonEdit.vue"
import ButtonCopy from "@/components/elements/ButtonCopy.vue"
import ButtonDelete from "@/components/elements/ButtonDelete.vue"
import ButtonExcel from "@/components/elements/ButtonExcel.vue"
import ButtonFilterClear from "@/components/elements/ButtonFilterClear.vue"
import ButtonFilterSave from "@/components/elements/ButtonFilterSave.vue"
import ButtonFilterLoad from "@/components/elements/ButtonFilterLoad.vue"
import SelectControls from "@/components/elements/SelectControls.vue"

// Props & Emits
const props = defineProps(["selectedItemIds"])
const emit = defineEmits(["update:triggerGetNewData"])

// Stores
const controlsStore = useBoughtItemsControlsStore()
const filterStore = useBoughtItemFilterStore()
const notificationStore = useNotificationStore()

// Props & emits
const showDeletePrompt = ref(false)
const showExcelImport = ref(false)

// Selections
const availableOptionsLimit = [
  { text: "100", value: "100" },
  { text: "500", value: "500" },
  { text: "1000", value: "1000" },
  { text: "All", value: "" },
]
const availableOptionsOrderBy = [
  { text: "ID", value: "id" },
  { text: "Created", value: "created" },
  { text: "Project", value: "project" },
  { text: "Machine", value: "machine" },
  { text: "Group", value: "group1" },
  { text: "Manufacturer", value: "manufacturer" },
  { text: "Supplier", value: "supplier" },
]
const availableOptionsFilterPresets = [
  { text: "None", value: "reset" },
  { text: "All Open", value: "allOpen" },
  { text: "All Requested", value: "allRequested" },
  { text: "All Ordered", value: "allOrdered" },
  { text: "All Active", value: "allActive" },
  { text: "All Prioritized", value: "allPrioritized" }
]
const selectedOptionFilterPreset = ref("")

function saveFilter() {
  localStorage.setItem("gladosBoughtItemDataTableMyFilter", JSON.stringify(filterStore.$state))
  notificationStore.info = "Saved new filter."
}

function loadFilter() {
  const filterObject = localStorage.getItem("gladosBoughtItemDataTableMyFilter")
  if (filterObject != null) {
    filterStore.$state = JSON.parse(filterObject)
  }
}

function clearFilter() {
  filterStore.reset()
  console.log("Cleared filter")
}

function onButtonNewItem() {
  router.push({ name: "NewBoughtItem" })
}

function onButtonEdit() {
  if (props.selectedItemIds.length == 0) {
    notificationStore.warning = "Select an item first."
  }
  else if (props.selectedItemIds.length != 1) {
    notificationStore.warning = "You can only edit one item."
  } else {
    router.push(`/items/bought/edit/${props.selectedItemIds[0]}`)
  }
}

function onButtonCopy() {
  if (props.selectedItemIds.length == 0) {
    notificationStore.warning = "Select an item first."
  }
  else if (props.selectedItemIds.length != 1) {
    notificationStore.warning = "You can only edit one item."
  } else {
    router.push(`/items/bought/copy/${props.selectedItemIds[0]}`)
  }
}

function onButtonDelete() {
  if (props.selectedItemIds.length == 0) {
    notificationStore.warning = "Select an item first."
  }
  else if (props.selectedItemIds.length != 1) {
    notificationStore.warning = "You can only delete one item."
  } else {
    showDeletePrompt.value = true
  }
}

function onButtonDownloadExcel() {
  const params = getFilterParams(filterStore.$state)
  boughtItemsRequest.getItemsExcel(params).then(response => {
    let blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
      url = window.URL.createObjectURL(blob)
    window.open(url)
  })
}

function onButtonUploadExcel() {
  showExcelImport.value = true;
}

function getNewData() {
  emit("update:triggerGetNewData", true)
}

function deleteItem() {
  const itemId = props.selectedItemIds[0]
  boughtItemsRequest.deleteItemsId(itemId).then(response => {
    if (response.status === 200) {
      notificationStore.info = `Deleted item #${itemId}`
      getNewData()
    } else {
      notificationStore.warning = response.data.detail
    }
  })
  showDeletePrompt.value = false
}

watch(selectedOptionFilterPreset, () => {
  const value = selectedOptionFilterPreset.value
  if (value == "allOpen") {
    filterStore.allOpen()
  } else if (value == "allRequested") {
    filterStore.allRequested()
  } else if (value == "allOrdered") {
    filterStore.allOrdered()
  } else if (value == "allActive") {
    filterStore.allActive()
  } else if (value == "allPrioritized") {
    filterStore.allPrioritized()
  } else {
    filterStore.reset()
  }
})
</script>

<template>
  <div class="scope">
    <div class="container">
      <div id="grid">
        <!-- AREA PLACEHOLDER -->
        <div id="placeholder" class="grid-item-center">
          <!-- Selected IDs: {{ props.selectedItemIds }} -->
        </div>

        <!-- AREA NEW -->
        <div id="new-1" class="grid-item-center">
          <ButtonExcel text="Export Excel" v-on:click="onButtonDownloadExcel"></ButtonExcel>
        </div>
        <div id="new-2" class="grid-item-center">
          <ButtonExcel text="Import Excel" v-on:click="onButtonUploadExcel"></ButtonExcel>
        </div>
        <div id="new-3" class="grid-item-center">
          <ButtonItemCreate text="New Item" v-on:click="onButtonNewItem"></ButtonItemCreate>
        </div>

        <!-- AREA EDIT -->
        <div id="edit-1" class="grid-item-center">
          <ButtonDelete text="Delete Item" v-on:click="onButtonDelete"></ButtonDelete>
        </div>
        <div id="edit-2" class="grid-item-center">
            <ButtonCopy text="Copy Item" v-on:click="onButtonCopy"></ButtonCopy>
        </div>
        <div id="edit-3" class="grid-item-center">
          <ButtonEdit text="Edit Item" v-on:click="onButtonEdit"></ButtonEdit>
        </div>

        <!-- AREA FILTER -->
        <div id="filter-1" class="grid-item-center">
          <ButtonFilterSave text="Save Filter" v-on:click="saveFilter"></ButtonFilterSave>
        </div>
        <div id="filter-2" class="grid-item-center">
          <ButtonFilterLoad text="Load Filter" v-on:click="loadFilter"></ButtonFilterLoad>
        </div>
        <div id="filter-3" class="grid-item-center">
          <ButtonFilterClear text="Clear Filter" v-on:click="clearFilter"></ButtonFilterClear>
        </div>


        <!-- AREA LIMIT & SORT -->
        <div id="limit" class="grid-item-center">
          <SelectControls v-model:selection="filterStore.limit" :options="availableOptionsLimit"></SelectControls>
        </div>
        <div id="limit-text" class="grid-item-left">
          Limit
        </div>
        <div id="sort-by" class="grid-item-center">
          <SelectControls v-model:selection="filterStore.sortBy" :options="availableOptionsOrderBy"></SelectControls>
        </div>
        <div id="sort-by-text" class="grid-item-left">
          Order by
        </div>
        <div id="preset-filters" class="grid-item-center">
          <SelectControls v-model:selection="selectedOptionFilterPreset" :options="availableOptionsFilterPresets"></SelectControls>
        </div>
        <div id="preset-filters-text" class="grid-item-left">
          Presets
        </div>

        <!-- AREA TOGGLE -->
        <div id="toggle-1" class="grid-item-center">
          <Toggle v-model="filterStore.ignoreDelivered"></Toggle>
        </div>
        <div id="toggle-1-text" class="grid-item-left">
          Hide Delivered
        </div>
        <div id="toggle-2" class="grid-item-center">
          <Toggle v-model="filterStore.ignoreCanceled"></Toggle>
        </div>
        <div id="toggle-2-text" class="grid-item-left">
          Hide Canceled
        </div>
        <div id="toggle-3" class="grid-item-center">
          <Toggle v-model="filterStore.ignoreLost"></Toggle>
        </div>
        <div id="toggle-3-text" class="grid-item-left">
          Hide Lost
        </div>

        <div id="toggle-4" class="grid-item-center">
          <Toggle v-model="controlsStore.fixedHeight"></Toggle>
        </div>
        <div id="toggle-4-text" class="grid-item-left">
          Fixed Height
        </div>
        <div id="toggle-5" class="grid-item-center">
          <Toggle v-model="controlsStore.unclutter"></Toggle>
        </div>
        <div id="toggle-5-text" class="grid-item-left">
          Unclutter
        </div>
        <div id="toggle-6" class="grid-item-center">
          <Toggle v-model="controlsStore.requestView"></Toggle>
        </div>
        <div id="toggle-6-text" class="grid-item-left">
          Request View
        </div>

        <div id="toggle-7" class="grid-item-center">
          <Toggle v-model="controlsStore.changelog"></Toggle>
        </div>
        <div id="toggle-7-text" class="grid-item-left">
          Changelog
        </div>
        <div id="toggle-8" class="grid-item-center">
          <Toggle v-model="controlsStore.rainbow"></Toggle>
        </div>
        <div id="toggle-8-text" class="grid-item-left">
          Rainbow
        </div>
        <div id="toggle-9" class="grid-item-center">
          <Toggle v-model="controlsStore.textOnly"></Toggle>
        </div>
        <div id="toggle-9-text" class="grid-item-left">
          Text Only
        </div>
      </div>
    </div>
  </div>

  <Prompt 
    text="Delete item?"
    at-mouse
    yes-is-danger
    v-model:show="showDeletePrompt"
    v-bind:on-yes="deleteItem"
    v-bind:on-no="() => { showDeletePrompt = false }" />
  <ExcelImport 
    v-bind:on-success="getNewData" 
    v-model:show-uploader="showExcelImport" />
</template>

<style scoped lang='scss'>
@import '@/scss/variables.scss';

.scope {
  width: 100%;
  height: 100%;
  cursor: default;

  margin: 0;
  padding: 0;

  font-family: 'Play', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 0.9em;
}

.container {
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;

  border-width: 1px;
  border-style: solid;
  border-color: $main-color;
  border-radius: 5px;
}

.grid-item-left {
  display: flex;
  justify-content: left;
  align-items: center;
}

.grid-item-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

#grid {
  width: 100%;
  height: 100%;

  display: grid;
  grid-gap: 5px;
  grid-template-rows: 35px 35px 35px;
  grid-template-columns: 135px 135px 135px 135px 100px auto 50px 100px 50px 100px 50px 100px;
  grid-template-areas: "new-1 edit-1 filter-1 preset-filters preset-filters-text placeholder toggle-1 toggle-1-text toggle-4 toggle-4-text toggle-7 toggle-7-text"
    "new-2 edit-2 filter-2 limit limit-text placeholder toggle-2 toggle-2-text toggle-5 toggle-5-text toggle-8 toggle-8-text"
    "new-3 edit-3 filter-3 sort-by sort-by-text placeholder toggle-3 toggle-3-text toggle-6 toggle-6-text toggle-9 toggle-9-text";
}

#placeholder {
  grid-area: placeholder;
}

#limit {
  grid-area: limit;
}

#limit-text {
  grid-area: limit-text;
}

#sort-by {
  grid-area: sort-by;
}

#sort-by-text {
  grid-area: sort-by-text;
}

#preset-filters {
  grid-area: preset-filters;
}

#preset-filters-text {
  grid-area: preset-filters-text;
}

#new-1 {
  grid-area: new-1;
}

#new-2 {
  grid-area: new-2;
}

#new-3 {
  grid-area: new-3;
}

#edit-1 {
  grid-area: edit-1;
}

#edit-2 {
  grid-area: edit-2;
}

#edit-3 {
  grid-area: edit-3;
}

#filter-1 {
  grid-area: filter-1;
}

#filter-2 {
  grid-area: filter-2;
}

#filter-3 {
  grid-area: filter-3;
}

#toggle-1 {
  grid-area: toggle-1;
}

#toggle-1-text {
  grid-area: toggle-1-text;
}

#toggle-2 {
  grid-area: toggle-2;
}

#toggle-2-text {
  grid-area: toggle-2-text;
}

#toggle-3 {
  grid-area: toggle-3;
}

#toggle-3-text {
  grid-area: toggle-3-text;
}

#toggle-4 {
  grid-area: toggle-4;
}

#toggle-4-text {
  grid-area: toggle-4-text;
}

#toggle-5 {
  grid-area: toggle-5;
}

#toggle-5-text {
  grid-area: toggle-5-text;
}

#toggle-6 {
  grid-area: toggle-6;
}

#toggle-6-text {
  grid-area: toggle-6-text;
}

#toggle-7 {
  grid-area: toggle-7;
}

#toggle-7-text {
  grid-area: toggle-7-text;
}

#toggle-8 {
  grid-area: toggle-8;
}

#toggle-8-text {
  grid-area: toggle-8-text;
}

#toggle-9 {
  grid-area: toggle-9;
}

#toggle-9-text {
  grid-area: toggle-9-text;
}
</style>