import { ref, onBeforeMount } from "vue";
import { defineStore } from "pinia";

import constants from "@/constants";
import { projectsRequest } from "@/requests/projects";
import { useProjectFilterStore } from "@/stores/filter";
import { getProjectFilterParams } from "@/requests/params";

import type { ProjectSchema } from "@/schemas/project";

export const useProjectsStore = defineStore("projects", () => {
  const _filterStore = useProjectFilterStore();

  const loading = ref<boolean>(false);
  const paused = ref<boolean>(false);
  const items = ref<ProjectSchema[]>([]);
  const selectedIDs = ref<Array<number>>([]);

  function clear() {
    items.value = [];
    selectedIDs.value = [];
  }

  function pause(state: boolean) {
    paused.value = state;
  }

  function getItems(): Array<ProjectSchema> {
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

  async function get() {
    loading.value = true;
    const params = getProjectFilterParams(_filterStore.state);
    return projectsRequest.getProjects(params).then((response) => {
      loading.value = false;
      if (response.status === 200) {
        items.value = response.data;
        console.log("Projects store got data from server.");
      }
      return response;
    });
  }

  function fetchItems() {
    if (paused.value) {
      console.log("Project store is paused.");
      setTimeout(fetchItems.bind(this), constants.patchProjectsStoreInterval);
    } else {
      get().then(() => {
        setTimeout(fetchItems.bind(this), constants.patchProjectsStoreInterval);
      });
    }
  }

  function getProductNumber(project_id: number) {
    for (let i = 0; i < items.value.length; i++) {
      if (items.value[i].id == project_id) {
        return items.value[i].product_number;
      }
    }
    return null;
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
    getProductNumber,
  };
});
