<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router/index'
import { boughtItemsRequest } from '@/requests/items'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'
import { useBoughtItemsStore } from '@/stores/boughtItems'

import type { BoughtItemCreateSchema } from '@/schemas/boughtItem'

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
        notificationStore.addInfo(languageStore.l.notification.info.createdItem)
        boughtItemsStore.getItems()
        router.push({ name: 'BoughtItems' })
      }
      // else if (response.status === 403) {
      //   notificationStore.addWarn("Not enough permission"
      // }
      else if (response.status === 422) {
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
