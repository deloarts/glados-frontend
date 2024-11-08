<script setup lang="ts">
import { computed } from "vue";

import { useBoughtItemsControlsStore } from "@/stores/controls";
import { useBoughtItemFilterStore } from "@/stores/filter";

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
  width: 100,
  center: false,
});

const cssWidth = computed<string>(() => {
  return String(props.width) + "px";
});
const cssCenter = computed<string>(() => {
  return props.center ? "center" : "left";
});
</script>

<template>
  <td
    @contextmenu.prevent="
      () => {
        if (props.value && props.filterStoreKey) {
          filterStore.state[props.filterStoreKey] = String(props.value);
        }
      }
    "
  >
    <div v-bind:class="{ 'fix-height': controlsStore.state.fixedHeight }">
      {{ props.displayValue != null ? props.displayValue : props.value }}
    </div>
  </td>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/button/buttonBase.scss";

td {
  width: auto;
  min-width: v-bind(cssWidth);
  max-width: v-bind(cssWidth);
  text-align: v-bind(cssCenter);
}

.fix-height {
  height: min-content;
  width: 100%;

  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
  white-space: nowrap;
}
</style>
