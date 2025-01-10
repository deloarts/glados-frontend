import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'

import config from '@/config'
import { request } from '@/requests'
import type { RfidAuthSchema } from '@/schemas/rfidAuth'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'
import { useUsersStore, useUserStore } from '@/stores/user'

export const useRfidAuthStore = defineStore('rfidAuth', () => {
  const _languageStore = useLanguageStore()
  const _notificationStore = useNotificationStore()
  const _userStore = useUserStore()
  const _usersStore = useUsersStore()

  let wsConnection: WebSocket | null = null
  const connectionID = uuid()

  // Connection is true, when the websocket can be established
  const connectionOK = ref<boolean>(false)
  // Available is true, when the local service is connected with the reader device
  const readerOK = ref<boolean>(false)

  onMounted(() => {
    wsConnection = new WebSocket(`${config.url.rfidAuth}/rfid-auth/${connectionID}`)

    wsConnection.onmessage = (event: MessageEvent) => {
      const data: RfidAuthSchema = JSON.parse(event.data)
      readerOK.value = data.status == 'ok'

      if (data.rfid != null && data.api_key != null) {
        request.loginByRFID(data.rfid, data.api_key).then((response) => {
          if (response.status === 200) {
            _userStore.get()
            _usersStore.get()
          } else if (response.status === 422) {
            _notificationStore.addWarn(_languageStore.l.notification.warn.wrongUserCreds)
          } else {
            _notificationStore.addWarn(response.data.detail)
          }
        })
      }
    }

    wsConnection.onopen = (event: Event) => {
      readerOK.value = false
      connectionOK.value = true
    }
    wsConnection.onclose = (event: Event) => {
      readerOK.value = false
      connectionOK.value = false
    }
  })

  return {
    connectionOK,
    readerOK,
  }
})
