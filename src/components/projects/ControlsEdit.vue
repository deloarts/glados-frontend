<script setup lang="ts">
import { useRoute } from "vue-router";
import router from "@/router/index";

import { projectsRequest } from "@/requests/projects";
import { useNotificationStore } from "@/stores/notification";
import { useProjectsStore } from "@/stores/projects";

import type { ProjectCreateSchema } from "@/schemas/project";

import ButtonItemCreate from "@/components/elements/ButtonItemCreate.vue";
import ButtonAbort from "@/components/elements/ButtonAbort.vue";

const props = defineProps<{
  formData: ProjectCreateSchema;
}>();

// Stores
const notificationStore = useNotificationStore();
const projectsStore = useProjectsStore();

// Router
const route = useRoute();

function onUpdate() {
  const itemId = Number(route.params.id);
  projectsRequest
    .putProjects(itemId, props.formData)
    .then((response) => {
      if (response.status === 200) {
        notificationStore.addInfo(`Updated project #${itemId}.`);
        projectsStore.getItems();
        router.push({ name: "Projects" });
      } else if (response.status === 422) {
        notificationStore.addWarn(
          `Error in field '${response.data.detail[0].loc[1]}': ${response.data.detail[0].msg}`,
        );
      } else {
        notificationStore.addWarn(response.data.detail);
      }
    })
    .catch((error) => {
      console.log(error);
      notificationStore.addWarn(error);
    });
}

function onAbort() {
  router.push({ name: "Projects" });
}
</script>

<template>
  <div class="controls-base-scope">
    <div id="item-controls" class="controls-base-container">
      <ButtonItemCreate
        class="controls-base-element"
        text="Update"
        v-on:click="onUpdate"
      ></ButtonItemCreate>
      <ButtonAbort
        class="controls-base-element"
        text="Cancel"
        v-on:click="onAbort"
      ></ButtonAbort>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/controls/controlsBase.scss";
</style>
