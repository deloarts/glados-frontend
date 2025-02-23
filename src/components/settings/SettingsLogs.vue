<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import moment from 'moment'

import { logsRequest } from '@/requests/logs'

import SettingsLogsControls from './SettingsLogsControls.vue'
import SettingsLogsTable from './SettingsLogsTable.vue'

import type { Log } from '@/models/log'
import type { ErrorDetailSchema } from '@/schemas/common'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'

const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()

const pickedDate = ref<Date | null>(null)
const logFileName = computed<string | null>(() => {
  if (pickedDate.value != null) {
    if (moment(pickedDate.value).isSame(moment(), 'day')) {
      return 'glados.log'
    }
    return `glados.${pickedDate.value?.toISOString().split('T')[0]}.log`
  }
  return null
})
const logFileContent = ref<Array<Log>>([])

function getLogFile() {
  if (logFileName.value == null) {
    notificationStore.addWarn(languageStore.l.notification.warn.failedToFetchLog)
    return
  }

  logFileContent.value = []
  logsRequest
    .getLogFile(logFileName.value)
    .then((response) => {
      if (response.status == 200) {
        const content = response.data as string[]
        const tempContent = []
        for (let i = 0; i < content.length; i++) {
          const currentDate = getLogContent(content[i], 'date')
          if (currentDate.startsWith('20') && moment(currentDate).isValid()) {
            tempContent.push({
              date: currentDate,
              name: getLogContent(content[i], 'name'),
              level: getLogContent(content[i], 'level'),
              msg: getLogContent(content[i], 'msg'),
            })
          }
        }
        logFileContent.value = tempContent
      } else if (response.status == 404) {
        notificationStore.addInfo(languageStore.l.notification.warn.noLogForThisDay)
      } else {
        const data = response.data as ErrorDetailSchema
        notificationStore.addWarn(data.detail)
      }
    })
    .catch(() => {
      notificationStore.addWarn(languageStore.l.notification.warn.failedToFetchLog)
    })
}

function getLogContent(line: string, type: string) {
  const splitted = line.split('\t')
  if (type == 'date') {
    return splitted[0]
  } else if (type == 'name') {
    return splitted[1]
  } else if (type == 'level') {
    return splitted[2]
  } else if (type == 'msg') {
    return splitted[3]
  } else {
    return line
  }
}

watch(pickedDate, () => {
  if (pickedDate.value != null) {
    getLogFile()
  }
})

onMounted(() => {
  pickedDate.value = moment().toDate()
})
</script>

<template>
  <div class="scope">
    <div class="content">
      <div id="grid">
        <div id="header">
          <h1>{{ languageStore.l.settings.logs.banner }}</h1>
        </div>
        <div id="controls">
          <SettingsLogsControls v-model:picked-date="pickedDate" />
        </div>
        <div id="data">
          <SettingsLogsTable :log-file-content="logFileContent" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/grid/gridBase.scss';

.scope {
  width: 100%;
  height: 100%;
}

.content {
  height: 100%;
}

#grid {
  grid-template-columns: 100%;
  grid-template-rows: min-content min-content calc(100vh - 320px);
  grid-template-areas:
    'header'
    'controls'
    'data';
}

#header {
  grid-area: header;
}

#controls {
  grid-area: controls;
}

#data {
  grid-area: data;
}
</style>
