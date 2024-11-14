<script setup lang="ts">
import { ref, computed } from "vue";

import IconAlert from "@/components/icons/IconAlert.vue";
import IconCheck from "@/components/icons/IconCheck.vue";
import IconBellRing from "@/components/icons/IconBellRing.vue";
import IconLocked from "@/components/icons/IconLocked.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconCancel from "@/components/icons/IconCancel.vue";
import IconGhost from "@/components/icons/IconGhost.vue";

interface Props {
  priority?: boolean;
  locked?: boolean;
  editable?: boolean;
  finished?: boolean;
  canceled?: boolean;
  lost?: boolean;
  alert?: boolean;
  width?: number;
  fixedHeight?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  priority: false,
  locked: false,
  editable: false,
  finished: false,
  canceled: false,
  lost: false,
  alert: false,
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
    <IconCheck v-if="props.finished" class="finished" />
    <IconCancel v-if="props.canceled" class="canceled" />
    <IconGhost v-if="props.lost" class="lost" />
    <IconAlert v-if="props.alert" class="alert" />
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

.finished {
  color: limegreen;
  height: 12px;
  width: 12px;
  vertical-align: middle;
}

.canceled {
  color: red;
  height: 12px;
  width: 12px;
  vertical-align: middle;
}

.lost {
  color: lightgray;
  height: 12px;
  width: 12px;
  vertical-align: middle;
}

.alert {
  color: orange;
  height: 12px;
  width: 12px;
  vertical-align: middle;
}
</style>
