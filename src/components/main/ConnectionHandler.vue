<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue'
import { useRoute } from 'vue-router'

import config from '@/config'
import constants from '@/constants'
import router from '@/router/index'
import { request, requestConfig } from '@/requests/index'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'

import FullScreenWarning from '@/components/main/FullScreenWarning.vue'

// Routes
const route = useRoute()

// Store
const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()

const showBox = ref<boolean>(false)
const text = ref<string>('')
const sub = ref<string>('')

function onReconnection() {
  showBox.value = false
  notificationStore.addInfo(languageStore.l.notification.info.reconnectedToServer)

  if (!config.debug) {
    localStorage.setItem('gladosTokenValue', '')
    localStorage.setItem('gladosTokenType', '')
    router.push({ name: 'Login' })
  }
}

function watchServerConnection() {
  request
    .get(constants.apiGetHostVersion, requestConfig(null))
    .then((response) => {
      if (response.status === 200) {
        const serverVersion = response.data.version.split('.')
        const requiredVersion = constants.serverVersion.split('.')

        if (
          serverVersion[0] != requiredVersion[0] ||
          serverVersion[1] != requiredVersion[1] ||
          serverVersion[2] < requiredVersion[2]
        ) {
          console.error('Server version is not supported.')
          text.value = languageStore.l.main.serverVersionNotSupported
          sub.value = languageStore.l.main.serverVersionNotSupportedSub
          showBox.value = true
        } else if (showBox.value) {
          onReconnection()
        }
      } else if (showBox.value) {
        onReconnection()
      }
      setTimeout(watchServerConnection, constants.watchServerConnInterval)
    })
    .catch((error) => {
      if (error.status == undefined) {
        console.error('Lost server connection.')
        text.value = languageStore.l.main.noServerConnection
        sub.value = languageStore.l.main.noServerConnectionSub
        showBox.value = true
      }
      setTimeout(watchServerConnection, 1000)
    })
}

onBeforeMount(() => watchServerConnection())

watch(route, () => {
  if (
    localStorage.getItem('gladosTokenValue') == '' ||
    localStorage.getItem('gladosTokenValue') == null
  ) {
    router.push({ name: 'Login' })
  }
})
</script>

<template>
  <FullScreenWarning
    v-model:show="showBox"
    v-model:text="text"
    v-model:sub="sub"
  ></FullScreenWarning>
</template>

<style scoped lang="scss"></style>
