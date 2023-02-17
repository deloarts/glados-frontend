<script lang="ts">
import { boughtItemsFilter, boughtItemsFilterPresetAllOpen, boughtItemsFilterPresetAllRequested, boughtItemsFilterPresetAllActive, boughtItemsFilterPresetAllOrdered, boughtItemsFilterPresetAllPrioritized } from "@/presets/boughtItemsFilter";
import { boughtItemsRequest } from "@/requests/items";
import { getFilterParams } from "@/requests/params";
import router from "@/router/index";

import ExcelImport from "./ExcelImport.vue";
import Prompt from "../../Prompt.vue";
import ButtonNew from "../../elements/ButtonNew.vue";
import ButtonEdit from "../../elements/ButtonEdit.vue";
import ButtonDelete from "../../elements/ButtonDelete.vue";
import ButtonExcel from "../../elements/ButtonExcel.vue";
import ButtonFilterClear from "../../elements/ButtonFilterClear.vue";
import ButtonFilterSave from "../../elements/ButtonFilterSave.vue";
import ButtonFilterLoad from "../../elements/ButtonFilterLoad.vue";
import SelectControls from "../../elements/SelectControls.vue";

import Toggle from "@vueform/toggle";


export default {
  name: 'Controls',
  props: [
    "selectedItemIds",
    "triggerGetNewData",
    "showChangelog",
    "showRainbow",
    "showTextOnly",
    "showFixHeight",
    "showUnclutter",
    "showRequestView",
    "filter"
  ],
  emits: [
    "update:showChangelog",
    "update:triggerGetNewData",
    "update:showRainbow",
    "update:showTextOnly",
    "update:showFixHeight",
    "update:showUnclutter",
    "update:showRequestView",
    "update:filter"
  ],
  components: {
    Toggle,
    ExcelImport,
    Prompt,
    ButtonNew,
    ButtonEdit,
    ButtonDelete,
    ButtonExcel,
    ButtonFilterClear,
    ButtonFilterSave,
    ButtonFilterLoad,
    SelectControls
  },
  data() {
    return {
      // Globals
      notificationWarning: this.$notificationWarning,
      notificationInfo: this.$notificationInfo,

      // Props & emits
      showDeletePrompt: false,
      showExcelImport: false,
      toggleChangelog: false,
      toggleRainbow: false,
      toggleTextOnly: false,
      toggleFixHeight: false,
      toggleUnclutter: false,
      toggleRequestView: false,
      // toggleIgnoreDelivered: false,
      // toggleIgnoreCanceled: false,
      // toggleIgnoreLost: false,

      // Selections
      availableOptionsLimit: [
        { text: "100", value: "100" },
        { text: "500", value: "500" },
        { text: "1000", value: "1000" },
        { text: "All", value: "" },
      ],
      availableOptionsOrderBy: [
        { text: "Created", value: "created" },
        { text: "Project", value: "project" },
        { text: "Machine", value: "machine" },
        { text: "Group", value: "group1" },
        { text: "Manufacturer", value: "manufacturer" },
        { text: "Supplier", value: "supplier" },
      ],
      availableOptionsFilterPresets: [
        { text: "None", value: JSON.parse(JSON.stringify(boughtItemsFilter)) },
        { text: "All Open", value: JSON.parse(JSON.stringify(boughtItemsFilterPresetAllOpen)) },
        { text: "All Requested", value: JSON.parse(JSON.stringify(boughtItemsFilterPresetAllRequested)) },
        { text: "All Ordered", value: JSON.parse(JSON.stringify(boughtItemsFilterPresetAllOrdered)) },
        { text: "All Active", value: JSON.parse(JSON.stringify(boughtItemsFilterPresetAllActive)) },
        { text: "All Prioritized", value: JSON.parse(JSON.stringify(boughtItemsFilterPresetAllPrioritized)) }
      ],
      selectedOptionFilterPreset: {}

    };
  },
  methods: {
    saveFilter() {
      // Save the current filter selection the user made
      localStorage.setItem("gladosBoughtItemDataTableMyFilter", JSON.stringify(this.filter));
      // @ts-ignore
      this.notificationInfo = "Saved new filter.";
    },

    loadFilter() {
      // Load the user defined filter
      const filterObject = localStorage.getItem("gladosBoughtItemDataTableMyFilter");
      if (filterObject != null) {
        this.$emit("update:filter", JSON.parse(filterObject));
      }
    },

    clearFilter() {
      const f = JSON.parse(JSON.stringify(boughtItemsFilter))
      this.selectedOptionFilterPreset = f;
      this.$emit("update:filter", f);
      console.log("Cleared filter");
    },

    onButtonEdit() {
      if (this.selectedItemIds.length == 0) {
        // @ts-ignore
        this.notificationWarning = "Select an item first.";
      }
      else if (this.selectedItemIds.length != 1) {
        // @ts-ignore
        this.notificationWarning = "You can only edit one item."
      } else {
        router.push(`/items/bought/edit/${this.selectedItemIds[0]}`);
      }
    },

    onButtonDelete() {
      if (this.selectedItemIds.length == 0) {
        // @ts-ignore
        this.notificationWarning = "Select an item first.";
      }
      else if (this.selectedItemIds.length != 1) {
        // @ts-ignore
        this.notificationWarning = "You can only delete one item.";
      } else {
        this.showDeletePrompt = true;
      }
    },

    onButtonDownloadExcel() {
      const params = getFilterParams(this.filter);
      boughtItemsRequest.getItemsExcel(params).then(response => {
        let blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
          url = window.URL.createObjectURL(blob)
        window.open(url);
      });
    },

    onButtonUploadExcel() {
      this.showExcelImport = true;
    },

    getNewData() {
      this.$emit("update:triggerGetNewData", true);
    },

    deleteItem() {
      const itemId = this.selectedItemIds[0];
      boughtItemsRequest.deleteItemsId(itemId).then(response => {
        if (response.status === 200) {
          // @ts-ignore
          this.notificationInfo = `Deleted item #${itemId}`;
          this.getNewData()
        } else {
          this.notificationWarning = response.data.detail;
        }
      })
      this.showDeletePrompt = false;
    }
  },
  watch: {
    toggleChangelog() {
      this.$emit("update:showChangelog", this.toggleChangelog);
      localStorage.setItem("gladosBoughtItemControlsShowChangelog", String(this.toggleChangelog));
    },
    toggleRainbow() {
      this.$emit("update:showRainbow", this.toggleRainbow);
      localStorage.setItem("gladosBoughtItemControlsShowRainbow", String(this.toggleRainbow));
    },
    toggleTextOnly() {
      this.$emit("update:showTextOnly", this.toggleTextOnly);
      localStorage.setItem("gladosBoughtItemControlsShowTextOnly", String(this.toggleTextOnly));
    },
    toggleFixHeight() {
      this.$emit("update:showFixHeight", this.toggleFixHeight);
      localStorage.setItem("gladosBoughtItemControlsShowFixHeight", String(this.toggleFixHeight));
    },
    toggleUnclutter() {
      this.$emit("update:showUnclutter", this.toggleUnclutter);
      localStorage.setItem("gladosBoughtItemControlsShowUnclutter", String(this.toggleUnclutter));
    },
    toggleRequestView() {
      this.$emit("update:showRequestView", this.toggleRequestView);
      localStorage.setItem("gladosBoughtItemControlsShowRequestView", String(this.toggleRequestView));
    },
    // toggleIgnoreDelivered() {
    //   this.filter.ignoreDelivered = this.toggleIgnoreDelivered;
    //   this.$emit("update:filter", this.filter);
    // },
    // toggleIgnoreCanceled() {
    //   this.filter.ignoreCanceled = this.toggleIgnoreCanceled;
    //   this.$emit("update:filter", this.filter);
    // },
    // toggleIgnoreLost() {
    //   this.filter.ignoreLost = this.toggleIgnoreLost;
    //   this.$emit("update:filter", this.filter);
    // },
    selectedOptionFilterPreset() {
      this.$emit("update:filter", JSON.parse(JSON.stringify(this.selectedOptionFilterPreset)));
    },
    filter: {
      handler: function () {
        // this.toggleIgnoreDelivered = this.filter.ignoreDelivered;
        // this.toggleIgnoreCanceled = this.filter.ignoreCanceled;
        // this.toggleIgnoreLost = this.filter.ignoreLost;
        this.selectedOptionFilterPreset = JSON.parse(JSON.stringify(this.filter));
      }, deep: true
    }
  },
  beforeMount() {
    this.toggleChangelog = this.showChangelog;
    this.toggleRainbow = this.showRainbow;
    this.toggleTextOnly = this.showTextOnly;
    this.toggleFixHeight = this.showFixHeight;
    this.toggleUnclutter = this.showUnclutter;
    this.toggleRequestView = this.showRequestView;
    // this.toggleIgnoreDelivered = this.filter.ignoreDelivered;
    // this.toggleIgnoreCanceled = this.filter.ignoreCanceled;
    // this.toggleIgnoreLost = this.filter.ignoreLost;
    this.selectedOptionFilterPreset = JSON.parse(JSON.stringify(this.filter));
  }
};
</script>

