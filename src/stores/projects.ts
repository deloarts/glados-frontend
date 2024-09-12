import { ref, onBeforeMount } from "vue";
import { defineStore } from "pinia";

import constants from "@/constants";
import { projectsRequest } from "@/requests/projects";

import type { ProjectSchema } from "@/schemas/project";

export const useProjectsStore = defineStore("projects", () => {
  const loading = ref<boolean>(false);
  const projects = ref<ProjectSchema[]>([]);

  function clear() {
    projects.value = [];
  }

  function get() {
    console.log("Projects store requesting data ...");
    loading.value = true;

    return projectsRequest.getProjects().then((response) => {
      loading.value = false;
      if (response.status === 200) {
        projects.value = response.data;
        console.log("Projects store got data from server.");
      }
      return response;
    });
  }

  function getProjects() {
    console.log("Projects store requesting projects ...");
    loading.value = true;

    projectsRequest.getProjects().then((response) => {
      loading.value = false;
      if (response.status === 200) {
        projects.value = response.data;
        console.log("Projects store got data from server.");
      }
      setTimeout(getProjects.bind(this), constants.patchProjectsStoreInterval);
    });
  }

  function getMachine(id: number) {
    for (let i = 0; i < projects.value.length; i++) {
      if (projects.value[i].id == id) {
        return projects.value[i].machine;
      }
    }
    return null;
  }

  onBeforeMount(() => {
    getProjects();
  });

  return { loading, projects, get, clear, getMachine };
});
