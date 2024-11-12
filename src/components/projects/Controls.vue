<script setup lang="ts">
import { ref, computed } from "vue";
import Toggle from "@vueform/toggle/dist/toggle.js";

import router from "@/router/index";
import { projectsRequest } from "@/requests/projects";
import { capitalizeFirstLetter } from "@/helper/string.helper";

import { useProjectsStore } from "@/stores/projects";
import { useProjectFilterStore } from "@/stores/filter";
import { useNotificationStore } from "@/stores/notification";
import { useUserStore } from "@/stores/user";
import { useResolutionStore } from "@/stores/resolution";
import { useProjectsControlsStore } from "@/stores/controls";

import Prompt from "@/components/main/Prompt.vue";
import ButtonItemCreate from "@/components/elements/ButtonItemCreate.vue";
import ButtonFilterClear from "@/components/elements/ButtonFilterClear.vue";
import ButtonEdit from "@/components/elements/ButtonEdit.vue";
import ButtonDelete from "@/components/elements/ButtonDelete.vue";
import ButtonSync from "@/components/elements/ButtonSync.vue";
import ButtonClear from "@/components/elements/ButtonClear.vue";
import DropDownTableColumns from "../elements/DropDownTableColumns.vue";
import DropDownTableView from "../elements/DropDownTableView.vue";

// Stores
const projectStore = useProjectsStore();
const projectFilterStore = useProjectFilterStore();
const notificationStore = useNotificationStore();
const resolutionStore = useResolutionStore();
const userStore = useUserStore();
const projectsControlsStore = useProjectsControlsStore();

const enableControls = computed<boolean>(() => !userStore.user.is_guestuser);
const gtMinWidthDesktop = computed<boolean>(
  () => resolutionStore.gtMinWidthDesktop,
);
const gtMinWidthTablet = computed<boolean>(
  () => resolutionStore.gtMinWidthTablet,
);

// Shows
const showDeletePrompt = ref<boolean>(false);

// Buttons
const buttonCreateText = computed<string>(() => {
  return gtMinWidthTablet.value ? "New Project" : "";
});
const buttonEditText = computed<string>(() => {
  return gtMinWidthTablet.value ? "Edit Project" : "";
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

function onButtonNew() {
  router.push({ name: "NewProject" });
}

function onButtonEdit() {
  if (projectStore.getSelection().length == 0) {
    notificationStore.addWarn("Select a project first.");
  } else if (projectStore.getSelection().length != 1) {
    notificationStore.addWarn("You can only edit one project.");
  } else {
    router.push(`/projects/edit/${projectStore.getSelection()[0]}`);
  }
}

function onButtonDelete() {
  if (projectStore.getSelection().length == 0) {
    notificationStore.addWarn("Select a project first.");
  } else if (projectStore.getSelection().length != 1) {
    notificationStore.addWarn("You can only delete one project.");
  } else {
    showDeletePrompt.value = true;
  }
}

function deleteItem() {
  const projectId = projectStore.getSelection()[0];
  projectsRequest.deleteProjects(projectId).then((response) => {
    if (response.status === 200) {
      notificationStore.addInfo(`Deleted project #${projectId}`);
      projectStore.getItems();
    } else {
      notificationStore.addWarn(response.data.detail);
    }
  });
  showDeletePrompt.value = false;
}

function onButtonClear() {
  projectStore.clearSelection();
  projectStore.getItems();
}

function clearFilter() {
  projectFilterStore.reset();
}
</script>

<template>
  <div class="controls-base-scope">
    <div
      id="item-controls"
      v-if="enableControls"
      class="controls-base-container"
    >
      <ButtonItemCreate
        class="controls-base-element"
        v-model:text="buttonCreateText"
        v-on:click="onButtonNew"
      ></ButtonItemCreate>
      <ButtonEdit
        class="controls-base-element"
        v-model:text="buttonEditText"
        v-on:click="onButtonEdit"
      ></ButtonEdit>
      <ButtonDelete
        v-if="gtMinWidthTablet"
        class="controls-base-element"
        text="Delete"
        v-on:click="onButtonDelete"
      ></ButtonDelete>
      <ButtonClear
        class="controls-base-element"
        text="Unselect"
        v-on:click="onButtonClear"
      ></ButtonClear>
    </div>
    <div id="filter-controls" class="controls-base-container">
      <ButtonSync
        class="controls-base-element"
        v-model:text="buttonSyncText"
        v-model:rotate="projectStore.loading"
        v-on:click="projectStore.getItems()"
      ></ButtonSync>

      <DropDownTableView
        class="controls-base-element"
        v-model:text="buttonViewsText"
        :hide-when-clicked="false"
      >
        <div class="drop-down-toggle-item">
          <Toggle v-model="projectsControlsStore.state.fixedHeight"></Toggle
          ><span class="drop-down-toggle-item-text">Fixed Height</span>
        </div>
      </DropDownTableView>

      <DropDownTableColumns
        class="controls-base-element"
        v-model:text="buttonColumnsText"
        :hide-when-clicked="false"
      >
        <div
          v-for="(value, key) in projectsControlsStore.columns"
          class="drop-down-toggle-item"
        >
          <Toggle v-model="projectsControlsStore.columns[key]"></Toggle
          ><span class="drop-down-toggle-item-text">{{
            capitalizeFirstLetter(key)
          }}</span>
        </div>
      </DropDownTableColumns>

      <ButtonFilterClear
        class="controls-base-element"
        v-model:text="buttonClearFilterText"
        v-on:click="clearFilter"
      ></ButtonFilterClear>
    </div>
  </div>

  <Prompt
    text="Delete project?"
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
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/controls/controlsBase.scss";
</style>
