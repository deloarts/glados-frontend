<script setup lang="ts">
import { ref, onBeforeMount, onUnmounted } from "vue";

import { BoughtItemCreateSchema } from "@/schemas/boughtItem";

import { boughtItemColumnWidths } from "@/presets/columnWidth";

import TableMain from "@/components/dataTable/TableMain.vue";
import CreateItemTableHead from "./CreateItemTableHead.vue";
import CreateItemTableBody from "./CreateItemTableBody.vue";

const props = defineProps<{
  multiData: Array<BoughtItemCreateSchema>;
}>();

// ColumnWidths
const colW = ref<typeof boughtItemColumnWidths>();

onBeforeMount(() => {
  colW.value = JSON.parse(JSON.stringify(boughtItemColumnWidths));
});

onUnmounted(() => {});
</script>

<template>
  <div class="scope">
    <TableMain>
      <CreateItemTableHead v-model:colW="colW" />
      <CreateItemTableBody
        v-model:multi-data="props.multiData"
        v-model:colW="colW"
      />
    </TableMain>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/dataTable/tableScope.scss";
</style>
