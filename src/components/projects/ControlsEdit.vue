<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router/index'

import { projectsRequest } from '@/requests/api/projects'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'
import { useProjectsStore } from '@/stores/projects'

import type { ProjectSchema, ProjectUpdateSchema } from '@/schemas/project'
import type { ErrorDetailSchema, ErrorValidationSchema } from '@/schemas/common'

import ButtonLoading from '@/components/elements/ButtonLoading.vue'
import ButtonLoadingGreen from '@/components/elements/ButtonLoadingGreen.vue'
import ButtonItemCreate from '@/components/elements/ButtonItemCreate.vue'
import ButtonAbort from '@/components/elements/ButtonAbort.vue'
import ButtonUndo from '@/components/elements/ButtonUndo.vue'

const props = defineProps<{
  formData: ProjectUpdateSchema
}>()
const emit = defineEmits<{
  (e: 'update:formData', v: ProjectUpdateSchema): void
}>()

const computedFormData = computed<ProjectUpdateSchema>({
  get() {
    return props.formData
  },
  set(newValue) {
    emit('update:formData', newValue)
    return newValue
  },
})

// Stores
const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()
const projectsStore = useProjectsStore()

const loadingUpdate = ref<boolean>(false)
const loadingUndo = ref<boolean>(false)

// Router
const route = useRoute()

function onUpdate() {
  loadingUpdate.value = true

  const projectID = Number(route.params.id)
  projectsRequest
    .putProjects(projectID, computedFormData.value)
    .then(async (response) => {
      await projectsStore.get()
      setTimeout(() => {
        loadingUpdate.value = false
      }, 400)

      if (response.status === 200) {
        notificationStore.addInfo(languageStore.l.notification.info.updatedProject(projectID))
        router.push({ name: 'Projects' })
      } else if (response.status === 422) {
        const data = response.data as ErrorValidationSchema
        notificationStore.addWarn(
          languageStore.l.notification.warn.createUpdateErrorInField(
            data.detail[0].loc[1],
            data.detail[0].msg,
          ),
        )
      } else {
        const data = response.data as ErrorDetailSchema
        notificationStore.addWarn(data.detail)
      }
    })
    .catch((error) => {
      loadingUpdate.value = false
      console.log(error)
      notificationStore.addWarn(error)
    })
}

function onAbort() {
  router.push({ name: 'Projects' })
}

function onUndo() {
  loadingUndo.value = true

  projectsRequest.getProjectsID(Number(route.params.id)).then((response) => {
    setTimeout(() => {
      loadingUndo.value = false
    }, 400)

    if (response.status === 200) {
      const data = response.data as ProjectSchema
      computedFormData.value = data
    }
  })
}
</script>

<template>
  <div class="controls-base-scope">
    <div id="item-controls" class="controls-base-container">
      <ButtonLoadingGreen
        v-if="loadingUpdate"
        class="controls-base-element"
        :text="languageStore.l.project.button.update"
      />
      <ButtonItemCreate
        v-else
        class="controls-base-element"
        :text="languageStore.l.project.button.update"
        v-on:click="onUpdate"
      />
      <ButtonAbort
        class="controls-base-element"
        :text="languageStore.l.project.button.cancel"
        v-on:click="onAbort"
      />
      <ButtonLoading
        v-if="loadingUndo"
        class="controls-base-element"
        :text="languageStore.l.project.button.undo"
      />
      <ButtonUndo
        v-else
        class="controls-base-element"
        :text="languageStore.l.project.button.undo"
        v-on:click="onUndo"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/controls/controlsBase.scss';
</style>
