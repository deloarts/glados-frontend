<script setup lang="ts">
import { computed } from "vue";

import { projectsColumnWidths } from "@/presets/columnWidth";

import TableHeadRow from "@/components/dataTable/TableHeadRow.vue";
import TableHeadEmpty from "@/components/dataTable/TableHeadEmpty.vue";

import TableHeadTitleNumber from "./head/TableHeadTitleNumber.vue";
import TableHeadTitleID from "./head/TableHeadTitleID.vue";
import TableHeadTitleProjectNumber from "./head/TableHeadTitleProjectNumber.vue";
import TableHeadTitleProductNumber from "./head/TableHeadTitleProductNumber.vue";
import TableHeadTitleProjectLink from "./head/TableHeadTitleProjectLink.vue";
import TableHeadTitleCustomer from "./head/TableHeadTitleCustomer.vue";
import TableHeadTitleDescription from "./head/TableHeadTitleDescription.vue";
import TableHeadTitleDesignatedUser from "./head/TableHeadTitleDesignatedUser.vue";
import TableHeadTitleCreatedDate from "./head/TableHeadTitleCreatedDate.vue";
import TableHeadTitleState from "./head/TableHeadTitleState.vue";

import TableHeadFilterNumber from "./head/TableHeadFilterNumber.vue";
import TableHeadFilterID from "./head/TableHeadFilterID.vue";
import TableHeadFilterProjectNumber from "./head/TableHeadFilterProjectNumber.vue";
import TableHeadFilterProductNumber from "./head/TableHeadFilterProductNumber.vue";
import TableHeadFilterProjectLink from "./head/TableHeadFilterProjectLink.vue";
import TableHeadFilterCustomer from "./head/TableHeadFilterCustomer.vue";
import TableHeadFilterDescription from "./head/TableHeadFilterDescription.vue";
import TableHeadFilterDesignatedUser from "./head/TableHeadFilterDesignatedUser.vue";
import TableHeadFilterCreatedDate from "./head/TableHeadFilterCreatedDate.vue";
import TableHeadFilterState from "./head/TableHeadFilterState.vue";

const props = defineProps<{
  colW: typeof projectsColumnWidths;
}>();
const emit = defineEmits<{
  (e: "update:colW", v: typeof projectsColumnWidths): void;
}>();

const computedColW = computed<typeof projectsColumnWidths>({
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
      <TableHeadTitleNumber v-model:width="computedColW" />
      <TableHeadTitleID v-model:width="computedColW" />
      <TableHeadTitleProjectNumber v-model:width="computedColW" />
      <TableHeadTitleProductNumber v-model:width="computedColW" />
      <TableHeadTitleProjectLink v-model:width="computedColW" />
      <TableHeadTitleCustomer v-model:width="computedColW" />
      <TableHeadTitleDescription v-model:width="computedColW" />
      <TableHeadTitleDesignatedUser v-model:width="computedColW" />
      <TableHeadTitleCreatedDate v-model:width="computedColW" />
      <TableHeadTitleState v-model:width="computedColW" />
      <TableHeadEmpty />
    </TableHeadRow>
    <TableHeadRow>
      <TableHeadFilterNumber v-model:width="computedColW" />
      <TableHeadFilterID v-model:width="computedColW" />
      <TableHeadFilterProjectNumber v-model:width="computedColW" />
      <TableHeadFilterProductNumber v-model:width="computedColW" />
      <TableHeadFilterProjectLink v-model:width="computedColW" />
      <TableHeadFilterCustomer v-model:width="computedColW" />
      <TableHeadFilterDescription v-model:width="computedColW" />
      <TableHeadFilterDesignatedUser v-model:width="computedColW" />
      <TableHeadFilterCreatedDate v-model:width="computedColW" />
      <TableHeadFilterState v-model:width="computedColW" />
      <TableHeadEmpty />
    </TableHeadRow>
  </thead>
</template>

<style lang="scss"></style>
