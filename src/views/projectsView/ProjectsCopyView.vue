<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import router from '@/router/index'
import { projectsRequest } from '@/requests/projects'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'
import { useUserStore } from '@/stores/user'

import type { ProjectCreateSchema } from '@/schemas/project'

import ControlsNew from '@/components/projects/ControlsNew.vue'
import UpdateForm from '@/components/projects/UpdateForm.vue'

// Router
const route = useRoute()

// Stores
const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()
const userStore = useUserStore()

const formData = ref<ProjectCreateSchema>({
  number: '',
  product_number: '',
  customer: '',
  description: '',
  designated_user_id: userStore.user.id,
  is_active: true,
})

onMounted(() => {
  const projectID = route.params.id
  projectsRequest
    .getProjectsID(Number(projectID))
    .then((response) => {
      if (response.status === 200) {
        formData.value = response.data
      } else {
        notificationStore.addWarn(languageStore.l.notification.warn.failedFetchProject(projectID))
        setTimeout(function () {
          router.push({ name: 'Projects' })
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
          <ControlsNew v-model:form-data="formData" header="Copy item" />
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
