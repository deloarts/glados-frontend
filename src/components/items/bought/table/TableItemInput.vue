<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";

import { useBoughtItemsStore } from "@/stores/boughtItems";
import { useUserStore } from "@/stores/user";
import { useBoughtItemsControlsStore } from "@/stores/controls";
import { useBoughtItemFilterStore } from "@/stores/filter";
import { useResolutionStore } from "@/stores/resolution";

import { updateSelectedTableElement } from "@/helper/selection.helper";

const boughtItemsStore = useBoughtItemsStore();
const userStore = useUserStore();
const controlsStore = useBoughtItemsControlsStore();
const filterStore = useBoughtItemFilterStore();
const resolutionStore = useResolutionStore();

interface Props {
  name: string;
  value: string | number | Date | null;
  updateMethod: Function;
  editMode?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  editMode: false,
});

const gtMinWidthTablet = computed<boolean>(
  () => resolutionStore.gtMinWidthTablet,
);

const hasFocus = ref<boolean>(false);
const inputModel = ref<string | number | Date | null>();

onMounted(() => {
  inputModel.value = props.value;
});

watch(
  () => props.value,
  () => {
    if (!hasFocus.value) {
      inputModel.value = props.value;
    }
  },
);

watch(
  () => hasFocus.value,
  () => {
    if (hasFocus.value) {
      inputModel.value = JSON.parse(JSON.stringify(props.value));
    } else {
      inputModel.value = props.value;
    }
  },
);
</script>

<template>
  <td
    @contextmenu.prevent="
      () => {
        filterStore.state.supplier = String(props.value);
      }
    "
  >
    <div
      v-if="
        props.editMode &&
        (userStore.user.is_superuser || userStore.user.is_adminuser) &&
        controlsStore.state.textOnly == false &&
        gtMinWidthTablet
      "
    >
      <input
        class="cell-input"
        v-model="inputModel"
        type="text"
        @focusin="boughtItemsStore.pause(true), (hasFocus = true)"
        @focusout="boughtItemsStore.pause(false), (hasFocus = false)"
        v-on:keyup.escape="$event.target.blur()"
        v-on:keyup.enter="
          $event.target.blur(),
            updateSelectedTableElement(
              props.name,
              $event.target.value,
              props.value,
              props.updateMethod,
            )
        "
      />
    </div>
    <div
      v-else
      v-bind:class="{ 'fix-height': controlsStore.state.fixedHeight }"
    >
      {{ props.value }}
    </div>
  </td>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/button/buttonBase.scss";

td {
  width: auto;
  min-width: 100px;
  max-width: 200px;
}

.fix-height {
  height: min-content;
  width: 100%;

  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
  white-space: nowrap;
}

.cell-input {
  width: 100%;
  height: 18px;

  box-shadow: none;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;

  color: white;
  background-color: transparent;

  outline: none;
  border: none;
  border-color: inherit;

  font-size: 12.25px;
}
</style>
