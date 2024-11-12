<script setup lang="ts">
import { computed } from "vue";

import IconExternalLink from "@/components/icons/IconExternalLink.vue";

interface Props {
  name: string;
  value: string;
  displayIcon?: boolean;
  width?: number;
  center?: boolean;
  fixedHeight?: boolean;
  newTab?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  displayIcon: false,
  center: false,
  fixedHeight: false,
  newTab: true,
});

const cssWidth = computed<string>(() => {
  return String(props.width) + "px";
});
const cssCenter = computed<string>(() => {
  return props.center ? "center" : "left";
});
</script>

<template>
  <td @contextmenu.prevent="">
    <div v-bind:class="{ 'fix-height': props.fixedHeight }">
      <a
        v-if="props.value"
        v-bind:href="props.value"
        :target="props.newTab ? '_blank' : '_self'"
      >
        <IconExternalLink v-if="props.displayIcon" class="weblink-icon" />
        <span v-else>{{ props.value }}</span>
      </a>
    </div>
  </td>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/dataTable/tableItem.scss";

td {
  min-width: v-bind(cssWidth);
  max-width: v-bind(cssWidth);
  text-align: v-bind(cssCenter);
}

.weblink-icon {
  color: white;
  height: 12px;
  width: 12px;
  vertical-align: middle;
}
</style>
