import { ref, onBeforeMount } from "vue";
import { defineStore } from "pinia";

import constants from "@/constants";
import { hostRequest } from "@/requests/host";

import type { AvailableOption } from "@/models/controls";
import type { HostConfigBoughtItemsUnitsSchema } from "@/schemas/host";

import { setOptions, setOptionsFilter } from "@/helper/options.helper";

export const useUnitsStore = defineStore("units", () => {
  const loading = ref<boolean>(false);
  const boughtItemUnits = ref<HostConfigBoughtItemsUnitsSchema>({
    default: null,
    values: [],
  });
  const boughtItemUnitsOption = ref<Array<AvailableOption>>([]);
  const boughtItemUnitsOptionFilter = ref<Array<AvailableOption>>([]);

  async function get() {
    console.log("Units store requesting data ...");
    loading.value = true;

    return hostRequest.getConfigItemsBoughtUnits().then((response) => {
      loading.value = false;
      if (response.status === 200) {
        boughtItemUnits.value = response.data;
        boughtItemUnitsOption.value = setOptions(boughtItemUnits.value.values);
        boughtItemUnitsOptionFilter.value = setOptionsFilter(
          boughtItemUnits.value.values,
        );
        console.log("Units store got data from server.");
      }
      return response;
    });
  }

  function fetch() {
    get().then(() => {
      setTimeout(fetch.bind(this), constants.patchServerConfigInterval);
    });
  }

  onBeforeMount(() => {
    fetch();
  });

  return {
    loading,
    boughtItemUnits,
    boughtItemUnitsOption,
    boughtItemUnitsOptionFilter,
  };
});
