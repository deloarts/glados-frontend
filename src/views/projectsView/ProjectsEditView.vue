<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import router from '@/router/index'
import { projectsRequest } from '@/requests/api/projects'

import { useLanguageStore } from '@/stores/language'
import { useUserStore } from '@/stores/user'
import { useNotificationStore } from '@/stores/notification'

import type { ProjectSchema, ProjectUpdateSchema } from '@/schemas/project'

import ControlsEdit from '@/components/projects/ControlsEdit.vue'
import UpdateForm from '@/components/projects/UpdateForm.vue'
import WarningForForm from '@/components/common/WarningForForm.vue'

// Router
const route = useRoute()

// Stores
const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()
const userStore = useUserStore()

const formData = ref<ProjectUpdateSchema>({
  number: '',
  product_number: '',
  customer: '',
  description: '',
  designated_user_id: userStore.user.id,
  is_active: true,
})

const projectDesignatedUserID = ref<number>()
const warningText = computed<string | null>(() => {
  if (
    !userStore.user.is_superuser &&
    !userStore.user.is_adminuser &&
    userStore.user.id != projectDesignatedUserID.value
  ) {
    return languageStore.l.project.banner.notAllowedEditItemOtherUser
  }
  return null
})

onBeforeMount(() => {
  const projectID = route.params.id

  projectsRequest
    .getProjectsID(Number(projectID))
    .then((response) => {
      if (response.status === 200) {
        const data = response.data as ProjectSchema
        projectDesignatedUserID.value = data.designated_user_id
        formData.value = data
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
      <div class="grid" v-bind:class="{ 'grid-with-warning': warningText != null }">
        <div class="grid-area-controls">
          <ControlsEdit v-model:form-data="formData" />
        </div>
        <div class="grid-area-warning" v-if="warningText != null">
          <WarningForForm :text="warningText" />
        </div>
        <div class="grid-area-data">
          <UpdateForm v-model:form-data="formData" />
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
  grid-template-rows: auto auto;
  grid-template-areas:
    'grid-area-controls'
    'grid-area-data';
}

.grid-with-warning {
  grid-template-columns: 100%;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    'grid-area-controls'
    'grid-area-warning'
    'grid-area-data';
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
