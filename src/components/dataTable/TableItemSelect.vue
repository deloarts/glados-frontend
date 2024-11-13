<script setup lang="ts">
import { computed } from "vue";

import type { AvailableOption } from "@/models/controls";
import type { ItemStoreProtocol } from "@/protocols/itemStoreProtocol";
import type { FilterStoreProtocol } from "@/protocols/filterStoreProtocol";

import { useUserStore } from "@/stores/user";

import { blur } from "@/helper/document.helper";
import { capitalizeFirstLetter } from "@/helper/string.helper";
import { updateSelectedTableElement } from "@/helper/selection.helper";

const userStore = useUserStore();

interface Props {
  name: string;
  value: string | number | Date | null;
  options: Array<AvailableOption>;
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

const cssWidth = computed<string>(() => {
  return String(props.width) + "px";
});
const cssCenter = computed<string>(() => {
  return props.center ? "center" : "left";
});

function onEscape() {
  blur();
}

function onContextMenu() {
  blur();
  if (
    props.value &&
    props.itemStore &&
    props.filterStore &&
    props.filterStoreKey
  ) {
    props.filterStore.state[props.filterStoreKey] = String(props.value);
    props.itemStore.getItems();
  }
}

function onChange(eventTarget: EventTarget) {
  blur();
  updateSelectedTableElement(
    props.name,
    //@ts-ignore
    eventTarget.value,
    props.value,
    props.updateMethod,
    props.itemStore,
  );
}
</script>

<template>
  <td @contextmenu.prevent="onContextMenu()">
    <select
      v-if="
        props.editMode &&
        (userStore.user.is_superuser || userStore.user.is_adminuser)
      "
      :value="props.value"
      v-on:keyup.escape="onEscape()"
      v-on:change="onChange($event.target)"
    >
      <option
        v-for="(option, index) in props.options"
        :key="index"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    <div v-else v-bind:class="{ 'fix-height': props.fixedHeight }">
      <span>{{ capitalizeFirstLetter(String(props.value)) }}</span>
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

select {
  appearance: none;

  width: 100%;
  height: 18px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;

  border: none;
  outline: none;

  color: white;
  background-color: transparent;

  font-family: Calibri;
  font-size: 14px;

  text-align: v-bind(cssCenter);
}

select:hover {
  cursor: pointer;
}

select::-ms-expand {
  display: none;
}

select > option {
  color: white;
  background-color: $main-color;
}

select > option:hover {
  color: white;
  background-color: $main-color-hover;
}

span {
  padding-left: 2px;
}
</style>
