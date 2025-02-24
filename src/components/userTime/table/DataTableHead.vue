<script setup lang="ts">
import { computed } from "vue";

import { userTimeColumnWidth } from "@/presets/columnWidth";

import TableHeadRow from "@/components/dataTable/TableHeadRow.vue";
import TableHeadEmpty from "@/components/dataTable/TableHeadEmpty.vue";

import TableHeadTitleNumber from "./head/TableHeadTitleNumber.vue";
// import TableHeadTitleID from "./head/TableHeadTitleID.vue";
import TableHeadTitleWeek from "./head/TableHeadTitleWeek.vue";
import TableHeadTitleDay from "./head/TableHeadTitleDay.vue";
import TableHeadTitleDate from "./head/TableHeadTitleDate.vue";
import TableHeadTitleLogin from "./head/TableHeadTitleLogin.vue";
import TableHeadTitleLogout from "./head/TableHeadTitleLogout.vue";
import TableHeadTitleDuration from "./head/TableHeadTitleDuration.vue";
import TableHeadTitleNote from "./head/TableHeadTitleNote.vue";

// import TableHeadFilterNumber from "./head/TableHeadFilterNumber.vue";
// import TableHeadFilterID from "./head/TableHeadFilterID.vue";
// import TableHeadFilterWeek from "./head/TableHeadFilterWeek.vue";
// import TableHeadFilterDay from "./head/TableHeadFilterDay.vue";
// import TableHeadFilterDate from "./head/TableHeadFilterDate.vue";
// import TableHeadFilterLogin from "./head/TableHeadFilterLogin.vue";
// import TableHeadFilterLogout from "./head/TableHeadFilterLogout.vue";
// import TableHeadFilterDuration from "./head/TableHeadFilterDuration.vue";
// import TableHeadFilterNote from "./head/TableHeadFilterNote.vue";

const props = defineProps<{
  colW: typeof userTimeColumnWidth;
}>();
const emit = defineEmits<{
  (e: "update:colW", v: typeof userTimeColumnWidth): void;
}>();

const computedColW = computed<typeof userTimeColumnWidth>({
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
      <!-- <TableHeadTitleID v-model:width="computedColW" /> -->
      <TableHeadTitleWeek v-model:width="computedColW" />
      <TableHeadTitleDay v-model:width="computedColW" />
      <TableHeadTitleDate v-model:width="computedColW" />
      <TableHeadTitleLogin v-model:width="computedColW" />
      <TableHeadTitleLogout v-model:width="computedColW" />
      <TableHeadTitleDuration v-model:width="computedColW" />
      <TableHeadTitleNote v-model:width="computedColW" />
      <TableHeadEmpty />
    </TableHeadRow>
    <!-- <TableHeadRow>
      <TableHeadFilterNumber v-model:width="computedColW" />
      <TableHeadFilterID v-model:width="computedColW" />
      <TableHeadFilterWeek v-model:width="computedColW" />
      <TableHeadFilterDay v-model:width="computedColW" />
      <TableHeadFilterDate v-model:width="computedColW" />
      <TableHeadFilterLogin v-model:width="computedColW" />
      <TableHeadFilterLogout v-model:width="computedColW" />
      <TableHeadFilterDuration v-model:width="computedColW" />
      <TableHeadFilterNote v-model:width="computedColW" />
      <TableHeadEmpty />
    </TableHeadRow> -->
  </thead>
</template>

<style lang="scss"></style>
