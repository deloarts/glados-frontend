<script setup lang="ts">
import { computed } from "vue";

import TableHeadTitle from "@/components/dataTable/TableHeadTitle.vue";

import { boughtItemColumnWidths } from "@/presets/columnWidth";
import { useLanguageStore } from "@/stores/language";
import { useBoughtItemsControlsStore } from "@/stores/controls";

const languageStore = useLanguageStore();
const boughtItemsControlsStore = useBoughtItemsControlsStore();

const props = defineProps<{
  width: typeof boughtItemColumnWidths;
}>();
const emit = defineEmits<{
  (e: "update:width", v: typeof boughtItemColumnWidths): void;
}>();

const computedWidth = computed<typeof boughtItemColumnWidths>({
  get() {
    return props.width;
  },
  set(newValue) {
    emit("update:width", newValue);
    return newValue;
  },
});
</script>

<template>
  <TableHeadTitle
    v-if="boughtItemsControlsStore.columns.status"
    :name="languageStore.l.boughtItem.table.status"
    v-model:width="computedWidth.status"
  />
</template>

<style scoped lang="scss"></style>
