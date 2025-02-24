<script setup lang="ts">
import { ref } from 'vue'
import { usersRequest } from '@/requests/api/users'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'

import ButtonNewPersonalAccessToken from '@/components/elements/ButtonNewPersonalAccessToken.vue'

import type { ErrorDetailSchema } from '@/schemas/common'

const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()

const personalAccessToken = ref<string>('')

function newToken() {
  usersRequest.putUsersMePAT().then((response) => {
    if (response.status == 200) {
      const data = response.data as string
      personalAccessToken.value = data
      notificationStore.addInfo(languageStore.l.notification.info.createdNewPAT)
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
        <div id="token" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="personalAccessToken"
            type="text"
            :placeholder="languageStore.l.account.input.patPlaceholder"
            readonly
          />
        </div>
        <div id="btn">
          <ButtonNewPersonalAccessToken
            v-on:click="newToken"
            :text="languageStore.l.account.button.newToken"
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
  grid-template-rows: 40px auto;
  grid-template-columns: auto;
  grid-template-areas:
    'token'
    'btn';
}

#btn {
  grid-area: btn;
}

#token {
  grid-area: token;
}
</style>
