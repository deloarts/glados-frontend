<script setup lang="ts">
import { computed } from "vue";

import { useBoughtItemsStore } from "@/stores/boughtItems";
import { useBoughtItemsControlsStore } from "@/stores/controls";
import { useBoughtItemFilterStore } from "@/stores/filter";

import { blur } from "@/helper/document.helper";

const boughtItemsStore = useBoughtItemsStore();
const controlsStore = useBoughtItemsControlsStore();
const filterStore = useBoughtItemFilterStore();

interface Props {
  name: string;
  value: string | number | Date | null;
  displayValue?: string;
  filterStoreKey?: string;
  width?: number;
  center?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  displayValue: null,
  filterStoreKey: null,
  center: false,
});

function onContextMenu() {
  blur();
  if (props.value && props.filterStoreKey) {
    filterStore.state[props.filterStoreKey] = String(props.value);
    boughtItemsStore.getItems();
  }
}

const cssWidth = computed<string>(() => {
  return String(props.width) + "px";
});
const cssCenter = computed<string>(() => {
  return props.center ? "center" : "left";
});
</script>

<template>
  <td @contextmenu.prevent="onContextMenu()">
    <div v-bind:class="{ 'fix-height': controlsStore.state.fixedHeight }">
      <span>{{
        props.displayValue != null ? props.displayValue : props.value
      }}</span>
    </div>
  </td>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/dataTable/tableItem.scss";

td {
  min-width: v-bind(cssWidth);
  max-width: v-bind(cssWidth);
  text-align: v-bind(cssCenter);
}
</style>
