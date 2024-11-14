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

// Item status indication
const finished = computed<boolean>(() => {
  return props.item.status == statusStore.boughtItemStatus.delivered;
});
const late = computed<boolean>(() => {
  return props.item.status == statusStore.boughtItemStatus.late;
});
const canceled = computed<boolean>(() => {
  return props.item.status == statusStore.boughtItemStatus.canceled;
});
const lost = computed<boolean>(() => {
  return props.item.status == statusStore.boughtItemStatus.lost;
});

// Item priority indication
const priority = computed<boolean>(() => {
  return !finished.value && !canceled.value && props.item.high_priority;
});

// Custom edit rules
const editable = computed<boolean>(() => {
  if (
    !finished.value &&
    !late.value &&
    !canceled.value &&
    !lost.value &&
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
  return (
    !finished.value &&
    !late.value &&
    !canceled.value &&
    !lost.value &&
    !editable.value
  );
});
</script>

<template>
  <TableItemStateIndicator
    v-if="controlsStore.columns.state"
    :alert="late"
    :priority="priority"
    :locked="locked"
    :editable="editable"
    :finished="finished"
    :canceled="canceled"
    :lost="lost"
    v-model:width="props.width.state"
    :fixed-height="controlsStore.state.fixedHeight"
  />
</template>

<style scoped lang="scss"></style>