<template>
  <div class="scope">
    <div class="container">
      <div id="grid">
        <!-- AREA PLACEHOLDER -->
        <div id="placeholder" class="grid-item-center">
          <!-- Selected IDs: {{ selectedItemIds }} -->
        </div>

        <!-- AREA NEW -->
        <div id="new-1" class="grid-item-center">
          <ButtonExcel text="Export Excel" v-on:click="onButtonDownloadExcel"></ButtonExcel>
        </div>
        <div id="new-2" class="grid-item-center">
          <ButtonExcel text="Import Excel" v-on:click="onButtonUploadExcel"></ButtonExcel>
        </div>
        <div id="new-3" class="grid-item-center">
          <ButtonNew text="New Item" route-name="NewBoughtItem"></ButtonNew>
        </div>

        <!-- AREA EDIT -->
        <div id="edit-1" class="grid-item-center">

        </div>
        <div id="edit-2" class="grid-item-center">
          <ButtonDelete text="Delete Item" v-on:click="onButtonDelete"></ButtonDelete>
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
          <SelectControls v-model:selection="filter.limit" :options="availableOptionsLimit"></SelectControls>
        </div>
        <div id="limit-text" class="grid-item-left">
          Limit
        </div>
        <div id="sort-by" class="grid-item-center">
          <SelectControls v-model:selection="filter.sortBy" :options="availableOptionsOrderBy"></SelectControls>
        </div>
        <div id="sort-by-text" class="grid-item-left">
          Sort by
        </div>
        <div id="preset-filters" class="grid-item-center">
          <SelectControls v-model:selection="selectedOptionFilterPreset" :options="availableOptionsFilterPresets">
          </SelectControls>
        </div>
        <div id="preset-filters-text" class="grid-item-left">
          Presets
        </div>

        <!-- AREA TOGGLE -->
        <div id="toggle-1" class="grid-item-center">
          <!-- <Toggle v-model="toggleIgnoreDelivered"></Toggle> -->
          <Toggle v-model="filter.ignoreDelivered"></Toggle>
        </div>
        <div id="toggle-1-text" class="grid-item-left">
          Hide Delivered
        </div>
        <div id="toggle-2" class="grid-item-center">
          <Toggle v-model="filter.ignoreCanceled"></Toggle>
        </div>
        <div id="toggle-2-text" class="grid-item-left">
          Hide Canceled
        </div>
        <div id="toggle-3" class="grid-item-center">
          <Toggle v-model="filter.ignoreLost"></Toggle>
        </div>
        <div id="toggle-3-text" class="grid-item-left">
          Hide Lost
        </div>

        <div id="toggle-4" class="grid-item-center">
          <Toggle v-model="toggleFixHeight"></Toggle>
        </div>
        <div id="toggle-4-text" class="grid-item-left">
          Fixed Height
        </div>
        <div id="toggle-5" class="grid-item-center">
          <Toggle v-model="toggleUnclutter"></Toggle>
        </div>
        <div id="toggle-5-text" class="grid-item-left">
          Unclutter
        </div>
        <div id="toggle-6" class="grid-item-center">
          <Toggle v-model="toggleRequestView"></Toggle>
        </div>
        <div id="toggle-6-text" class="grid-item-left">
          Request View
        </div>

        <div id="toggle-7" class="grid-item-center">
          <Toggle v-model="toggleChangelog"></Toggle>
        </div>
        <div id="toggle-7-text" class="grid-item-left">
          Changelog
        </div>
        <div id="toggle-8" class="grid-item-center">
          <Toggle v-model="toggleRainbow"></Toggle>
        </div>
        <div id="toggle-8-text" class="grid-item-left">
          Rainbow
        </div>
        <div id="toggle-9" class="grid-item-center">
          <Toggle v-model="toggleTextOnly"></Toggle>
        </div>
        <div id="toggle-9-text" class="grid-item-left">
          Text Only
        </div>
      </div>
    </div>
  </div>

  <Prompt v-model:show-prompt="showDeletePrompt" prompt-text="Delete item?" v-bind:on-yes="deleteItem"
    v-bind:on-no="() => { showDeletePrompt = false; }" />
  <ExcelImport v-bind:on-success="getNewData" v-model:show-uploader="showExcelImport" />
</template>

<style scoped lang='scss'>
@import '@/assets/variables.scss';

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