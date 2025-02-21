<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import router from '@/router/index'
import { boughtItemsRequest } from '@/requests/items'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'

import type { BoughtItemSchema } from '@/schemas/boughtItem'

import ControlsViewer from '@/components/items/bought/ControlsViewer.vue'
import ViewItemForm from '@/components/items/bought/ViewItemForm.vue'
import Changelog from '@/components/items/bought/ChangelogViewer.vue'

// Router
const route = useRoute()
const itemId = ref<string>(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id)

// Stores
const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()

// Form stuff
const itemData = ref<BoughtItemSchema>({
  id: 0,
  status: '',
  created: '',
  creator_id: 0,
})

onBeforeMount(() => {
  boughtItemsRequest
    .getItemsID(Number(itemId.value))
    .then((response) => {
      if (response.status === 200) {
        const data = response.data as BoughtItemSchema
        itemData.value = data
      } else {
        notificationStore.addWarn(languageStore.l.notification.warn.failedFetchItem(itemId.value))
        setTimeout(function () { router.push({ name: 'BoughtItems' }) }, 4000)
      }
    })
    .catch((error) => {
      console.error(error)
      notificationStore.addWarn(error)
    })
})
</script>

<template>
  <div class="views-scope">
    <div class="views-content">
      <div class="grid" >
        <div class="grid-area-controls">
          <ControlsViewer v-model:item-data="itemData" />
        </div>
        <div class="grid-area-data">
          <ViewItemForm v-model:item-data="itemData" />
        </div>
        <div class="grid-area-changelog-view">
          <Changelog v-model:item-id="itemId" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/views.scss';
@use '@/scss/grid/gridBase.scss';

.grid {
  grid-template-columns: 100%;
  grid-template-rows: auto auto 250px;
  grid-template-areas:
    'grid-area-controls'
    'grid-area-data'
    'grid-area-changelog-view';
}

.grid-area-controls {
  grid-area: grid-area-controls;
}

.grid-area-data {
  grid-area: grid-area-data;
}

.grid-area-changelog-view {
  grid-area: grid-area-changelog-view;
}
</style>
