<script setup lang="ts">
import { ref } from "vue";

import { useProjectsStore } from "@/stores/projects";

import { getSelection } from "@/helper/selection.helper";

import { projectsColumnWidths } from "@/presets/columnWidth";

import DataTableBodyRow from "@/components/dataTable/DataTableBodyRow.vue";
import TableItemEmpty from "@/components/dataTable/TableItemEmpty.vue";

import TableItemNumber from "./item/TableItemNumber.vue";
import TableItemID from "./item/TableItemID.vue";
import TableItemProjectNumber from "./item/TableItemProjectNumber.vue";
import TableItemProductNumber from "./item/TableItemProductNumber.vue";
import TableItemCustomer from "./item/TableItemCustomer.vue";
import TableItemDescription from "./item/TableItemDescription.vue";
import TableItemDesignatedUser from "./item/TableItemDesignatedUser.vue";
import TableItemCreatedDate from "./item/TableItemCreatedDate.vue";
import TableItemState from "./item/TableItemState.vue";

const projectsStore = useProjectsStore();

const props = defineProps<{
  colW: typeof projectsColumnWidths;
}>();

// Selection
const lineIndex = ref<number>(0);
function multiSelect(event: Event, id: number, index: number) {
  lineIndex.value = getSelection(
    event,
    id,
    index,
    lineIndex.value,
    projectsStore,
  );
}
</script>

<template>
  <tbody>
    <DataTableBodyRow
      v-for="(item, index) in projectsStore.items"
      :key="item.id"
      :selected="projectsStore.getSelection().includes(item.id)"
      v-on:click="multiSelect($event, item.id, index)"
    >
      <TableItemNumber :index="index" :item="item" v-model:width="props.colW" />
      <TableItemID :item="item" v-model:width="props.colW" />
      <TableItemProjectNumber :item="item" v-model:width="props.colW" />
      <TableItemProductNumber :item="item" v-model:width="props.colW" />
      <TableItemCustomer :item="item" v-model:width="props.colW" />
      <TableItemDescription :item="item" v-model:width="props.colW" />
      <TableItemDesignatedUser :item="item" v-model:width="props.colW" />
      <TableItemCreatedDate :item="item" v-model:width="props.colW" />
      <TableItemState :item="item" v-model:width="props.colW" />
      <TableItemEmpty />
    </DataTableBodyRow>
  </tbody>
</template>

<style lang="scss"></style>
