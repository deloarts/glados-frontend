import { ref, onBeforeMount } from "vue";
import { defineStore } from "pinia";

import constants from "@/constants";
import router from "@/router/index";
import { boughtItemsRequest } from "@/requests/items";
import { useBoughtItemFilterStore } from "@/stores/filter.js";
import { getFilterParams } from "@/requests/params";

export const useBoughtItemsStore = defineStore("boughtItems", () => {
  const _filterStore = useBoughtItemFilterStore();

  const paused = ref(false);
  const loading = ref(false);
  const items = ref([
    {
      id: 0,
      status: "",
      group_1: "",
      created: "",
      creator_id: "",
      high_priority: "",
      notify_on_delivery: "",
      project: "",
      machine: "",
      quantity: "",
      unit: "",
      partnumber: "",
      definition: "",
      supplier: "",
      manufacturer: "",
      note_general: "",
      note_supplier: "",
      desired_delivery_date: "",
      requester_id: "",
      requested_date: "",
      orderer_id: "",
      ordered_date: "",
      expected_delivery_date: ref(new Date()),
      taken_over_id: "",
      delivery_date: "",
      storage_place: "",
    },
  ]);

  function clear() {
    items.value = [];
  }

  function pause(state) {
    paused.value = state;
  }

  function get() {
    console.log("Bought Items store requesting data ...");
    loading.value = true;

    const params = getFilterParams(_filterStore.state);
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
