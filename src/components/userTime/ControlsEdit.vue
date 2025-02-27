<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router/index'
import moment from 'moment'

import { userTimeRequest } from '@/requests/api/userTime'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'
import { useUserTimeStore } from '@/stores/userTime'

import type { UserTimeSchema, UserTimeUpdateSchema } from '@/schemas/userTime'
import type { ErrorDetailSchema, ErrorValidationSchema } from '@/schemas/common'

import ButtonLoading from '@/components/elements/ButtonLoading.vue'
import ButtonLoadingGreen from '@/components/elements/ButtonLoadingGreen.vue'
import ButtonUserTimeEdit from '@/components/elements/ButtonUserTimeEdit.vue'
import ButtonAbort from '@/components/elements/ButtonAbort.vue'
import ButtonUndo from '@/components/elements/ButtonUndo.vue'

const props = defineProps<{
  formData: UserTimeUpdateSchema
}>()
const emit = defineEmits<{
  (e: 'update:formData', v: UserTimeUpdateSchema): void
}>()

const computedFormData = computed<UserTimeUpdateSchema>({
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
const userTimeStore = useUserTimeStore()

const loadingUpdate = ref<boolean>(false)
const loadingUndo = ref<boolean>(false)

// Router
const route = useRoute()

function onUpdate() {
  loadingUpdate.value = true

  const entryID = Number(route.params.id)
  userTimeRequest
    .putUserTimeByID(entryID, props.formData)
    .then(async (response) => {
      await userTimeStore.get()
      setTimeout(() => {
        loadingUpdate.value = false
      }, 400)

      if (response.status === 200) {
        notificationStore.addInfo(languageStore.l.notification.info.updatedEntry)
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
      loadingUpdate.value = false
      console.log(error)
      notificationStore.addWarn(error)
    })
}

function onAbort() {
  router.push({ name: 'UserTime' })
}

function onUndo() {
  loadingUndo.value = true

  userTimeRequest.getUserTimeByID(Number(route.params.id)).then((response) => {
    setTimeout(() => {
      loadingUndo.value = false
    }, 400)

    if (response.status === 200) {
      const data = response.data as UserTimeSchema
      if (data.login) {
        data.login = moment.utc(data.login).local().toDate()
      }
      if (data.logout) {
        data.logout = moment.utc(data.logout).local().toDate()
      }
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
      <ButtonLoading
        v-if="loadingUndo"
        class="controls-base-element"
        :text="languageStore.l.userTime.button.undo"
      />
      <ButtonUndo
        v-else
        class="controls-base-element"
        :text="languageStore.l.userTime.button.undo"
        v-on:click="onUndo"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/controls/controlsBase.scss';
</style>
