<script setup lang="ts">
import { computed } from "vue";

import TableHeadRowNumber from "@/components/dataTable/TableHeadRowNumber.vue";

import { userTimeColumnWidth } from "@/presets/columnWidth";

import { useLanguageStore } from "@/stores/language";

const languageStore = useLanguageStore();

const props = defineProps<{
  width: typeof userTimeColumnWidth;
}>();
const emit = defineEmits<{
  (e: "update:width", v: typeof userTimeColumnWidth): void;
}>();

const computedWidth = computed<typeof userTimeColumnWidth>({
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
    :value="languageStore.l.userTime.table.number"
    v-model:width="computedWidth.number"
  />
</template>

<style scoped lang="scss"></style>
