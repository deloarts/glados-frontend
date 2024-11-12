import { ref, onBeforeMount } from "vue";
import { defineStore } from "pinia";

import constants from "@/constants";
import { boughtItemsRequest } from "@/requests/items";
import { useBoughtItemFilterStore } from "@/stores/filter";
import { getBoughtItemsFilterParams } from "@/requests/params";

// import type { ItemStoreProtocol } from "@/protocols/itemStoreProtocol";
import type { BoughtItemSchema } from "@/schemas/boughtItem";

export const useBoughtItemsStore = defineStore("boughtItems", () => {
  const _filterStore = useBoughtItemFilterStore();

  const loading = ref<boolean>(false);
  const paused = ref<boolean>(false);
  const items = ref<Array<BoughtItemSchema>>([]);
  const selectedIDs = ref<Array<number>>([]);

  function clear() {
    items.value = [];
    selectedIDs.value = [];
  }

  function pause(state: boolean) {
    paused.value = state;
  }

  function getItems(): Array<BoughtItemSchema> {
    get();
    return items.value;
  }

  function clearItems() {
    items.value = [];
  }

  function getSelection(): Array<number> {
    return selectedIDs.value;
  }

  function setSelection(itemIDs: Array<number>) {
    selectedIDs.value = itemIDs;
  }

  function clearSelection() {
    selectedIDs.value = [];
  }

  async function get(): Promise<any> {
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

  function fetchItems() {
    if (paused.value) {
      console.log("Bought Items store is paused.");
      setTimeout(
        fetchItems.bind(this),
        constants.patchBoughtItemsStoreInterval,
      );
    } else {
      get().then(() => {
        setTimeout(
          fetchItems.bind(this),
          constants.patchBoughtItemsStoreInterval,
        );
      });
    }
  }

  onBeforeMount(() => {
    clear();
    fetchItems();
  });

  return {
    loading,
    paused,
    items,
    clear,
    pause,
    getItems,
    clearItems,
    getSelection,
    setSelection,
    clearSelection,
  };
});
