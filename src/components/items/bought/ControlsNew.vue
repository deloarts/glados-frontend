<script setup>
import router from "@/router/index";
import { boughtItemsRequest } from "@/requests/items";
import { useNotificationStore } from "@/stores/notification.js";

import ButtonItemCreate from "@/components/elements/ButtonItemCreate.vue";
import ButtonAbort from "@/components/elements/ButtonAbort.vue";

const props = defineProps(["formData"]);

// Stores
const notificationStore = useNotificationStore();

function onCreate() {
  boughtItemsRequest
    .postItems(props.formData)
    .then((response) => {
      if (response.status === 200) {
        notificationStore.info = "Created item";
        router.push({ name: "BoughtItems" });
      }
      // else if (response.status === 403) {
      //   notificationStore.warning = "Not enough permission"
      // }
      else if (response.status === 422) {
        notificationStore.warning = "Data is incomplete";
      } else {
        notificationStore.warning = response.data.detail;
      }
    })
    .catch((error) => {
      console.log(error);
      notificationStore.warning = error;
    });
}

function onAbort() {
  router.push({ name: "BoughtItems" });
}
</script>

<template>
  <div class="controls-base-scope">
    <div id="item-controls" class="controls-base-container">
      <ButtonItemCreate
        class="controls-base-element"
        text="Create"
        v-on:click="onCreate"
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
