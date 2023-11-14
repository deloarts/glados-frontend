<script setup>
import { useBoughtItemFilterStore } from "@/stores/filter.js";

// Props & Emits
const props = defineProps([
  "selectedConfigValue",
  "selectedConfigName",
  "selectedConfigCategory",
]);
const emit = defineEmits([
  "update:selectedConfigValue",
  "update:selectedConfigName",
  "update:selectedConfigCategory",
]);

// Store
const boughtItemsFilterStore = useBoughtItemFilterStore();

function onSelect(name, category, value) {
  if (props.selectedConfigName == name) {
    name = null;
  }
  emit("update:selectedConfigValue", value);
  emit("update:selectedConfigName", name);
  emit("update:selectedConfigCategory", category);
}
</script>

<template>
  <div class="table-base-scope">
    <div class="table-base-container">
      <table class="cursor-default">
        <thead>
          <tr>
            <th class="first sticky-col" id="config-category">Category</th>
            <th class="first sticky-col" id="config-name">Name</th>
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
@import "@/scss/variables.scss";
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
