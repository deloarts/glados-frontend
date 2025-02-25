<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import router from '@/router/index'
import { boughtItemsRequest } from '@/requests/api/items'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'
import { useBoughtItemsStore } from '@/stores/boughtItems'

import type { BoughtItemUpdateSchema } from '@/schemas/boughtItem'
import type { ErrorValidationSchema, ErrorDetailSchema } from '@/schemas/common'

import ButtonLoadingGreen from '@/components/elements/ButtonLoadingGreen.vue'
import ButtonItemCreate from '@/components/elements/ButtonItemCreate.vue'
import ButtonAbort from '@/components/elements/ButtonAbort.vue'

const props = defineProps<{
  formData: BoughtItemUpdateSchema
}>()

// Router
const route = useRoute()

// Stores
const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()
const boughtItemsStore = useBoughtItemsStore()

const loadingUpdate = ref<boolean>(false)

function onUpdate() {
  loadingUpdate.value = true

  const itemID = Number(route.params.id)
  boughtItemsRequest
    .putItems(itemID, props.formData)
    .then(async (response) => {
      await boughtItemsStore.get()
      setTimeout(() => {
        loadingUpdate.value = false
      }, 400)

      if (response.status === 200) {
        notificationStore.addInfo(languageStore.l.notification.info.updatedItem(itemID))
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
      loadingUpdate.value = false
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
        v-if="loadingUpdate"
        class="controls-base-element"
        :text="languageStore.l.project.button.update"
      />
      <ButtonItemCreate
        v-else
        class="controls-base-element"
        :text="languageStore.l.boughtItem.button.update"
        v-on:click="onUpdate"
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
