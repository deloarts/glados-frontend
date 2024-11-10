<script setup lang="ts">
import { computed } from "vue";

import { useBoughtItemsControlsStore } from "@/stores/controls";

import config from "@/config";

import IconBellRing from "@/components/icons/IconBellRing.vue";
import IconLocked from "@/components/icons/IconLocked.vue";

const controlsStore = useBoughtItemsControlsStore();

interface Props {
  number: number;
  id: number;
  lockedIcon?: boolean;
  bellIcon?: boolean;
  width?: number;
}

const props = withDefaults(defineProps<Props>(), {
  lockedIcon: false,
  bellIcon: false,
});

const cssWidth = computed<string>(() => {
  return String(props.width) + "px";
});

async function copyURL() {
  const url = `${config.localURL}/#/items/bought?id=${props.id}`;
  try {
    await navigator.clipboard.writeText(url);
    alert(`Copied '${url}'' to clipboard`);
  } catch ($e) {
    alert("Cannot copy");
  }
}
</script>

<template>
  <td @contextmenu.prevent="copyURL()">
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
@import "@/scss/dataTable/tableItem.scss";

td {
  min-width: v-bind(cssWidth);
  max-width: v-bind(cssWidth);
  text-align: center;

  position: -webkit-sticky;
  position: sticky;
  left: 0;
  z-index: 30;
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
