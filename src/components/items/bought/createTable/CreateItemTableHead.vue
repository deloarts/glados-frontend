<script setup lang="ts">
import { computed } from "vue";

import { boughtItemColumnWidths } from "@/presets/columnWidth";

import TableHeadRow from "@/components/dataTable/TableHeadRow.vue";
import TableHeadEmpty from "@/components/dataTable/TableHeadEmpty.vue";

import TableHeadTitleNumber from "@/components/items/bought/dataTable/head/TableHeadTitleNumber.vue";
import TableHeadTitleProjectNumber from "@/components/items/bought/dataTable/head/TableHeadTitleProjectNumber.vue";
import TableHeadTitleProductNumber from "@/components/items/bought/dataTable/head/TableHeadTitleProductNumber.vue";
import TableHeadTitleQuantity from "@/components/items/bought/dataTable/head/TableHeadTitleQuantity.vue";
import TableHeadTitleUnit from "@/components/items/bought/dataTable/head/TableHeadTitleUnit.vue";
import TableHeadTitleLink from "@/components/items/bought/dataTable/head/TableHeadTitleLink.vue";
import TableHeadTitlePartNumber from "@/components/items/bought/dataTable/head/TableHeadTitlePartNumber.vue";
import TableHeadTitleOrderNumber from "@/components/items/bought/dataTable/head/TableHeadTitleOrderNumber.vue";
import TableHeadTitleManufacturer from "@/components/items/bought/dataTable/head/TableHeadTitleManufacturer.vue";
import TableHeadTitleSupplier from "@/components/items/bought/dataTable/head/TableHeadTitleSupplier.vue";
import TableHeadTitleGroup from "@/components/items/bought/dataTable/head/TableHeadTitleGroup.vue";
import TableHeadTitleNoteGeneral from "@/components/items/bought/dataTable/head/TableHeadTitleNoteGeneral.vue";
import TableHeadTitleNoteSupplier from "@/components/items/bought/dataTable/head/TableHeadTitleNoteSupplier.vue";
import TableHeadTitleDesiredDate from "@/components/items/bought/dataTable/head/TableHeadTitleDesiredDate.vue";

const props = defineProps<{
  colW: typeof boughtItemColumnWidths;
}>();
const emit = defineEmits<{
  (e: "update:colW", v: typeof boughtItemColumnWidths): void;
}>();

const computedColW = computed<typeof boughtItemColumnWidths>({
  get() {
    return props.colW;
  },
  set(newValue) {
    emit("update:colW", newValue);
    return newValue;
  },
});
</script>

<template>
  <thead>
    <TableHeadRow>
      <th class="button-head"></th>
      <th class="button-head"></th>
      <TableHeadTitleNumber v-model:width="computedColW" />
      <TableHeadTitleProjectNumber v-model:width="computedColW" />
      <TableHeadTitleProductNumber v-model:width="computedColW" />
      <TableHeadTitleQuantity v-model:width="computedColW" />
      <TableHeadTitleUnit v-model:width="computedColW" />
      <TableHeadTitleLink v-model:width="computedColW" />
      <TableHeadTitlePartNumber v-model:width="computedColW" />
      <TableHeadTitleOrderNumber v-model:width="computedColW" />
      <TableHeadTitleManufacturer v-model:width="computedColW" />
      <TableHeadTitleSupplier v-model:width="computedColW" />
      <TableHeadTitleGroup v-model:width="computedColW" />
      <TableHeadTitleNoteGeneral v-model:width="computedColW" />
      <TableHeadTitleNoteSupplier v-model:width="computedColW" />
      <TableHeadEmpty />
    </TableHeadRow>
  </thead>
</template>

<style lang="scss">
.button-head {
  min-width: 45px;
  text-align: center;
}
</style>
