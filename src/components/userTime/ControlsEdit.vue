<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router/index'
import { userTimeRequest } from '@/requests/userTime'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'
import { useUserTimeStore } from '@/stores/userTime'

import type { UserTimeUpdateSchema } from '@/schemas/userTime'

import ButtonLoadingGreen from '@/components/elements/ButtonLoadingGreen.vue'
import ButtonUserTimeEdit from '@/components/elements/ButtonUserTimeEdit.vue'
import ButtonAbort from '@/components/elements/ButtonAbort.vue'

const props = defineProps<{
  formData: UserTimeUpdateSchema
}>()

// Stores
const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()
const userTimeStore = useUserTimeStore()

const loadingUpdate = ref<boolean>(false)

// Router
const route = useRoute()

function onUpdate() {
  loadingUpdate.value = true

  const entryID = Number(route.params.id)
  userTimeRequest
    .putUserTimeByID(entryID, props.formData)
    .then((response) => {
      setTimeout(() => {
        loadingUpdate.value = false
      }, 400)

      if (response.status === 200) {
        notificationStore.addInfo(languageStore.l.notification.info.updatedEntry)
        userTimeStore.getItems()
        router.push({ name: 'UserTime' })
      } else if (response.status === 422) {
        notificationStore.addWarn(
          languageStore.l.notification.warn.createUpdateErrorInField(
            response.data.detail[0].loc[1],
            response.data.detail[0].msg,
          ),
        )
      } else {
        notificationStore.addWarn(response.data.detail)
      }
    })
    .catch((error) => {
      console.log(error)
      notificationStore.addWarn(error)
    })
}

function onAbort() {
  router.push({ name: 'UserTime' })
}
</script>

<template>
  <div class="controls-base-scope">
    <div id="item-controls" class="controls-base-container">
      <ButtonLoadingGreen
        v-if="loadingUpdate"
        class="controls-base-element"
        :text="languageStore.l.userTime.button.update"
      />
      <ButtonUserTimeEdit
        v-else
        class="controls-base-element"
        :text="languageStore.l.userTime.button.update"
        v-on:click="onUpdate"
      />
      <ButtonAbort
        class="controls-base-element"
        :text="languageStore.l.userTime.button.cancel"
        v-on:click="onAbort"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/controls/controlsBase.scss';
</style>
