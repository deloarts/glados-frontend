import { ref, onBeforeMount } from "vue";
import { defineStore } from "pinia";

import constants from "@/constants";
import { boughtItemsRequest } from "@/requests/items";
import { useBoughtItemFilterStore } from "@/stores/filter";
import { getBoughtItemsFilterParams } from "@/requests/params";

import type { BoughtItemSchema } from "@/schemas/boughtItem";

export const useBoughtItemsStore = defineStore("boughtItems", () => {
  const _filterStore = useBoughtItemFilterStore();

  const paused = ref<boolean>(false);
  const loading = ref<boolean>(false);
  const items = ref<Array<BoughtItemSchema>>([]);

  function clear() {
    items.value = [];
  }

  function pause(state: boolean) {
    paused.value = state;
  }

  function get() {
    console.log("Bought Items store requesting data ...");
    loading.value = true;

    const params = getBoughtItemsFilterParams(_filterStore.state);
    return boughtItemsRequest.getItems(params).then((response) => {
      loading.value = false;
      if (response.status === 200) {
        items.value = response.data;
        console.log("Bought Items store got data from server.");
      }
      return response;
    });
  }

  function getItems() {
    if (paused.value) {
      console.log("Bought Items store is paused.");
      setTimeout(getItems.bind(this), constants.patchBoughtItemsStoreInterval);
    } else {
      get().then(() => {
        setTimeout(
          getItems.bind(this),
          constants.patchBoughtItemsStoreInterval,
        );
      });
    }
  }

  onBeforeMount(() => {
    clear();
    getItems();
  });

  return { loading, paused, items, get, clear, pause };
});
