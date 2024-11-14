<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import router from "@/router/index";
import { boughtItemsRequest } from "@/requests/items";

import { useNotificationStore } from "@/stores/notification";
import { useUserStore } from "@/stores/user";
import { useProjectsStore } from "@/stores/projects";
import { useStatusStore } from "@/stores/status";

import { BoughtItemUpdateSchema } from "@/schemas/boughtItem";

import ControlsEdit from "@/components/items/bought/ControlsEdit.vue";
import UpdateItemForm from "@/components/items/bought/UpdateItemForm.vue";
import WarningForForm from "@/components/common/WarningForForm.vue";

// Router
const route = useRoute();

// Stores
const notificationStore = useNotificationStore();
const userStore = useUserStore();
const projectStore = useProjectsStore();
const statusStore = useStatusStore();

// Form stuff
const formData = ref<BoughtItemUpdateSchema>({
  high_priority: false,
  notify_on_delivery: false,
  project_id: null,
  quantity: null,
  unit: null,
  partnumber: null,
  order_number: null,
  supplier: null,
  manufacturer: null,
  group_1: null,
  weblink: null,
  note_general: null,
  note_supplier: null,
  desired_delivery_date: null,
});

const itemStatus = ref<string>(null);
const itemCreatorID = ref<number>(null);

const projectActive = computed<boolean>(() => {
  const project = projectStore.getProjectByID(formData.value.project_id);
  return project && project.is_active ? true : false;
});
const warningText = computed<string | null>(() => {
  if (!projectActive.value) {
    return "You are not allowed to edit an item of an inactive project.";
  } else if (
    !userStore.user.is_superuser &&
    !userStore.user.is_adminuser &&
    userStore.user.id != itemCreatorID.value
  ) {
    return "You are not allowed to edit an item of another user.";
  } else if (
    !userStore.user.is_superuser &&
    !userStore.user.is_adminuser &&
    itemStatus.value != statusStore.boughtItemStatus.open
  ) {
    return "You are not allowed to edit an item that is already planned.";
  }
  return null;
});

onMounted(() => {
  const itemId = route.params.id;
  boughtItemsRequest
    .getItemsId(Number(itemId))
    .then((response) => {
      if (response.status === 200) {
        itemStatus.value = response.data.status;
        itemCreatorID.value = response.data.creator_id;
        formData.value = response.data;
      } else {
        notificationStore.addWarn(
          `Could not fetch an item with the ID ${itemId}.`,
        );
        setTimeout(function () {
          router.push({ name: "BoughtItems" });
        }, 4000);
      }
    })
    .catch((error) => {
      console.error(error);
      notificationStore.addWarn(error);
    });
});
</script>

<template>
  <div class="views-scope">
    <div class="views-content">
      <div
        class="grid"
        v-bind:class="{ 'grid-with-warning': warningText != null }"
      >
        <div class="grid-area-controls">
          <ControlsEdit v-model:form-data="formData" />
        </div>
        <div
          class="grid-area-warning"
          v-if="formData.project_id != null && warningText != null"
        >
          <WarningForForm :text="warningText" />
        </div>
        <div class="grid-area-data">
          <UpdateItemForm v-model:form-data="formData" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/views.scss";
@import "@/scss/grid/gridBase.scss";

.grid {
  grid-template-columns: 100%;
  grid-template-rows: auto auto;
  grid-template-areas:
    "grid-area-controls"
    "grid-area-data";
}

.grid-with-warning {
  grid-template-columns: 100%;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "grid-area-controls"
    "grid-area-warning"
    "grid-area-data";
}

.grid-area-controls {
  grid-area: grid-area-controls;
}

.grid-area-warning {
  grid-area: grid-area-warning;
}

.grid-area-data {
  grid-area: grid-area-data;
}
</style>
