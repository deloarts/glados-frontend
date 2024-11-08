<script setup lang="ts">
import { computed } from "vue";

import { useBoughtItemsControlsStore } from "@/stores/controls";

import IconBellRing from "@/components/icons/IconBellRing.vue";
import IconLocked from "@/components/icons/IconLocked.vue";

const controlsStore = useBoughtItemsControlsStore();

interface Props {
  number: number;
  lockedIcon?: boolean;
  bellIcon?: boolean;
  width?: number;
}

const props = withDefaults(defineProps<Props>(), {
  lockedIcon: false,
  bellIcon: false,
  width: 35,
});

const cssWidth = computed<string>(() => {
  return String(props.width) + "px";
});
</script>

<template>
  <td @contextmenu.prevent="">
    <IconLocked v-if="props.lockedIcon" class="locked-icon" />
    <IconBellRing v-else-if="props.bellIcon" class="bell-icon" />
    <div
      v-else
      v-bind:class="{ 'fix-height': controlsStore.state.fixedHeight }"
    >
      {{ props.number }}
    </div>
  </td>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/button/buttonBase.scss";

td {
  width: auto;
  min-width: v-bind(cssWidth);
  max-width: v-bind(cssWidth);
  text-align: center;
}

.fix-height {
  height: min-content;
  width: 100%;

  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
  white-space: nowrap;
}

.bell-icon {
  color: red;
  height: 12px;
  width: 12px;
  vertical-align: middle;
}

.locked-icon {
  color: orange;
  height: 12px;
  width: 12px;
  vertical-align: middle;
}
</style>
