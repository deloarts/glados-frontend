<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import router from "@/router/index";
import { boughtItemsRequest } from "@/requests/items";
import { useNotificationStore } from "@/stores/notification";

import { BoughtItemUpdateSchema } from "@/schemas/boughtItem";

import ControlsEdit from "@/components/items/bought/ControlsEdit.vue";
import UpdateItemForm from "@/components/items/bought/UpdateItemForm.vue";

// Router
const route = useRoute();

// Stores
const notificationStore = useNotificationStore();

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

onMounted(() => {
  const itemId = route.params.id;
  boughtItemsRequest
    .getItemsId(Number(itemId))
    .then((response) => {
      if (response.status === 200) {
        formData.value = response.data;
      } else {
        notificationStore.addWarn(`Could not fetch an item with the ID ${itemId}.`);
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
      <div id="grid">
        <div id="controls">
          <ControlsEdit v-model:form-data="formData" />
        </div>
        <div id="data">
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
