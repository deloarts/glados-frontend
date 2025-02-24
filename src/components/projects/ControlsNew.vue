<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router/index'
import { projectsRequest } from '@/requests/projects'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'
import { useProjectsStore } from '@/stores/projects'

import type { ProjectCreateSchema } from '@/schemas/project'
import type { ErrorDetailSchema, ErrorValidationSchema } from '@/schemas/common'

import ButtonLoadingGreen from '@/components/elements/ButtonLoadingGreen.vue'
import ButtonItemCreate from '@/components/elements/ButtonItemCreate.vue'
import ButtonAbort from '@/components/elements/ButtonAbort.vue'

const props = defineProps<{
  formData: ProjectCreateSchema
}>()

// Stores
const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()
const projectsStore = useProjectsStore()

const loadingCreate = ref<boolean>(false)

function onCreate() {
  loadingCreate.value = true

  projectsRequest
    .postProjects(props.formData)
    .then((response) => {
      setTimeout(() => {
        loadingCreate.value = false
      }, 400)

      if (response.status === 200) {
        notificationStore.addInfo(languageStore.l.notification.info.createdProject)
        projectsStore.getItems()
        router.push({ name: 'Projects' })
      } else if (response.status === 422) {
        const data = response.data as ErrorValidationSchema
        notificationStore.addWarn(languageStore.l.notification.warn.createUpdateErrorInField(data.detail[0].loc[1], data.detail[0].msg))
      } else {
        const data = response.data as ErrorDetailSchema
        notificationStore.addWarn(data.detail)
      }
    })
    .catch((error) => {
      console.log(error)
      notificationStore.addWarn(error)
    })
}

function onAbort() {
  router.push({ name: 'Projects' })
}
</script>

<template>
  <div class="controls-base-scope">
    <div id="item-controls" class="controls-base-container">
      <ButtonLoadingGreen
        v-if="loadingCreate"
        class="controls-base-element"
        :text="languageStore.l.project.button.create"
      />
      <ButtonItemCreate
        v-else
        class="controls-base-element"
        :text="languageStore.l.project.button.create"
        v-on:click="onCreate"
      />
      <ButtonAbort
        class="controls-base-element"
        :text="languageStore.l.project.button.cancel"
        v-on:click="onAbort"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/controls/controlsBase.scss';
</style>
