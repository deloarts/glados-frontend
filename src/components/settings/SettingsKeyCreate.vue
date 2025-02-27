<script setup lang="ts">
import { ref } from 'vue'
import moment from 'moment'
import Datepicker from '@vuepic/vue-datepicker'

import { useLanguageStore } from '@/stores/language'
import { useUserStore } from '@/stores/user'
import { useNotificationStore } from '@/stores/notification'
import { useApiKeysStore } from '@/stores/apiKeys'
import { apiKeysRequest } from '@/requests/api/apiKeys'

import type { ApiKeysCreateSchema } from '@/schemas/apiKeys'
import type { ErrorDetailSchema } from '@/schemas/common'

import ButtonCloudKey from '@/components/elements/ButtonCloudKey.vue'

// Stores
const languageStore = useLanguageStore()
const userStore = useUserStore()
const notificationStore = useNotificationStore()
const apiKeyStore = useApiKeysStore()

const formData = ref<ApiKeysCreateSchema>({
  name: '',
  expiration_date: moment().add(1, 'day').toDate(),
})
const formatDate = (pickedDate: Date) => {
  const day = pickedDate.getDate()
  const month = pickedDate.getMonth() + 1
  const year = pickedDate.getFullYear()
  return `${day}.${month}.${year}`
}

function createKey() {
  apiKeysRequest.postApiKeys(formData.value).then((response) => {
    apiKeyStore.get()
    if (response.status == 200) {
      notificationStore.addInfo(languageStore.l.notification.info.createdApiKey)
      formData.value = {
        name: '',
        expiration_date: moment().add(1, 'year').toDate(),
      }
    } else if (response.status == 422) {
      notificationStore.addWarn(languageStore.l.notification.warn.apiKeyDataIncomplete)
    } else {
      const data = response.data as ErrorDetailSchema
      notificationStore.addWarn(data.detail)
    }
  })
}
</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container">
      <div id="grid">
        <div id="name" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="formData.name"
            type="text"
            :placeholder="languageStore.l.settings.apiKeys.input.namePlaceholder"
          />
        </div>
        <div id="desired" class="grid-item-center">
          <Datepicker
            class="form-base-date-input"
            v-model="formData.expiration_date"
            :format="formatDate"
            :clearable="true"
            :placeholder="languageStore.l.settings.apiKeys.input.ExpirationDatePlaceholder"
            :dark="userStore.user.theme == 'dark'"
            :min-date="moment().add(1, 'day').toDate()"
          />
        </div>
        <div id="btn">
          <ButtonCloudKey
            v-on:click="createKey"
            :text="languageStore.l.settings.apiKeys.button.create"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/form/formBase.scss';
@use '@/scss/grid/gridBase.scss';

#grid {
  grid-template-rows: 40px 40px auto;
  grid-template-columns: 50px auto;
  grid-template-areas:
    'name name'
    'desired desired'
    'btn btn';
}

#btn {
  grid-area: btn;
}

#name {
  grid-area: name;
}

#desired {
  grid-area: desired;
}
</style>
