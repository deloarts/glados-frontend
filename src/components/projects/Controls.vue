<script setup lang="ts">
import { ref, computed } from "vue";

import router from "@/router/index";
import { useProjectsStore } from "@/stores/projects";
import { useProjectFilterStore } from "@/stores/filter";
import { useNotificationStore } from "@/stores/notification";
import { useUserStore } from "@/stores/user";
import { useResolutionStore } from "@/stores/resolution";

import { projectsRequest } from "@/requests/projects";

import Prompt from "@/components/main/Prompt.vue";
import ButtonItemCreate from "@/components/elements/ButtonItemCreate.vue";
import ButtonFilterClear from "@/components/elements/ButtonFilterClear.vue";
import ButtonEdit from "@/components/elements/ButtonEdit.vue";
import ButtonDelete from "@/components/elements/ButtonDelete.vue";
import ButtonSync from "@/components/elements/ButtonSync.vue";
import ButtonClear from "@/components/elements/ButtonClear.vue";

const props = defineProps<{
  selectedProjectId: number;
}>();

const emit = defineEmits<{
  (e: "update:selectedProjectId", v: number): void;
  (e: "update:triggerGetNewData", v: boolean): void;
}>();

// Stores
const projectStore = useProjectsStore();
const projectFilterStore = useProjectFilterStore();
const notificationStore = useNotificationStore();
const resolutionStore = useResolutionStore();
const userStore = useUserStore();

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
const buttonClearFilterText = computed<string>(() => {
  return gtMinWidthTablet.value ? "Clear Filter" : "";
});

function onButtonNew() {
  router.push({ name: "NewProject" });
}

function onButtonEdit() {
  if (props.selectedProjectId == null) {
    notificationStore.warning = "Select a project first.";
  } else {
    router.push(`/projects/edit/${props.selectedProjectId}`);
  }
}

function onButtonDelete() {
  if (props.selectedProjectId == null) {
    notificationStore.warning = "Select a project first.";
  } else {
    showDeletePrompt.value = true;
  }
}

function getNewData() {
  emit("update:triggerGetNewData", true);
}

function deleteItem() {
  const projectId = props.selectedProjectId;
  projectsRequest.deleteProjects(projectId).then((response) => {
    if (response.status === 200) {
      notificationStore.info = `Deleted project #${projectId}`;
      getNewData();
    } else {
      notificationStore.warning = response.data.detail;
    }
  });
  showDeletePrompt.value = false;
}

function onButtonClear() {
  emit("update:selectedProjectId", null);
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
        v-on:click="projectStore.get()"
      ></ButtonSync>
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
