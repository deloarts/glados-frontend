<script setup>
import { useRoute } from "vue-router"

import router from "@/router/index"
import { boughtItemsRequest } from "@/requests/items"
import { useNotificationStore } from "@/stores/notification.js"

import ButtonItemCreate from "@/components/elements/ButtonItemCreate.vue"
import ButtonAbort from "@/components/elements/ButtonAbort.vue"

const props = defineProps(["formData"])

// Router
const route = useRoute()

// Stores
const notificationStore = useNotificationStore()

function onUpdate() {
  const itemId = route.params.id;
  boughtItemsRequest.putItems(itemId, props.formData).then(response => {
    if (response.status === 200) {
      notificationStore.info = `Updated item #${itemId}.`
      router.push({ name: "BoughtItems" })
    }
    else if (response.status === 422) {
      notificationStore.warning = "Data is incomplete."
    }
    else {
      notificationStore.warning = response.data.detail
    }
  }).catch(error => {
    console.log(error);
    notificationStore.warning = error;
  })
}

function onAbort() {
  router.push({ name: "BoughtItems" })
}
</script>

<template>
  <div class="scope">
    <div class="container">
      <div id="grid">
        <div id="header" class="grid-item-center">
          Edit Item #{{ route.params.id }}
        </div>
        <div id="placeholder-2" class="grid-item-center">
        </div>
        <div id="placeholder-3" class="grid-item-center">
        </div>
        <div id="btn-1" class="grid-item-center">
          <ButtonItemCreate text="Update" v-on:click="onUpdate" />
        </div>
        <div id="btn-2" class="grid-item-center">
          <ButtonAbort text="Abort" v-on:click="onAbort" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/variables.scss';
@import '@/scss/grid/gridBase.scss';
@import '@/scss/grid/gridItemBoughtControlsNewEdit.scss';
</style>