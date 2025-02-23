<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { hostRequest } from '@/requests/host'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'

import LabeledInput from '@/components/elements/LabeledInput.vue'
import ButtonMailSend from '@/components/elements/ButtonMailSend.vue'

import type { HostConfigMailSchema } from '@/schemas/host'
import type { ErrorDetailSchema, ErrorValidationSchema } from '@/schemas/common'

const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()

const receiver = ref<string>('')
const mailConfig = ref<HostConfigMailSchema>()

function sendTestMail() {
  if (!mailConfig.value?.enabled) {
    notificationStore.addWarn(languageStore.l.notification.warn.mailingDisabled)
    return
  }
  if (receiver.value.length < 4) {
    notificationStore.addWarn(languageStore.l.notification.warn.receiverNotGiven)
    return
  }

  hostRequest.postSendTestMail(receiver.value).then((response) => {
    if (response.status === 200) {
      notificationStore.addInfo(languageStore.l.notification.info.sentTestMail)
    } else if (response.status === 422) {
      const data = response.data as ErrorValidationSchema
      notificationStore.addWarn(data.detail[0].msg)
    } else {
      const data = response.data as ErrorDetailSchema
      notificationStore.addWarn(data.detail)
    }
  })
}

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
        <div id="receiver" class="grid-item-center">
          <LabeledInput
            v-model:value="receiver"
            :placeholder="languageStore.l.settings.mailing.input.receiverPlaceholder"
            :disabled="!mailConfig?.enabled"
          />
        </div>
        <div id="btn">
          <ButtonMailSend
            v-on:click="sendTestMail"
            :text="languageStore.l.settings.mailing.button.sendTestMail"
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
  grid-template-rows: 50px 50px;
  grid-template-columns: auto;
  grid-template-areas:
    'receiver'
    'btn';
}

#btn {
  padding-top: 5px;
  grid-area: btn;
}

#receiver {
  grid-area: receiver;
}
</style>
