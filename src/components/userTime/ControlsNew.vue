<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router/index'
import { userTimeRequest } from '@/requests/api/userTime'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'
import { useUserTimeStore } from '@/stores/userTime'

import type { UserTimeCreateSchema } from '@/schemas/userTime'
import type { ErrorValidationSchema, ErrorDetailSchema } from '@/schemas/common'

import ButtonLoadingGreen from '@/components/elements/ButtonLoadingGreen.vue'
import ButtonUserTimeAdd from '@/components/elements/ButtonUserTimeAdd.vue'
import ButtonAbort from '@/components/elements/ButtonAbort.vue'

const props = defineProps<{
  formData: UserTimeCreateSchema
}>()

// Stores
const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()
const userTimeStore = useUserTimeStore()

const loadingCreate = ref<boolean>(false)

function onCreate() {
  loadingCreate.value = true

  userTimeRequest
    .postUserTime(props.formData)
    .then((response) => {
      setTimeout(() => {
        loadingCreate.value = false
      }, 400)

      if (response.status === 200) {
        notificationStore.addInfo(languageStore.l.notification.info.createdEntry)
        userTimeStore.getItems()
        router.push({ name: 'UserTime' })
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
        v-if="loadingCreate"
        class="controls-base-element"
        :text="languageStore.l.userTime.button.create"
      />
      <ButtonUserTimeAdd
        v-else
        class="controls-base-element"
        :text="languageStore.l.userTime.button.create"
        v-on:click="onCreate"
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
