<script setup lang="ts">
import { computed } from "vue";

import TableHeadTitle from "@/components/dataTable/TableHeadTitle.vue";

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
  <TableHeadTitle
    :name="languageStore.l.userTime.table.date"
    v-model:width="computedWidth.date"
  />
</template>

<style scoped lang="scss"></style>
