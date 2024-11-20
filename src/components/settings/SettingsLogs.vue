<script setup lang="ts">
import { ref, watch, computed } from "vue";
// @ts-ignore
import moment from "moment";

import { logsRequest } from "@/requests/logs";

import SettingsLogsControls from "./SettingsLogsControls.vue";
import SettingsLogsTable from "./SettingsLogsTable.vue";

import type { Log } from "@/models/log";

import { useLanguageStore } from "@/stores/language";
import { useNotificationStore } from "@/stores/notification";

const languageStore = useLanguageStore();
const notificationStore = useNotificationStore();

const pickedDate = ref<Date>(null);
const logFileName = computed<string>(() => {
  if (pickedDate.value != null) {
    if (moment(pickedDate.value).isSame(moment(), "day")) {
      return "glados.log";
    }
    const day = pickedDate.value.getDate();
    const month = pickedDate.value.getMonth() + 1;
    const year = pickedDate.value.getFullYear();
    return `glados.${year}-${month}-${day}.log`;
  }
  return null;
});
const logFileContent = ref<Array<Log>>([]);

function getLogFile() {
  logFileContent.value = [];
  logsRequest
    .getLogFile(logFileName.value)
    .then((response) => {
      if (response.status == 200) {
        const content = response.data;
        let tempContent = [];
        for (let i = 0; i < content.length; i++) {
          if (isDate(getLogContent(content[i], "date"))) {
            tempContent.push({
              date: getLogContent(content[i], "date"),
              name: getLogContent(content[i], "name"),
              level: getLogContent(content[i], "level"),
              msg: getLogContent(content[i], "msg"),
            });
          }
        }
        logFileContent.value = tempContent;
      } else if (response.status == 404) {
        notificationStore.addInfo("There is no log file for this day");
      } else {
        notificationStore.addWarn(response.data.detail);
      }
    })
    .catch(() => {
      notificationStore.addWarn("Failed to fetch log file");
    });
}

function getLogContent(line: string, type: string) {
  let splitted = line.split("\t");
  if (type == "date") {
    return splitted[0];
  } else if (type == "name") {
    return splitted[1];
  } else if (type == "level") {
    return splitted[2];
  } else if (type == "msg") {
    return splitted[3];
  } else {
    return line;
  }
}

function isDate(input: string) {
  const date = moment(input);
  if (date.isValid()) {
    return true;
  } else {
    return false;
  }
}

watch(pickedDate, () => {
  if (pickedDate.value != null) {
    getLogFile();
  }
});
</script>

<template>
  <div class="scope">
    <div class="content">
      <div id="grid">
        <div id="header">
          <h1>Log Files</h1>
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
@import "@/scss/grid/gridBase.scss";

.scope {
  width: 100%;
  height: 100%;
}

.content {
  height: 100%;
}

#grid {
  grid-template-columns: 100%;
  grid-template-rows: min-content min-content calc(100vh - 300px);
  grid-template-areas:
    "header"
    "controls"
    "data";
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
