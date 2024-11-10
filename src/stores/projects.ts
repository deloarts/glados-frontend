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
  const projects = ref<ProjectSchema[]>([]);

  function clear() {
    projects.value = [];
  }

  async function get() {
    loading.value = true;
    const params = getProjectFilterParams(_filterStore.state);
    return projectsRequest.getProjects(params).then((response) => {
      loading.value = false;
      if (response.status === 200) {
        projects.value = response.data;
      }
      return response;
    });
  }

  function fetch() {
    console.log("Projects store requesting projects (interval) ...");
    loading.value = true;
    get().then(() => {
      setTimeout(fetch.bind(this), constants.patchProjectsStoreInterval);
    });
  }

  function getProductNumber(project_id: number) {
    for (let i = 0; i < projects.value.length; i++) {
      if (projects.value[i].id == project_id) {
        return projects.value[i].product_number;
      }
    }
    return null;
  }

  onBeforeMount(() => {
    clear();
    fetch();
  });

  return { loading, projects, get, clear, getProductNumber };
});
