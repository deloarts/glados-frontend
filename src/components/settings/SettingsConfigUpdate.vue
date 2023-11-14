<script setup>
import { ref, computed, watch, onMounted } from "vue";

import { hostRequest } from "@/requests/host";
import { useNotificationStore } from "@/stores/notification.js";
import { useBoughtItemFilterStore } from "@/stores/filter.js";
import Prompt from "@/components/main/Prompt.vue";
import ButtonSave from "@/components/elements/ButtonSave.vue";
import ButtonDelete from "@/components/elements/ButtonDelete.vue";

// Props & Emits
const props = defineProps([
  "selectedConfigValue",
  "selectedConfigName",
  "selectedConfigCategory",
]);
const emit = defineEmits([
  "update:selectedConfigName",
  "update:selectedConfigCategory",
]);

// Stores
const notificationStore = useNotificationStore();
const boughtItemsFilterStore = useBoughtItemFilterStore();

const showDeletePrompt = ref(false);
const defaultJson = ref(props.selectedConfigValue);

function updateConfig() {
  let data = defaultJson.value;
  if (typeof data == "string") data = JSON.parse(data);

  if (props.selectedConfigCategory == "boughItemFilterPreset") {
    hostRequest
      .putConfigItemsBoughtFilter(props.selectedConfigName, data)
      .then((response) => {
        if (response.status === 200) {
          notificationStore.info = "Updated config";
          boughtItemsFilterStore.get();
          emit("update:selectedConfigName", null);
        } else {
          notificationStore.warning = response.data.detail;
        }
      });
  } else {
    notificationStore.warning = "Category not available";
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
          notificationStore.info = "Deleted config";
        } else {
          notificationStore.warning = response.data.detail;
        }
      });
  } else {
    notificationStore.warning = "Category not available";
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
          <ButtonDelete
            v-on:click="
              {
                showDeletePrompt = 'true';
              }
            "
            text="Delete"
          />
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
