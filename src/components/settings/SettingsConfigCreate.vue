<script setup>
import { ref, watch } from "vue";

import { hostRequest } from "@/requests/host";
import { useNotificationStore } from "@/stores/notification.js";
import { useBoughtItemFilterStore } from "@/stores/filter.js";
import ButtonSave from "@/components/elements/ButtonSave.vue";
import SelectControls from "@/components/elements/SelectControls.vue";

// Props & Emits
const props = defineProps(["selectedConfigName"]);
const emit = defineEmits(["update:selectedConfigName"]);

// Stores
const notificationStore = useNotificationStore();
const boughtItemsFilterStore = useBoughtItemFilterStore();

const availableOptionsCategory = [
  { text: "Bought Item Filter Preset", value: "boughItemFilterPreset" },
];
const selectedOptionCategory = ref("");
const newConfigName = ref("");
const defaultJson = ref({});

function createConfig() {
  if (selectedOptionCategory.value == "") {
    notificationStore.warning = "Select a category first";
  } else if (newConfigName.value == "") {
    notificationStore.warning = "Choose a name for the configuration first";
  } else {
    let data = defaultJson.value;
    if (typeof data == "string") data = JSON.parse(data);

    if (selectedOptionCategory.value == "boughItemFilterPreset") {
      hostRequest
        .postConfigItemsBoughtFilter(newConfigName.value, data)
        .then((response) => {
          if (response.status === 200) {
            notificationStore.info = "Created new config";
            boughtItemsFilterStore.get();
            emit("update:selectedConfigName", newConfigName.value);
          } else {
            notificationStore.warning = response.data.detail;
          }
        });
    } else {
      notificationStore.warning = "Category not available";
    }
  }
}

watch(selectedOptionCategory, () => {
  if (selectedOptionCategory.value == "boughItemFilterPreset") {
    hostRequest.getConfigItemsBoughtFiltersDefault().then((response) => {
      if (response.status === 200) {
        defaultJson.value = response.data;
      } else {
        notificationStore.warning = "Failed to load default data";
      }
    });
  }
});
</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container controls">
      <div id="grid" class="grid-command">
        <div id="select-category">
          <SelectControls
            class="controls-base-element"
            text="Category"
            v-model:selection="selectedOptionCategory"
            :options="availableOptionsCategory"
          ></SelectControls>
        </div>
        <div id="config-name" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="newConfigName"
            placeholder="Config Name"
          />
        </div>
        <div id="btn-save">
          <ButtonSave v-on:click="createConfig" text="Save" />
        </div>
      </div>
    </div>

    <div class="form-base-container editor">
      <JsonEditor mode="tree" v-model="defaultJson" />
    </div>
  </div>
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
  grid-template-areas: "select-category config-name btn-save";
}

#select-category {
  grid-area: select-category;
}

#btn-save {
  grid-area: btn-save;
}

#config-name {
  grid-area: config-name;
}
</style>
