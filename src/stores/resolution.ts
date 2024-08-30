import { ref, onBeforeMount, onBeforeUnmount, nextTick } from "vue";
import { defineStore } from "pinia";

import constants from "@/constants";

export const useResolutionStore = defineStore("resolution", () => {
  const gtMinWidth = ref<boolean>(false);
  const gtMinWidthTablet = ref<boolean>(false);
  const gtMinWidthDesktop = ref<boolean>(false);

  function onResize() {
    if (window.innerWidth >= constants.minWidth) {
      gtMinWidth.value = true;
    } else {
      gtMinWidth.value = false;
    }

    if (window.innerWidth >= constants.minWidthTablet) {
      gtMinWidthTablet.value = true;
    } else {
      gtMinWidthTablet.value = false;
    }

    if (window.innerWidth >= constants.minWidthDesktop) {
      gtMinWidthDesktop.value = true;
    } else {
      gtMinWidthDesktop.value = false;
    }
  }

  onBeforeMount(() => {
    onResize();
    nextTick(() => {
      window.addEventListener("resize", onResize);
    });
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", onResize);
  });

  return { gtMinWidth, gtMinWidthTablet, gtMinWidthDesktop };
});
