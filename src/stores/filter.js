import { ref, watch, onBeforeMount } from "vue";
import { defineStore } from "pinia";

import constants from "@/constants";
import { hostRequest } from "@/requests/host";

export const useBoughtItemFilterStore = defineStore("boughtItemFilter", () => {
  const loading = ref(false);
  const presets = ref({});
  const state = ref({
    limit: "100",
    ignoreDelivered: false,
    ignoreCanceled: false,
    ignoreLost: false,
    highPriority: null,
    creatorId: "",
    createdDate: "",
    changedDateFrom: "",
    desiredDate: "",
    requesterId: "",
    requestedDate: "",
    ordererId: "",
    orderedDate: "",
    expectedDate: "",
    deliveredDate: "",
    sortBy: "id",
    id: "",
    status: "",
    project: "",
    machine: "",
    quantity: "",
    unit: "",
    partnumber: "",
    definition: "",
    manufacturer: "",
    supplier: "",
    group1: "",
    noteGeneral: "",
    noteSupplier: "",
    storagePlace: "",
    takeOverId: "",
  });

  function reset() {
    state.value = {
      limit: "100",
      ignoreDelivered: false,
      ignoreCanceled: false,
      ignoreLost: false,
      highPriority: null,
      creatorId: "",
      createdDate: "",
      changedDateFrom: "",
      desiredDate: "",
      requesterId: "",
      requestedDate: "",
      ordererId: "",
      orderedDate: "",
      expectedDate: "",
      deliveredDate: "",
      sortBy: "id",
      id: "",
      status: "",
      project: "",
      machine: "",
      quantity: "",
      unit: "",
      partnumber: "",
      definition: "",
      manufacturer: "",
      supplier: "",
      group1: "",
      noteGeneral: "",
      noteSupplier: "",
      storagePlace: "",
      takeOverId: "",
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

  function applyPreset(name) {
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
        project: p.project,
        machine: p.machine,
        quantity: p.quantity,
        unit: p.unit,
        partnumber: p.partnumber,
        definition: p.definition,
        manufacturer: p.manufacturer,
        supplier: p.supplier,
        group1: p.group1,
        noteGeneral: p.noteGeneral,
        noteSupplier: p.noteSupplier,
        storagePlace: p.storagePlace,
        takeOverId: p.takeOverId,
      };
    }
  }

  function getPresets() {
    console.log("Filter store is requesting presets ...");
    loading.value = true;

    hostRequest.getConfigItemsBoughtFilters().then((response) => {
      loading.value = false;
      if (response.status === 200) {
        presets.value = response.data;
        console.log("Filter store got data from server.");
      } else {
        console.warn("Filter store could not get user.");
        logout();
        router.push({ name: "Login" });
      }
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
    reset,
    applyPreset,
    saveMy,
    loadMy,
  };
});
