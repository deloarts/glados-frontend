<script setup lang="ts">
import { computed } from "vue";

import type { AvailableOption } from "@/models/controls";

import { useUserStore } from "@/stores/user";
import { useBoughtItemsControlsStore } from "@/stores/controls";
import { useBoughtItemFilterStore } from "@/stores/filter";

import { updateSelectedTableElement } from "@/helper/selection.helper";

const userStore = useUserStore();
const controlsStore = useBoughtItemsControlsStore();
const filterStore = useBoughtItemFilterStore();

interface Props {
  name: string;
  value: string | number | Date | null;
  options: Array<AvailableOption>;
  updateMethod: Function;
  filterStoreKey?: string;
  type?: string;
  width?: number;
  editMode?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  filterStoreKey: null,
  type: "text",
  width: 100,
  editMode: false,
});

const cssWidth = computed<string>(() => {
  return String(props.width) + "px";
});

function blur() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
}

function onEscape() {
  blur();
}

function onChange(eventTarget: EventTarget) {
  blur();
  updateSelectedTableElement(
    props.name,
    //@ts-ignore
    eventTarget.value,
    props.value,
    props.updateMethod,
  );
}
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
      {{ String(props.value).toUpperCase() }}
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

  font-size: 12px;
}

select > option {
  color: white;
  background-color: $main-background-color-dark-2;
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
