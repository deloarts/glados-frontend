<script setup lang="ts">
import { useLanguageStore } from "@/stores/language";
import { useBoughtItemFilterStore } from "@/stores/filter";

import type { HostConfigBoughtItemsFilterSchema } from "@/schemas/host";

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

// Store
const languageStore = useLanguageStore();
const boughtItemsFilterStore = useBoughtItemFilterStore();

function onSelect(
  name: string | number,
  category: string,
  value: HostConfigBoughtItemsFilterSchema,
) {
  if (props.selectedConfigName == String(name)) {
    name = null;
  }
  emit("update:selectedConfigValue", value);
  emit("update:selectedConfigName", String(name));
  emit("update:selectedConfigCategory", category);
}
</script>

<template>
  <div class="table-base-scope">
    <div class="table-base-container">
      <table class="cursor-default">
        <thead>
          <tr>
            <th class="first sticky-col" id="config-category">
              {{ languageStore.l.settings.config.table.category }}
            </th>
            <th class="first sticky-col" id="config-name">
              {{ languageStore.l.settings.config.table.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(value, key, index) in boughtItemsFilterStore.presets"
            :key="key"
            v-on:click="onSelect(key, 'boughItemFilterPreset', value)"
            v-bind:class="{ selected: props.selectedConfigName == key }"
          >
            <td id="config-category" class="sticky-col">
              Bought Item Filter Preset #{{ index + 1 }}
            </td>
            <td id="config-name" class="sticky-col">{{ key }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/table/tableBase.scss";

#config-category {
  width: 60px;
  min-width: 60px;
}

#config-name {
  width: 60px;
  min-width: 60px;
}

svg {
  width: 15px;
  height: 15px;
}
</style>
