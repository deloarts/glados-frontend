<script setup lang="ts">
import { ref, watch } from "vue";

import SettingsConfigTable from "@/components/settings/SettingsConfigTable.vue";
import SettingsConfigCreate from "@/components/settings/SettingsConfigCreate.vue";
import SettingsConfigUpdate from "@/components/settings/SettingsConfigUpdate.vue";

import { useLanguageStore } from "@/stores/language";

const languageStore = useLanguageStore();

const selectedConfigValue = ref(null);
const selectedConfigCategory = ref(null);
const selectedConfigName = ref(null);
const mode = ref("create");

watch(selectedConfigName, () => {
  if (selectedConfigName.value == null) {
    mode.value = "create";
    selectedConfigValue.value = null;
    selectedConfigCategory.value = null;
  } else {
    mode.value = "update";
  }
});
</script>

<template>
  <div class="scope">
    <div class="content">
      <div id="grid">
        <div id="registered-h1">
          <h1>{{ languageStore.l.settings.config.banner }}</h1>
        </div>
        <div id="registered">
          <SettingsConfigTable
            v-model:selectedConfigValue="selectedConfigValue"
            v-model:selectedConfigCategory="selectedConfigCategory"
            v-model:selectedConfigName="selectedConfigName"
          />
        </div>

        <div id="config-h1" v-if="mode == 'create'">
          <h1>{{ languageStore.l.settings.config.create }}</h1>
        </div>
        <div id="config" v-if="mode == 'create'">
          <SettingsConfigCreate
            v-model:selectedConfigName="selectedConfigName"
          />
        </div>

        <div id="config-h1" v-if="mode == 'update'">
          <h1>
            {{ languageStore.l.settings.config.update }} '{{
              selectedConfigName
            }}'
          </h1>
        </div>
        <div id="config" v-if="mode == 'update'">
          <SettingsConfigUpdate
            v-model:selectedConfigValue="selectedConfigValue"
            v-model:selectedConfigCategory="selectedConfigCategory"
            v-model:selectedConfigName="selectedConfigName"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/grid/gridBase.scss";

.scope {
  width: 100%;
  height: 100%;
}

.content {
  height: 100%;
}

#grid {
  grid-template-columns: 400px auto;
  grid-template-rows: min-content min-content;
  grid-template-areas:
    "registered-h1 config-h1"
    "registered config";
}

@media screen and (max-width: 1000px) {
  #grid {
    grid-template-columns: 100%;
    grid-template-rows: min-content 300px min-content min-content;
    grid-template-areas:
      "registered-h1"
      "registered"
      "config-h1"
      "config";
  }
}

#registered {
  grid-area: registered;
}

#registered-h1 {
  grid-area: registered-h1;
}

#config {
  grid-area: config;
}

#config-h1 {
  grid-area: config-h1;
}
</style>
