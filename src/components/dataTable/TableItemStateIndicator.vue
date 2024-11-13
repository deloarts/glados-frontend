<script setup lang="ts">
import { ref, computed } from "vue";

import IconBellRing from "@/components/icons/IconBellRing.vue";
import IconLocked from "@/components/icons/IconLocked.vue";
import IconEdit from "../icons/IconEdit.vue";

interface Props {
  priority?: boolean;
  locked?: boolean;
  editable?: boolean;
  width?: number;
  fixedHeight?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  priority: false,
  locked: false,
  editable: false,
  fixedHeight: false,
});

const cssWidth = computed<string>(() => {
  return String(props.width) + "px";
});
</script>

<template>
  <td @contextmenu.prevent="">
    <IconBellRing v-if="props.priority" class="priority" />
    <IconLocked v-if="props.locked" class="locked" />
    <IconEdit v-if="props.editable" class="editable" />
  </td>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/dataTable/tableItem.scss";

td {
  min-width: v-bind(cssWidth);
  max-width: v-bind(cssWidth);
  text-align: center;

  left: 0;
  z-index: 30;
}

svg {
  padding-left: 2px;
  padding-right: 2px;
}

.priority {
  color: red;
  height: 12px;
  width: 12px;
  vertical-align: middle;
}

.locked {
  color: orange;
  height: 12px;
  width: 12px;
  vertical-align: middle;
}

.editable {
  color: white;
  height: 12px;
  width: 12px;
  vertical-align: middle;
}
</style>
