import { ref, watch, onBeforeMount } from "vue";
import { defineStore } from "pinia";

import constants from "@/constants";
import { hostRequest } from "@/requests/host";

import type {
  HostConfigBoughtItemsFilterSchema,
  HostConfigProjectFilterSchema,
} from "@/schemas/host";

interface BoughtItemPreset {
  [key: string]: HostConfigBoughtItemsFilterSchema;
}

export const useBoughtItemFilterStore = defineStore("boughtItemFilter", () => {
  const loading = ref<boolean>(false);
  const presets = ref<BoughtItemPreset>({});
  const state = ref<HostConfigBoughtItemsFilterSchema>({
    limit: "100",
    ignoreDelivered: false,
    ignoreCanceled: false,
    ignoreLost: false,
    highPriority: null,
    creatorId: null,
    createdDate: null,
    changedDateFrom: null,
    desiredDate: null,
    requesterId: null,
    requestedDate: null,
    ordererId: null,
    orderedDate: null,
    expectedDate: null,
    deliveredDate: null,
    sortBy: "id",
    id: null,
    status: null,
    projectNumber: null,
    machine: null,
    quantity: null,
    unit: null,
    partnumber: null,
    orderNumber: null,
    manufacturer: null,
    supplier: null,
    group1: null,
    noteGeneral: null,
    noteSupplier: null,
    storagePlace: null,
    receiverId: null,
  });

  function reset() {
    state.value = {
      limit: "100",
      ignoreDelivered: false,
      ignoreCanceled: false,
      ignoreLost: false,
      highPriority: null,
      creatorId: null,
      createdDate: null,
      changedDateFrom: null,
      desiredDate: null,
      requesterId: null,
      requestedDate: null,
      ordererId: null,
      orderedDate: null,
      expectedDate: null,
      deliveredDate: null,
      sortBy: "id",
      id: null,
      status: null,
      projectNumber: null,
      machine: null,
      quantity: null,
      unit: null,
      partnumber: null,
      orderNumber: null,
      manufacturer: null,
      supplier: null,
      group1: null,
      noteGeneral: null,
      noteSupplier: null,
      storagePlace: null,
      receiverId: null,
    };
    console.log("Reset bought items filter");
  }

  function saveMy() {
    localStorage.setItem(
      "gladosBoughtItemMyFilter",
      JSON.stringify(state.value),
    );
    console.log("Saved bought items user filter to local storage.");
  }

  function loadMy() {
    const filterObject = localStorage.getItem("gladosBoughtItemMyFilter");
    if (filterObject != null) {
      state.value = JSON.parse(filterObject);
      console.log("Got bought items user filter from local storage.");
    }
  }

  function applyPreset(name: string) {
    if (name in presets.value) {
      const p = presets.value[name];
      state.value = {
        limit: p.limit,
        ignoreDelivered: p.ignoreDelivered,
        ignoreCanceled: p.ignoreCanceled,
        ignoreLost: p.ignoreLost,
        highPriority: p.highPriority,
        creatorId: p.creatorId,
        createdDate: p.createdDate,
        changedDateFrom: p.changedDateFrom,
        desiredDate: p.deliveredDate,
        requesterId: p.requesterId,
        requestedDate: p.requestedDate,
        ordererId: p.ordererId,
        orderedDate: p.orderedDate,
        expectedDate: p.expectedDate,
        deliveredDate: p.deliveredDate,
        sortBy: p.sortBy,
        id: p.id,
        status: p.status,
        projectNumber: p.projectNumber,
        machine: p.machine,
        quantity: p.quantity,
        unit: p.unit,
        partnumber: p.partnumber,
        orderNumber: p.orderNumber,
        manufacturer: p.manufacturer,
        supplier: p.supplier,
        group1: p.group1,
        noteGeneral: p.noteGeneral,
        noteSupplier: p.noteSupplier,
        storagePlace: p.storagePlace,
        receiverId: p.receiverId,
      };
    }
  }

  function get() {
    console.log("Filter store is requesting presets ...");
    loading.value = true;

    return hostRequest.getConfigItemsBoughtFilters().then((response) => {
      loading.value = false;
      if (response.status === 200) {
        presets.value = response.data;
        console.log("Filter store got data from server.");
      }
      return response;
    });
  }

  function getPresets() {
    get().then(() => {
      setTimeout(getPresets.bind(this), constants.patchServerConfigInterval);
    });
  }

  watch(
    state,
    () => {
      localStorage.setItem(
        "gladosBoughtItemFilter",
        JSON.stringify(state.value),
      );
      console.log("Saved bought items filter to local storage.");
    },
    { deep: true },
  );

  onBeforeMount(() => {
    getPresets();

    const ls = localStorage.getItem("gladosBoughtItemFilter");
    if (ls != null) {
      state.value = JSON.parse(ls);
      console.log("Got bought items filter from local storage.");
    }
  });

  return {
    state,
    presets,
    get,
    reset,
    applyPreset,
    saveMy,
    loadMy,
  };
});

export const useProjectFilterStore = defineStore("projectFilter", () => {
  const state = ref<HostConfigProjectFilterSchema>({
    skip: null,
    limit: null,
    number: null,
    machine: null,
    customer: null,
    description: null,
    isActive: null,
    designatedUserId: null,
  });

  function reset() {
    state.value = {
      skip: null,
      limit: null,
      number: null,
      machine: null,
      customer: null,
      description: null,
      isActive: null,
      designatedUserId: null,
    };
  }

  onBeforeMount(() => {
    reset();
  });

  return { state, reset };
});
