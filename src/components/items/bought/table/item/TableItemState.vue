<script setup lang="ts">
import { computed } from "vue";

import type { BoughtItemSchema } from "@/schemas/boughtItem";

import TableItemStateIndicator from "@/components/dataTable/TableItemStateIndicator.vue";

import { boughtItemColumnWidths } from "@/presets/columnWidth";

import { useUserStore } from "@/stores/user";
import { useBoughtItemsControlsStore } from "@/stores/controls";
import { useStatusStore } from "@/stores/status";

const userStore = useUserStore();
const controlsStore = useBoughtItemsControlsStore();
const statusStore = useStatusStore();

const props = defineProps<{
  item: BoughtItemSchema;
  width: typeof boughtItemColumnWidths;
}>();

const priority = computed<boolean>(() => {
  return props.item.high_priority;
});
const editable = computed<boolean>(() => {
  if (
    props.item.project_is_active &&
    (userStore.user.is_superuser ||
      userStore.user.is_adminuser ||
      (userStore.user.id == props.item.creator_id &&
        props.item.status == statusStore.boughtItemStatus.open))
  ) {
    return true;
  }
  return false;
});
const locked = computed<boolean>(() => {
  return !editable.value;
});
</script>

<template>
  <TableItemStateIndicator
    v-if="controlsStore.columns.state"
    :priority="priority"
    :locked="locked"
    :editable="editable"
    v-model:width="props.width.state"
    :fixed-height="controlsStore.state.fixedHeight"
  />
</template>

<style scoped lang="scss"></style>
