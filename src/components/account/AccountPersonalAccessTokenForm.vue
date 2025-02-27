<script setup lang="ts">
import { ref } from 'vue'
import { usersRequest } from '@/requests/api/users'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'

import ButtonNewPersonalAccessToken from '@/components/elements/ButtonNewPersonalAccessToken.vue'
import ButtonLoading from '@/components/elements/ButtonLoading.vue'

import type { ErrorDetailSchema } from '@/schemas/common'

const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()

const personalAccessToken = ref<string>('')
const loading = ref<boolean>(false)

function newToken() {
  loading.value = true
  usersRequest.putUsersMePAT().then((response) => {
    setTimeout(() => {
      loading.value = false
    }, 400)

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
    <div class="controls-base-container">
      <ButtonLoading
        v-if="loading"
        class="controls-base-element"
        :text="languageStore.l.account.button.newToken"
      />
      <ButtonNewPersonalAccessToken
        v-else
        class="controls-base-element"
        v-on:click="newToken"
        :text="languageStore.l.account.button.newToken"
      />
    </div>

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
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/form/formBase.scss';
@use '@/scss/grid/gridBase.scss';
@use '@/scss/controls/controlsBase.scss';

.form-base-container {
  padding-top: 10px;
  margin-top: 15px;
}

#grid {
  grid-template-rows: 40px;
  grid-template-columns: auto;
  grid-template-areas: 'token';
}

#token {
  grid-area: token;
}
</style>
