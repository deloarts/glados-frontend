<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import router from "@/router/index";
import { projectsRequest } from "@/requests/projects";
import { useNotificationStore } from "@/stores/notification";

import type { ProjectUpdateSchema } from "@/schemas/project";

import ControlsEdit from "@/components/projects/ControlsEdit.vue";
import UpdateForm from "@/components/projects/UpdateForm.vue";

// Router
const route = useRoute();

// Stores
const notificationStore = useNotificationStore();

const formData = ref<ProjectUpdateSchema>({
  number: null,
  product_number: null,
  customer: null,
  description: null,
  designated_user_id: null,
  is_active: true,
});

onMounted(() => {
  const projectId = route.params.id;

  projectsRequest
    .getProjectsId(Number(projectId))
    .then((response) => {
      if (response.status === 200) {
        formData.value = response.data;
      } else {
        notificationStore.addWarn(
          `Could not fetch a project with the ID ${projectId}.`,
        );
        setTimeout(function () {
          router.push({ name: "Projects" });
        }, 4000);
      }
    })
    .catch((error) => {});
});
</script>

<template>
  <div class="views-scope">
    <div class="views-content">
      <div id="grid">
        <div id="controls">
          <ControlsEdit v-model:form-data="formData" />
        </div>
        <div id="data">
          <UpdateForm v-model:form-data="formData" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/views.scss";
@import "@/scss/grid/gridBase.scss";

#grid {
  grid-template-columns: 100%;
  grid-template-rows: auto auto;
  grid-template-areas:
    "controls"
    "data";
}

#controls {
  grid-area: controls;
}

#data {
  grid-area: data;
}
</style>
