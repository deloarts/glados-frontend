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
  // Used to track if current user is logged in
  const loggedIn = ref<boolean>(false)
  // To track the rfid-lookup routine
  const loading = ref<boolean>(false)
  const currentRFID = ref<string>('')

  function logout() {
    _userStore.logout()

    loading.value = false
    loggedIn.value = false
    currentRFID.value = ''
  }

  onMounted(() => {
    wsConnection = new WebSocket(`${config.url.rfidAuth}/rfid-auth/${connectionID}`)

    wsConnection.onmessage = (event: MessageEvent) => {
      const data: RfidAuthSchema = JSON.parse(event.data)
      readerOK.value = data.status == 'ok'

      if (loggedIn.value && !readerOK.value) {
        _notificationStore.addWarn(_languageStore.l.notification.warn.rfidDeviceDisconnected)
        logout()
        return
      }

      if (loggedIn.value && !data.rfid) {
        logout()
        return
      }

      if (loggedIn.value && data.rfid && data.rfid != currentRFID.value) {
        logout()
        return
      }

      if (!loggedIn.value && data.rfid && data.rfid != currentRFID.value && data.api_key) {
        currentRFID.value = data.rfid as string
        loading.value = true

        request.loginByRFID(data.rfid, data.api_key).then((response) => {
          loading.value = false
          if (response.status === 200) {
            _userStore.get()
            _usersStore.get()
            loggedIn.value = true
          } else if (response.status === 401) {
            _notificationStore.addWarn(_languageStore.l.notification.warn.wrongRFIDCreds)
          } else if (response.status === 403) {
            _notificationStore.addWarn(_languageStore.l.notification.warn.accountInactive)
          } else if (response.status === 405) {
            _notificationStore.addWarn(_languageStore.l.notification.warn.rfidDisabled)
          } else if (response.status === 406) {
            _notificationStore.addWarn(_languageStore.l.notification.warn.wrongRFIDCreds)
          } else {
            _notificationStore.addWarn(response.data.detail)
          }
        })
      }
    }

    wsConnection.onopen = () => {
      readerOK.value = false
      connectionOK.value = true
    }
    wsConnection.onclose = () => {
      readerOK.value = false
      connectionOK.value = false

      if (loggedIn.value) {
        _notificationStore.addWarn(_languageStore.l.notification.warn.rfidHostDisconnected)
        logout()
      }
    }
  })

  return {
    loading,
    loggedIn,
    connectionOK,
    readerOK,
  }
})
