import { ref, watch, onBeforeMount } from "vue";
import { defineStore } from "pinia";

import type {
  BoughtItemControlsState,
  BoughtItemControlsColumns,
  ProjectControlsState,
  ProjectControlsColumns,
} from "@/models/controls";

export const useBoughtItemsControlsStore = defineStore(
  "boughtItemsControls",
  () => {
    const state = ref<BoughtItemControlsState>({
      changelog: false,
      rainbow: false,
      fixedHeight: true,
      lockCols: false,
      textView: false,
      requestView: false,
    });

    const columns = ref<BoughtItemControlsColumns>({
      id: true,
      state: true,
      status: true,
      projectNumber: true,
      projectCustomer: true,
      projectDescription: true,
      productNumber: true,
      quantity: true,
      unit: true,
      weblink: true,
      partnumber: true,
      orderNumber: true,
      manufacturer: true,
      supplier: true,
      group1: true,
      noteGeneral: true,
      noteSupplier: true,
      createdDate: true,
      creatorID: true,
      desiredDate: true,
      requestedDate: true,
      requesterID: true,
      orderedDate: true,
      ordererID: true,
      expectedDate: true,
      deliveredDate: true,
      receiverID: true,
      arrivalWeeks: true,
      totalWeeks: true,
      storagePlace: true,
    });

    function enableAllColumns() {
      for (const key in columns.value) {
        columns.value[key] = true;
      }
    }

    function disableAllColumns() {
      for (const key in columns.value) {
        columns.value[key] = false;
      }
    }

    watch(
      state,
      () => {
        localStorage.setItem(
          "gladosBoughtItemControlsState",
          JSON.stringify(state.value),
        );
        console.log("Saved bought items controls state to local storage.");
      },
      { deep: true },
    );

    watch(
      () => state.value.requestView,
      () => {
        // Setup required columns for request view
        if (state.value.requestView) {
          state.value.textView = true;
          disableAllColumns();
          columns.value.id = true;
          columns.value.projectNumber = true;
          columns.value.productNumber = true;
          columns.value.quantity = true;
          columns.value.unit = true;
          columns.value.partnumber = true;
          columns.value.orderNumber = true;
          columns.value.manufacturer = true;
          columns.value.noteGeneral = true;
          columns.value.noteSupplier = true;
        } else {
          state.value.textView = false;
          enableAllColumns();
        }
      },
      { deep: true },
    );

    watch(
      columns,
      () => {
        localStorage.setItem(
          "gladosBoughtItemControlsColumns",
          JSON.stringify(columns.value),
        );
        console.log("Saved bought items controls columns to local storage.");
      },
      { deep: true },
    );

    onBeforeMount(() => {
      const lsState = localStorage.getItem("gladosBoughtItemControlsState");
      const lsColumns = localStorage.getItem("gladosBoughtItemControlsColumns");

      if (lsState != null) {
        const tempState = JSON.parse(lsState);
        for (const [key, value] of Object.entries(tempState)) {
          if (key in state.value) {
            state.value[key] = value;
          }
        }
        console.log("Got bought items controls state from local storage.");
      }
      if (lsColumns != null) {
        const tempColumns = JSON.parse(lsColumns);
        for (const [key, value] of Object.entries(tempColumns)) {
          if (key in columns.value) {
            columns.value[key] = value;
          }
        }
        console.log("Got bought items controls columns from local storage.");
      }
    });

    return { state, columns, enableAllColumns, disableAllColumns };
  },
);

export const useProjectsControlsStore = defineStore("projectsControls", () => {
  const state = ref<ProjectControlsState>({
    fixedHeight: true,
  });

  const columns = ref<ProjectControlsColumns>({
    id: true,
    projectNumber: true,
    productNumber: true,
    projectLink: true,
    customer: true,
    description: true,
    designatedUserID: true,
    createdDate: true,
    state: true,
  });

  watch(
    state,
    () => {
      localStorage.setItem(
        "gladosProjectControlsState",
        JSON.stringify(state.value),
      );
      console.log("Saved project controls state to local storage.");
    },
    { deep: true },
  );

  watch(
    columns,
    () => {
      localStorage.setItem(
        "gladosProjectControlsColumns",
        JSON.stringify(state.value),
      );
      console.log("Saved project controls columns to local storage.");
    },
    { deep: true },
  );

  onBeforeMount(() => {
    const lsState = localStorage.getItem("gladosProjectControlsState");
    const lsColumns = localStorage.getItem("gladosProjectControlsColumns");

    if (lsState != null) {
      state.value = JSON.parse(lsState);
      console.log("Got project controls state from local storage.");
    }
    if (lsColumns != null) {
      state.value = JSON.parse(lsColumns);
      console.log("Got project controls columns from local storage.");
    }
  });

  return { state, columns };
});
