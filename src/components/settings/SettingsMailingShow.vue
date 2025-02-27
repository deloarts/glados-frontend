<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { hostRequest } from '@/requests/api/host'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'

import LabeledInput from '@/components/elements/LabeledInput.vue'

import type { HostConfigMailSchema } from '@/schemas/host'
import type { ErrorDetailSchema } from '@/schemas/common'

const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()

const mailConfig = ref<HostConfigMailSchema>()

onMounted(() => {
  hostRequest.getHostConfigMail().then((response) => {
    if (response.status === 200) {
      const data = response.data as HostConfigMailSchema
      mailConfig.value = data
    } else {
      const data = response.data as ErrorDetailSchema
      notificationStore.addWarn(data.detail)
    }
  })
})
</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container">
      <div id="grid">
        <div id="server" class="grid-item-center">
          <LabeledInput
            :value="mailConfig?.config.server"
            :placeholder="languageStore.l.settings.mailing.input.serverPlaceholder"
            :disabled="true"
          />
        </div>
        <div id="port" class="grid-item-center">
          <LabeledInput
            :value="mailConfig?.config.port"
            :placeholder="languageStore.l.settings.mailing.input.portPlaceholder"
            :disabled="true"
          />
        </div>
        <div id="account" class="grid-item-center">
          <LabeledInput
            :value="mailConfig?.config.account"
            :placeholder="languageStore.l.settings.mailing.input.accountPlaceholder"
            :disabled="true"
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
  grid-template-rows: 50px 50px 50px;
  grid-template-columns: auto;
  grid-template-areas:
    'server'
    'port'
    'account';
}

#server {
  grid-area: server;
}

#port {
  grid-area: port;
}

#account {
  grid-area: account;
}
</style>
