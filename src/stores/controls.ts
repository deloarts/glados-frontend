import { ref, watch, onBeforeMount } from "vue";
import { defineStore } from "pinia";

import type { BoughtItemControls } from "@/models/controls";

export const useBoughtItemsControlsStore = defineStore(
  "boughtItemsControls",
  () => {
    const state = ref<BoughtItemControls>({
      changelog: false,
      rainbow: false,
      fixedHeight: true,
      unclutter: false,
      lockCols: false,
    });

    watch(
      state,
      () => {
        localStorage.setItem(
          "gladosBoughtItemControls",
          JSON.stringify(state.value),
        );
        console.log("Saved bought items controls to local storage.");
      },
      { deep: true },
    );

    onBeforeMount(() => {
      const ls = localStorage.getItem("gladosBoughtItemControls");
      if (ls != null) {
        state.value = JSON.parse(ls);
        console.log("Got bought items controls from local storage.");
      }
    });

    return { state };
  },
);
