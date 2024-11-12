<script setup lang="ts">
import { ref, onBeforeMount, onUnmounted } from "vue";

import { useBoughtItemsStore } from "@/stores/boughtItems";

import Spinner from "@/components/spinner/LoadingSpinner.vue";

import { boughtItemColumnWidths } from "@/presets/columnWidth";

import TableMain from "@/components/dataTable/TableMain.vue";
import DataTableHead from "./DataTableHead.vue";
import DataTableBody from "./DataTableBody.vue";

// Store
const boughtItemsStore = useBoughtItemsStore();

// ColumnWidths
const colW = ref(boughtItemColumnWidths);

function eventKeyUp(event: any) {
  if (event.key === "Escape") {
    boughtItemsStore.clearSelection();
  }
}

onBeforeMount(() => {
  document.addEventListener("keyup", eventKeyUp);
});

onUnmounted(() => {
  document.removeEventListener("keyup", eventKeyUp);
});
</script>

<template>
  <div class="scope">
    <Spinner
      class="spinner"
      v-if="boughtItemsStore.loading && boughtItemsStore.items.length == 0"
    />
    <TableMain>
      <DataTableHead v-model:colW="colW" />
      <DataTableBody v-model:colW="colW" />
    </TableMain>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.scope {
  height: 100%;
  width: calc(100% - 10px);
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 5px;

  overflow: hidden;
}

.spinner {
  z-index: 999;
  position: absolute;
  width: auto;
  height: auto;
  left: 50vw;
  top: 260px;
  transform: translate(-50%, -50%);
}
</style>
