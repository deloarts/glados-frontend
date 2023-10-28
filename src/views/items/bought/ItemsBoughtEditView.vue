<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"

import router from "@/router/index"
import { boughtItemsRequest } from "@/requests/items"
import { useNotificationStore } from "@/stores/notification.js"

import ControlsEdit from "@/components/items/bought/ControlsEdit.vue"
import UpdateItemForm from "@/components/items/bought/UpdateItemForm.vue"

// Router
const route = useRoute()

// Stores
const notificationStore = useNotificationStore()

// Form stuff
const formData = ref({
  high_priority: false,
  notify_on_delivery: false,
  project: null,
  machine: null,
  quantity: null,
  unit: null,
  partnumber: null,
  definition: null,
  supplier: null,
  manufacturer: null,
  note_general: null,
  note_supplier: null,
  desired_delivery_date: null
})

onMounted(() => {
  const itemId = route.params.id
  boughtItemsRequest.getItemsId(itemId).then(response => {
    if (response.status === 200) {
      formData.value = response.data
    }
    else {
      notificationStore.warning = `Could not fetch an item with the ID ${itemId}.`
      setTimeout(function () { router.push({ name: "BoughtItems" }) }, 4000)
    }
  }).catch(error => {
    console.error(error)
    notificationStore.warning = error
  })
})
</script>

<template>
  <div class="scope">
    <div class="grid">
      <div id="controls" class="controls">
        <ControlsEdit v-model:form-data="formData" />
      </div>
      <div id="data" class="data">
        <UpdateItemForm v-model:form-data="formData" />
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/variables.scss';

.scope {
  width: 100%;
  height: 100%;
}

.grid {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 250px;
  right: 0;

  display: grid;

  grid-gap: 0;
  grid-template-columns: 100%;
  grid-template-rows: 150px auto;
  grid-template-areas: "controls"
    "data"
}

.grid .controls {
  padding: 10px;
}

.grid .data {
  overflow: auto;
  padding: 10px;
  border-radius: 5px;
}

// grid
#controls {
  grid-area: controls;
}

#data {
  grid-area: data;
}
</style>