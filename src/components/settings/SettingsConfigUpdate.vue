<script setup lang="ts">
import { ref, watch } from "vue";

import { hostRequest } from "@/requests/host";
import { useNotificationStore } from "@/stores/notification";
import { useBoughtItemFilterStore } from "@/stores/filter";

import type { HostConfigBoughtItemsFilterSchema } from "@/schemas/host";

import Prompt from "@/components/main/Prompt.vue";
import ButtonSave from "@/components/elements/ButtonSave.vue";
import ButtonDelete from "@/components/elements/ButtonDelete.vue";

// Props & Emits
const props = defineProps<{
  selectedConfigValue: HostConfigBoughtItemsFilterSchema;
  selectedConfigName: string;
  selectedConfigCategory: string;
}>();
const emit = defineEmits<{
  (e: "update:selectedConfigValue", v: HostConfigBoughtItemsFilterSchema): void;
  (e: "update:selectedConfigName", v: string): void;
  (e: "update:selectedConfigCategory", v: string): void;
}>();

// Stores
const notificationStore = useNotificationStore();
const boughtItemsFilterStore = useBoughtItemFilterStore();

const showDeletePrompt = ref<boolean>(false);
const defaultJson = ref<HostConfigBoughtItemsFilterSchema>(
  props.selectedConfigValue,
);

function updateConfig() {
  let data = defaultJson.value;
  if (typeof data == "string") data = JSON.parse(data);

  if (props.selectedConfigCategory == "boughItemFilterPreset") {
    hostRequest
      .putConfigItemsBoughtFilter(props.selectedConfigName, data)
      .then((response) => {
        if (response.status === 200) {
          notificationStore.addInfo("Updated config");
          boughtItemsFilterStore.get();
          emit("update:selectedConfigName", null);
        } else {
          notificationStore.addWarn(response.data.detail);
        }
      });
  } else {
    notificationStore.addWarn("Category not available");
  }
}

function deleteConfig() {
  if (props.selectedConfigCategory == "boughItemFilterPreset") {
    hostRequest
      .deleteConfigItemsBoughtFilter(props.selectedConfigName)
      .then((response) => {
        if (response.status === 200) {
          emit("update:selectedConfigName", null);
          boughtItemsFilterStore.get();
          notificationStore.addInfo("Deleted config");
        } else {
          notificationStore.addWarn(response.data.detail);
        }
      });
  } else {
    notificationStore.addWarn("Category not available");
  }
}

watch(
  () => props.selectedConfigValue,
  () => {
    defaultJson.value = props.selectedConfigValue;
  },
);
</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container controls">
      <div id="grid" class="grid-command">
        <div id="btn-update">
          <ButtonSave v-on:click="updateConfig" text="Update" />
        </div>
        <div id="btn-delete">
          <ButtonDelete v-on:click="showDeletePrompt = true" text="Delete" />
        </div>
      </div>
    </div>

    <div class="form-base-container editor">
      <JsonEditor mode="tree" v-model="defaultJson" />
    </div>
  </div>

  <Prompt
    text="Delete config?"
    yes-is-danger
    v-model:show="showDeletePrompt"
    v-bind:on-yes="deleteConfig"
    v-bind:on-no="
      () => {
        showDeletePrompt = false;
      }
    "
  />
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/form/formBase.scss";
@import "@/scss/grid/gridBase.scss";

.controls {
  margin-bottom: 15px;
}

.editor {
  height: calc(100vh - 320px);
  margin-bottom: -4px;
}

@media screen and (max-width: 1000px) {
  .editor {
    height: auto;
  }
}

.grid-command {
  grid-template-rows: 32px;
  grid-template-columns: min-content 130px min-content;
  grid-template-areas: "btn-update btn-delete";
}

#btn-update {
  grid-area: btn-update;
}

#btn-delete {
  grid-area: btn-delete;
}
</style>
