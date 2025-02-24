<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router/index'
import { boughtItemsRequest } from '@/requests/api/items'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'
import { useBoughtItemsStore } from '@/stores/boughtItems'

import type { BoughtItemCreateSchema, BoughtItemSchema } from '@/schemas/boughtItem'
import type { ErrorDetailSchema, ErrorValidationSchema } from '@/schemas/common'

import ButtonLoadingGreen from '@/components/elements/ButtonLoadingGreen.vue'
import ButtonItemCreate from '@/components/elements/ButtonItemCreate.vue'
import ButtonAbort from '@/components/elements/ButtonAbort.vue'

const props = defineProps<{
  formData: BoughtItemCreateSchema
}>()

// Stores
const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()
const boughtItemsStore = useBoughtItemsStore()

const loadingCreate = ref<boolean>(false)

function onCreate() {
  loadingCreate.value = true

  boughtItemsRequest
    .postItems(props.formData)
    .then((response) => {
      setTimeout(() => {
        loadingCreate.value = false
      }, 400)
      if (response.status === 200) {
        const data = response.data as BoughtItemSchema
        notificationStore.addInfo(languageStore.l.notification.info.createdItem)
        console.log(data.created)
        boughtItemsStore.getItems()
        router.push({ name: 'BoughtItems' })
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
  router.push({ name: 'BoughtItems' })
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
        :text="languageStore.l.boughtItem.button.create"
        v-on:click="onCreate"
      ></ButtonItemCreate>
      <ButtonAbort
        class="controls-base-element"
        :text="languageStore.l.boughtItem.button.cancel"
        v-on:click="onAbort"
      ></ButtonAbort>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/controls/controlsBase.scss';
</style>
