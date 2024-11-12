<script setup lang="ts">
import { projectsColumnWidths } from "@/presets/columnWidth";

import TableHeadRow from "@/components/dataTable/TableHeadRow.vue";
import TableHeadEmpty from "@/components/dataTable/TableHeadEmpty.vue";

import TableHeadTitleNumber from "./head/TableHeadTitleNumber.vue";
import TableHeadTitleID from "./head/TableHeadTitleID.vue";
import TableHeadTitleProjectNumber from "./head/TableHeadTitleProjectNumber.vue";
import TableHeadTitleProductNumber from "./head/TableHeadTitleProductNumber.vue";
import TableHeadTitleCustomer from "./head/TableHeadTitleCustomer.vue";
import TableHeadTitleDescription from "./head/TableHeadTitleDescription.vue";
import TableHeadTitleDesignatedUser from "./head/TableHeadTitleDesignatedUser.vue";
import TableHeadTitleCreatedDate from "./head/TableHeadTitleCreatedDate.vue";
import TableHeadTitleState from "./head/TableHeadTitleState.vue";

import TableHeadFilterNumber from "./head/TableHeadFilterNumber.vue";
import TableHeadFilterID from "./head/TableHeadFilterID.vue";
import TableHeadFilterProjectNumber from "./head/TableHeadFilterProjectNumber.vue";
import TableHeadFilterProductNumber from "./head/TableHeadFilterProductNumber.vue";
import TableHeadFilterCustomer from "./head/TableHeadFilterCustomer.vue";
import TableHeadFilterDescription from "./head/TableHeadFilterDescription.vue";
import TableHeadFilterDesignatedUser from "./head/TableHeadFilterDesignatedUser.vue";
import TableHeadFilterCreatedDate from "./head/TableHeadFilterCreatedDate.vue";
import TableHeadFilterState from "./head/TableHeadFilterState.vue";

const props = defineProps<{
  colW: typeof projectsColumnWidths;
}>();
</script>

<template>
  <thead>
    <TableHeadRow>
      <TableHeadTitleNumber v-model:width="props.colW" />
      <TableHeadTitleID v-model:width="props.colW" />
      <TableHeadTitleProjectNumber v-model:width="props.colW" />
      <TableHeadTitleProductNumber v-model:width="props.colW" />
      <TableHeadTitleCustomer v-model:width="props.colW" />
      <TableHeadTitleDescription v-model:width="props.colW" />
      <TableHeadTitleDesignatedUser v-model:width="props.colW" />
      <TableHeadTitleCreatedDate v-model:width="props.colW" />
      <TableHeadTitleState v-model:width="props.colW" />
      <TableHeadEmpty />
    </TableHeadRow>
    <TableHeadRow>
      <TableHeadFilterNumber v-model:width="props.colW" />
      <TableHeadFilterID v-model:width="props.colW" />
      <TableHeadFilterProjectNumber v-model:width="props.colW" />
      <TableHeadFilterProductNumber v-model:width="props.colW" />
      <TableHeadFilterCustomer v-model:width="props.colW" />
      <TableHeadFilterDescription v-model:width="props.colW" />
      <TableHeadFilterDesignatedUser v-model:width="props.colW" />
      <TableHeadFilterCreatedDate v-model:width="props.colW" />
      <TableHeadFilterState v-model:width="props.colW" />
      <TableHeadEmpty />
    </TableHeadRow>
  </thead>
</template>

<style lang="scss"></style>
