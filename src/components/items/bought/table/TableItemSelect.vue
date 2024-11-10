<script setup lang="ts">
import { computed } from "vue";

import type { AvailableOption } from "@/models/controls";

import { useUserStore } from "@/stores/user";
import { useBoughtItemsStore } from "@/stores/boughtItems";
import { useBoughtItemsControlsStore } from "@/stores/controls";
import { useBoughtItemFilterStore } from "@/stores/filter";

import { blur } from "@/helper/document.helper";
import { capitalizeFirstLetter } from "@/helper/string.helper";
import { updateSelectedTableElement } from "@/helper/selection.helper";

const userStore = useUserStore();
const boughtItemsStore = useBoughtItemsStore();
const controlsStore = useBoughtItemsControlsStore();
const filterStore = useBoughtItemFilterStore();

interface Props {
  name: string;
  value: string | number | Date | null;
  options: Array<AvailableOption>;
  updateMethod: Function;
  filterStoreKey?: string;
  width?: number;
  editMode?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  filterStoreKey: null,
  editMode: false,
});

const cssWidth = computed<string>(() => {
  return String(props.width) + "px";
});

function onEscape() {
  blur();
}

function onContextMenu() {
  blur();
  if (props.value && props.filterStoreKey) {
    filterStore.state[props.filterStoreKey] = String(props.value);
    boughtItemsStore.getItems();
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
    boughtItemsStore,
  );
}
</script>

<template>
  <td @contextmenu.prevent="onContextMenu()">
    <select
      v-if="
        props.editMode &&
        (userStore.user.is_superuser || userStore.user.is_adminuser) &&
        !controlsStore.state.textOnly
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
    <div v-else>
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
}

select {
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
}

select > option {
  color: white;
  background-color: $main-background-color-dark-2;
}

span {
  padding-left: 4px;
}
</style>
