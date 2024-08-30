import { ref, onBeforeMount } from "vue";
import { defineStore } from "pinia";

import constants from "@/constants";
import { hostRequest } from "@/requests/host";

import type { HostConfigBoughtItemsUnitsSchema } from "@/schemas/host";

export const useUnitsStore = defineStore("units", () => {
  const loading = ref<boolean>(false);
  const boughtItemUnits = ref<HostConfigBoughtItemsUnitsSchema>({
    default: null,
    values: [],
  });

  function get() {
    console.log("Units store requesting data ...");
    loading.value = true;

    hostRequest.getConfigItemsBoughtUnits().then((response) => {
      loading.value = false;
      if (response.status === 200) {
        boughtItemUnits.value = response.data;
        console.log("Units store got data from server.");
      }
      setTimeout(get.bind(this), constants.patchServerConfigInterval);
    });
  }

  onBeforeMount(() => {
    get();
  });

  return { loading, boughtItemUnits };
});
