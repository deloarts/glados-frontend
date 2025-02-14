<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router/index'

import { userTimeRequest } from '@/requests/userTime'

import type { UserTimeUpdateSchema } from '@/schemas/userTime'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'

import ControlsEdit from '@/components/userTime/ControlsEdit.vue'
import UpdateForm from '@/components/userTime/UpdateForm.vue'
import moment from 'moment'

// Router
const route = useRoute()

// Stores
const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()

// Form stuff
const formData = ref<UserTimeUpdateSchema>({
  login: moment().toDate(),
  logout: moment().toDate(),
  note: ''
})

onBeforeMount(() => {
  const entryID = route.params.id

  userTimeRequest
    .getUserTimeByID(Number(entryID))
    .then((response) => {
      if (response.status === 200) {
        formData.value = response.data
      } else {
        notificationStore.addWarn(languageStore.l.notification.warn.failedFetchItem(entryID))
        setTimeout(function () {
          router.push({ name: 'UserTime' })
        }, 4000)
      }
    })
    .catch(() => {})
})
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
