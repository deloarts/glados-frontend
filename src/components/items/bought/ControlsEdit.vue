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
  <div class="controls-base-scope">
    <div class="controls-base-container">
      <div id="grid">
        <div id="header" class="grid-item-center">
          Edit Item #{{ route.params.id }}
        </div>
        <div id="placeholder-1" class="grid-item-center">
        </div>
        <div id="placeholder-2" class="grid-item-center">
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
@import '@/scss/controls/controlsBase.scss';
@import '@/scss/grid/gridBase.scss';

#grid {
    grid-gap: 5px;
    grid-template-rows: 35px 35px 35px;
    grid-template-columns: 135px 135px auto;
    grid-template-areas: "header header header"
        "placeholder-1 placeholder-1 placeholder-2"
        "btn-1 btn-2 placeholder-2"
}

#header {
    grid-area: header;
    font-size: 1.5em;
}

#placeholder-1 {
    grid-area: placeholder-1;
}

#placeholder-2 {
    grid-area: placeholder-2;
}

#btn-1 {
    grid-area: btn-1;
}

#btn-2 {
    grid-area: btn-2;
}
</style>