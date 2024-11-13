import { ref, onBeforeMount } from "vue";
import { defineStore } from "pinia";

import constants from "@/constants";
import { hostRequest } from "@/requests/host";

import type { AvailableOption } from "@/models/controls";
import type { HostConfigBoughtItemsStatusSchema } from "@/schemas/host";

import { setOptions, setOptionsFilter } from "@/helper/options.helper";

export const useStatusStore = defineStore("status", () => {
  const loading = ref(false);
  const boughtItemStatus = ref<HostConfigBoughtItemsStatusSchema>({
    open: null,
    requested: null,
    ordered: null,
    late: null,
    partial: null,
    delivered: null,
    canceled: null,
    lost: null,
  });
  const boughtItemStatusOption = ref<Array<AvailableOption>>([]);
  const boughtItemStatusOptionFilter = ref<Array<AvailableOption>>([]);

  function get() {
    console.log("Status store requesting data ...");
    loading.value = true;

    hostRequest.getConfigItemsBoughtStatus().then((response) => {
      loading.value = false;
      if (response.status === 200) {
        boughtItemStatus.value = response.data;

        const tempBoughtItemStatusOptions = [];
        for (const property in boughtItemStatus.value) {
          tempBoughtItemStatusOptions.push(boughtItemStatus.value[property]);
        }
        boughtItemStatusOption.value = setOptions(tempBoughtItemStatusOptions);
        boughtItemStatusOptionFilter.value = setOptionsFilter(
          tempBoughtItemStatusOptions,
        );
        console.log("Status store got data from server.");
      }
      setTimeout(get.bind(this), constants.patchServerConfigInterval);
    });
  }

  onBeforeMount(() => {
    get();
  });

  return {
    loading,
    boughtItemStatus,
    boughtItemStatusOption,
    boughtItemStatusOptionFilter,
  };
});
