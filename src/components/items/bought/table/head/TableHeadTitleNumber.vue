<script setup lang="ts">
import { computed } from "vue";

import TableHeadRowNumber from "@/components/dataTable/TableHeadRowNumber.vue";

import { boughtItemColumnWidths } from "@/presets/columnWidth";
import { useLanguageStore } from "@/stores/language";

const languageStore = useLanguageStore();

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
  <TableHeadRowNumber
    :value="languageStore.l.boughtItem.table.number"
    v-model:width="computedWidth.number"
  />
</template>

<style scoped lang="scss"></style>
