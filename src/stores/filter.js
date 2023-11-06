import { ref, watch, onBeforeMount } from "vue";
import { defineStore } from "pinia";

export const useBoughtItemFilterStore = defineStore("boughtItemFilter", () => {
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
    state.value.limit = "100";
    state.value.ignoreDelivered = false;
    state.value.ignoreCanceled = false;
    state.value.ignoreLost = false;
    state.value.highPriority = null;
    state.value.creatorId = "";
    state.value.createdDate = "";
    state.value.changedDateFrom = "";
    state.value.desiredDate = "";
    state.value.requesterId = "";
    state.value.requestedDate = "";
    state.value.ordererId = "";
    state.value.orderedDate = "";
    state.value.expectedDate = "";
    state.value.deliveredDate = "";
    state.value.sortBy = "id";
    state.value.id = "";
    state.value.status = "";
    state.value.project = "";
    state.value.machine = "";
    state.value.quantity = "";
    state.value.unit = "";
    state.value.partnumber = "";
    state.value.definition = "";
    state.value.manufacturer = "";
    state.value.supplier = "";
    state.value.group1 = "";
    state.value.noteGeneral = "";
    state.value.noteSupplier = "";
    state.value.storagePlace = "";
    state.value.takeOverId = "";
    console.log("Reset bought items filter");
  }

  function allOpen() {
    reset();
    state.value.limit = "";
    state.value.sortBy = "high_priority,project,supplier,manufacturer";
    state.value.status = "open";
    console.log("Set filter to all open");
  }

  function allRequested() {
    reset();
    state.value.limit = "";
    state.value.sortBy = "high_priority,project,supplier,manufacturer";
    state.value.status = "requested";
    console.log("Set filter to all requested");
  }

  function allOrdered() {
    reset();
    state.value.limit = "";
    state.value.sortBy = "high_priority,project,supplier,manufacturer";
    state.value.status = "ordered";
    console.log("Set filter to all ordered");
  }

  function allActive() {
    reset();
    state.value.limit = "";
    state.value.ignoreDelivered = true;
    state.value.ignoreCanceled = true;
    state.value.ignoreLost = true;
    state.value.sortBy = "high_priority,project,supplier,manufacturer";
    console.log("Set filter to all active");
  }

  function allPrioritized() {
    reset();
    state.value.limit = "";
    state.value.ignoreDelivered = true;
    state.value.ignoreCanceled = true;
    state.value.ignoreLost = true;
    state.value.highPriority = true;
    state.value.sortBy = "project,supplier,manufacturer";
    console.log("Set filter to all prioritized");
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
    const ls = localStorage.getItem("gladosBoughtItemFilter");
    if (ls != null) {
      state.value = JSON.parse(ls);
      console.log("Got bought items filter from local storage.");
    }
  });

  return {
    state,
    reset,
    saveMy,
    loadMy,
    allOpen,
    allRequested,
    allOrdered,
    allActive,
    allPrioritized,
  };
});
