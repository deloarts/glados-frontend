<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import router from '@/router/index'
import { boughtItemsRequest } from '@/requests/items'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'

import type { BoughtItemCreateSchema } from '@/schemas/boughtItem'

import ControlsNew from '@/components/items/bought/ControlsNew.vue'
import UpdateItemForm from '@/components/items/bought/UpdateItemForm.vue'

// Router
const route = useRoute()

// Stores
const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()

const formData = ref<BoughtItemCreateSchema>({
  high_priority: false,
  notify_on_delivery: false,
  project_id: 0,
  quantity: 0,
  unit: '',
  partnumber: '',
  order_number: '',
  supplier: null,
  manufacturer: '',
  note_general: null,
  note_supplier: null,
  desired_delivery_date: null,
})

onMounted(() => {
  const itemID = route.params.id

  boughtItemsRequest
    .getItemsID(Number(itemID))
    .then((response) => {
      if (response.status === 200) {
        formData.value = response.data
      } else {
        notificationStore.addWarn(languageStore.l.notification.warn.failedFetchItem(itemID))
        setTimeout(function () {
          router.push({ name: 'BoughtItems' })
        }, 4000)
      }
    })
    .catch((error) => {})
})
</script>

<template>
  <div class="views-scope">
    <div class="views-content">
      <div id="grid">
        <div id="controls">
          <ControlsNew v-model:form-data="formData" />
        </div>
        <div id="data">
          <UpdateItemForm v-model:form-data="formData" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/views.scss';
@use '@/scss/grid/gridBase.scss';

#grid {
  grid-template-columns: 100%;
  grid-template-rows: auto auto;
  grid-template-areas:
    'controls'
    'data';
}

#controls {
  grid-area: controls;
}

#data {
  grid-area: data;
}
</style>
