<script setup lang="ts">
import TableHeadFilterSelect from "@/components/dataTable/TableHeadFilterSelect.vue";

import { boughtItemColumnWidths } from "@/presets/boughtItemsColumnWidths";

import { useBoughtItemsStore } from "@/stores/boughtItems";
import { useBoughtItemFilterStore } from "@/stores/filter";
import { useUsersStore } from "@/stores/user";
import { useBoughtItemsControlsStore } from "@/stores/controls";

const boughtItemsControlsStore = useBoughtItemsControlsStore();
const boughtItemsStore = useBoughtItemsStore();
const boughtItemsFilterStore = useBoughtItemFilterStore();
const usersStore = useUsersStore();

const props = defineProps<{
  width: typeof boughtItemColumnWidths;
}>();
</script>

<template>
  <TableHeadFilterSelect
    v-if="boughtItemsControlsStore.columns.requesterID"
    name="Requester ID"
    :options="usersStore.usersOptionsFilter"
    :item-store="boughtItemsStore"
    :filter-store="boughtItemsFilterStore"
    filter-store-key="requesterId"
    v-model:width="props.width.requesterId"
  />
</template>

<style scoped lang="scss"></style>
