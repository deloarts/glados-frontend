<script setup>
import { ref, nextTick, watch, onMounted, onBeforeUnmount } from "vue"
import moment from "moment"

import { logsRequest } from "@/requests/logs"
import Spinner from "@/components/spinner/LoadingSpinner.vue"

const windowWidth = ref(window.innerWidth)
const loading = ref(false)
const logfiles = ref([])
const logfile = ref("")
const content = ref([])

function onResize() {
  windowWidth.value = window.innerWidth
}

function getLogs() {
  loading.value = true
  logsRequest.getLogs()
    .then(response => {
      logfiles.value = response.data
      loading.value = false
    })
    .catch(() => {
      console.warn('could not get logs')
      loading.value = false
    })
}

function getLog(filename) {
  if (logfile.value == filename) {
    logfile.value = ''
    content.value = []
  } else {
    loading.value = true
    logfile.value = filename
    logsRequest.getLogFile(logfile.value)
      .then(response => {
        content.value = response.data
        loading.value = false
      })
      .catch(() => {
        console.warn('could not get logfile')
        loading.value = false
      })
  }
}

function format(line, type) {
  let splitted = line.split('\t')
  if (type == 'date') { return splitted[0] }
  else if (type == 'name') { return splitted[1] }
  else if (type == 'level') { return splitted[2] }
  else if (type == 'msg') { return splitted[3] }
  else { return (line) }
}

function isDate(line) {
  let date = moment(line.split('\t')[0])
  if (date.isValid()) { return true }
  else { return false }
}

onMounted(() => {
    nextTick(() => {
      window.addEventListener('resize', onResize)
    })
    loading.value = true
    getLogs()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <div class="scope">
    <div v-if="loading && logfiles.length == 0" class="loading">
      <spinner></spinner>
    </div>
    <div v-else class="wrapper">
      <div class="files" v-bind:class="{ 'with-content': content.length != 0 }">
        <div id="list" v-if="windowWidth >= 600 || content.length == 0">
          <div class="list-item" v-bind:class="{ 'active': file == logfile }" v-for="file in logfiles" :key="file"
            v-on:click="getLog(file)">
            <div class="cell">
              <div v-if="loading && file == logfile">
                <spinner></spinner>
              </div>
              <div v-else>{{ file }}</div>
            </div>
          </div>
        </div>
        <div id="list" v-if="windowWidth < 600 && content.length > 0">
          <div class="list-item" v-on:click="getLog(logfile)">
            <div class="cell">Back</div>
          </div>
        </div>
        <div id="content" class="content" v-if="content.length != 0">
          <div class="content-wrapper">
            <div class="item" v-for="line in content" :key="line">
              <div v-if="isDate(line)">
                <div class="cell format-date center">{{ format(line, 'date') }}</div>
                <div class="cell format-level">{{ format(line, 'level') }}</div>
                <div class="cell format-msg">{{ format(line, 'msg') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/variables.scss';

.scope {
  width: 100%;
  height: 100%;
}

.wrapper {
  padding: 30px;
}

.files {
  display: grid;
  grid-gap: 10px;
  grid-template-areas: 'list';

  width: 100%;
  height: 100%;

  overflow-x: hidden;
  overflow-y: auto;

  padding-right: 10px;
  /* padding: 50px; */
}

.with-content {
  grid-template-columns: 125px auto;
  grid-template-areas: 'list content';
}

@media screen and (max-width: $max-width) {
  .with-content {
    grid-template-columns: 100%;
    grid-template-areas: 'list'
      'content';
  }
}

.loading {
  display: grid;
  padding-top: 100px;
  padding-left: 50%;
  margin-left: -16px;
}

table {
  width: 100%;
  padding-top: 50px;
  overflow: auto;
}

td {
  text-align: center;
  vertical-align: middle;
}

.list-item {
  height: 35px;
  width: 100%;
  cursor: pointer;
  display: table;
  font-family: 'Segoe UI', 'Arial';
  font-size: 12px;
  text-align: center;
  color: white;
  background: $main-background-color;
  border: 1px solid $main-color;
  border-radius: 0.25em;
  margin-bottom: 10px;
  transition: background 0.2s ease;
}

.list-item:hover {
  background: $main-background-color-hover;
}

.list-item .cell {
  display: table-cell;
  vertical-align: middle;
  width: 100%;
}

.active {
  background: $light-gray;
}

.active:hover {
  background: $light-gray-hover;
}

.content-wrapper {
  overflow: auto;
  padding: 30px;
}

.content {
  height: auto;
  overflow: auto;
  width: 100%;
  cursor: default;
  display: table;
  color: white;
  background: $main-background-color;
  border: 1px solid $main-color;
  border-radius: 0.25em;
  padding-top: 5px;
  padding-bottom: 5px;
}

.content .item {
  display: table-row;
  transition: background 0.2s ease;
}

.content .item:hover {
  background: $main-background-color-hover;
}

.content .item .cell {
  display: table-cell;
  vertical-align: middle;
  text-align: left;
  width: auto;
  font-family: 'Segoe UI', 'Arial';
  font-size: 12px;
  padding: 5px;
}

.center {
  text-align: center;
}

.format-date {
  color: $log-date;
}

.format-module {
  color: $log-module;
  text-align: center;
}

.format-level {
  color: $log-level;
  text-align: center;
}

.format-msg {
  color: $log-msg;
}

#list {
  grid-area: list;
}

#content {
  grid-area: content;
}

#back {
  grid-area: back;
}
</style>