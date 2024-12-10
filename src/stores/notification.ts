import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
// @ts-ignore
import moment from 'moment'

export const warningType = 'warning'
export const infoType = 'info'

interface notificationItem {
  create: Date
  destroy: Date
  type: string
  message: string
}

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Array<notificationItem>>([])

  function add(type: string, message: string) {
    notifications.value.push({
      //@ts-ignore
      create: moment(),
      //@ts-ignore
      destroy: moment().add(4, 'seconds'),
      type: type,
      message: message,
    })
  }

  function addInfo(message: string) {
    add(infoType, message)
  }

  function addWarn(message: string) {
    add(warningType, message)
  }

  function clear() {
    notifications.value = []
  }

  onMounted(() => {
    setInterval(() => {
      const items: Array<notificationItem> = []
      for (let i = 0; i < notifications.value.length; i++) {
        //@ts-ignore
        if (notifications.value[i].destroy > moment()) {
          items.push(notifications.value[i])
        }
      }
      notifications.value = items
    }, 1000)
  })

  return { notifications, addInfo, addWarn, clear }
})
