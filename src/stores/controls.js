import { ref, watch, onBeforeMount } from "vue";
import { defineStore } from "pinia";

export const useBoughtItemsControlsStore = defineStore(
  "boughtItemsControls",
  () => {
    const state = ref({
      changelog: false,
      rainbow: false,
      textOnly: false,
      fixedHeight: false,
      unclutter: false,
      requestView: false,
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
