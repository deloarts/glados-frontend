<script setup lang="ts">
import { ref, computed, watch } from "vue";
// @ts-ignore
import moment from "moment";
import Datepicker from "vue3-datepicker";

import type { ItemStoreProtocol } from "@/protocols/itemStoreProtocol";
import type { FilterStoreProtocol } from "@/protocols/filterStoreProtocol";

import { useUserStore } from "@/stores/user";
import { useResolutionStore } from "@/stores/resolution";

import { blur } from "@/helper/document.helper";
import { updateSelectedTableElement } from "@/helper/selection.helper";

const userStore = useUserStore();
const resolutionStore = useResolutionStore();

interface Props {
  name: string;
  value: string | number | Date | null;
  updateMethod: Function;
  itemStore?: ItemStoreProtocol;
  filterStore?: FilterStoreProtocol;
  filterStoreKey?: string;
  width?: number;
  center?: boolean;
  fixedHeight?: boolean;
  editMode?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  itemStore: null,
  filterStore: null,
  filterStoreKey: null,
  center: false,
  fixedHeight: false,
  editMode: false,
});

const pickedDate = ref<Date>(new Date());

const gtMinWidthTablet = computed<boolean>(
  () => resolutionStore.gtMinWidthTablet,
);

const cssWidth = computed<string>(() => {
  return String(props.width) + "px";
});
const cssCenter = computed<string>(() => {
  return props.center ? "center" : "left";
});

function onEscape() {
  blur();
}

function onUpdate() {
  blur();
  const formattedDate = moment(pickedDate.value).format("YYYY-MM-DD");

  updateSelectedTableElement(
    props.name,
    formattedDate,
    props.value,
    props.updateMethod,
    props.itemStore,
  );
}

function onContextMenu() {
  blur();
  if (
    props.value &&
    props.itemStore &&
    props.filterStore &&
    props.filterStoreKey
  ) {
    props.filterStore.state[props.filterStoreKey] = String(pickedDate.value);
    props.itemStore.getItems();
  }
}

watch(
  () => props.editMode,
  () => {
    if (props.value != null && props.value != undefined) {
      pickedDate.value = new Date(props.value);
    } else {
      pickedDate.value = null;
    }
  },
);
</script>

<template>
  <td @contextmenu.prevent="onContextMenu()">
    <div
      v-if="
        props.editMode &&
        (userStore.user.is_superuser || userStore.user.is_adminuser) &&
        gtMinWidthTablet
      "
    >
      <Datepicker
        class="datepicker"
        v-model="pickedDate"
        v-on:escape="onEscape"
        @update:model-value="onUpdate"
        style="width: 75px; height: 14px; text-align: center"
      />
    </div>
    <div v-else v-bind:class="{ 'fix-height': props.fixedHeight }">
      {{ props.value }}
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
