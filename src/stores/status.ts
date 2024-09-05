import { ref, onBeforeMount } from "vue";
import { defineStore } from "pinia";

import constants from "@/constants";
import { hostRequest } from "@/requests/host";

import type { HostConfigBoughtItemsStatusSchema } from "@/schemas/host";

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

  function get() {
    console.log("Status store requesting data ...");
    loading.value = true;

    hostRequest.getConfigItemsBoughtStatus().then((response) => {
      loading.value = false;
      if (response.status === 200) {
        boughtItemStatus.value = response.data;
        console.log("Status store got data from server.");
      }
      setTimeout(get.bind(this), constants.patchServerConfigInterval);
    });
  }

  onBeforeMount(() => {
    get();
  });

  return { loading, boughtItemStatus };
});