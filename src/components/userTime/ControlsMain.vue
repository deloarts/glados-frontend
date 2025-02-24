<script setup lang="ts">
import { ref, computed } from 'vue'

import router from '@/router/index'
import { userTimeRequest } from '@/requests/api/userTime'

import { useLanguageStore } from '@/stores/language'
import { useUserTimeStore } from '@/stores/userTime'
import { useUserTimeFilterStore } from '@/stores/filter'
import { useNotificationStore } from '@/stores/notification'
import { useResolutionStore } from '@/stores/resolution'

import Prompt from '@/components/main/UserPrompt.vue'
import ButtonUserTimeLogout from '@/components/elements/ButtonUserTimeLogout.vue'
import ButtonUserTimeLogin from '@/components/elements/ButtonUserTimeLogin.vue'
import ButtonUserTimeAdd from '@/components/elements/ButtonUserTimeAdd.vue'
import ButtonFilterClear from '@/components/elements/ButtonFilterClear.vue'
import ButtonUserTimeEdit from '@/components/elements/ButtonUserTimeEdit.vue'
import ButtonDelete from '@/components/elements/ButtonDelete.vue'
import ButtonSync from '@/components/elements/ButtonSync.vue'
import ButtonSyncOff from '@/components/elements/ButtonSyncOff.vue'
import ButtonClear from '@/components/elements/ButtonClear.vue'
// import DropDownTableColumns from '@/components/elements/DropDownTableColumns.vue'
// import DropDownTableView from '@/components/elements/DropDownTableView.vue'
import SelectPreText from '@/components/elements/SelectPreText.vue'

import type { AvailableOption } from '@/models/controls'

// Stores
const languageStore = useLanguageStore()
const userTimeStore = useUserTimeStore()
const userTimeFilterStore = useUserTimeFilterStore()
const notificationStore = useNotificationStore()
const resolutionStore = useResolutionStore()

const gtMinWidthDesktop = computed<boolean>(() => resolutionStore.gtMinWidthDesktop)
const gtMinWidthTablet = computed<boolean>(() => resolutionStore.gtMinWidthTablet)

// Shows
const showDeletePrompt = ref<boolean>(false)

// Buttons
const buttonLoginText = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.userTime.button.login : ''
})
const buttonLogoutText = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.userTime.button.logout : ''
})
const buttonCreateText = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.userTime.button.newEntry : ''
})
const buttonEditText = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.userTime.button.editEntry : ''
})
const buttonDeleteText = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.userTime.button.deleteEntry : ''
})
const buttonSyncText = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.userTime.button.sync : ''
})
// const buttonViewsText = computed<string>(() => {
//   return gtMinWidthTablet.value ? languageStore.l.userTime.button.views : ''
// })
// const buttonColumnsText = computed<string>(() => {
//   return gtMinWidthTablet.value ? languageStore.l.userTime.button.columns : ''
// })
const buttonClearFilterText = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.userTime.button.clearFilter : ''
})

// Selections
const availableOptionsLimit: Array<AvailableOption> = [
  { text: '10', value: '10' },
  { text: '25', value: '25' },
  { text: '50', value: '50' },
  { text: '100', value: '100' },
]

function onButtonLogin() {
  userTimeRequest.postUserTimeLogin().then((response) => {
    if (response.status === 200) {
      notificationStore.addInfo(languageStore.l.notification.info.loggedInNow)
      userTimeStore.getItems()
    } else {
      notificationStore.addWarn(response.data.detail)
    }
    userTimeStore.getItems()
  })
}

function onButtonLogout() {
  userTimeRequest.postUserTimeLogout().then((response) => {
    if (response.status === 200) {
      notificationStore.addInfo(languageStore.l.notification.info.loggedInNow)
      userTimeStore.getItems()
    } else {
      notificationStore.addWarn(response.data.detail)
    }
    userTimeStore.getItems()
    userTimeStore.fetchCurrentWeek()
  })
}

function onButtonNew() {
  router.push({ name: 'UserTimeNew' })
}

function onButtonEdit() {
  if (userTimeStore.getSelection().length == 0) {
    notificationStore.addInfo(languageStore.l.notification.info.selectEntryFirst)
  } else if (userTimeStore.getSelection().length != 1) {
    notificationStore.addInfo(languageStore.l.notification.info.onlyEditOneEntry)
  } else {
    router.push(`/user-time/edit/${userTimeStore.getSelection()[0]}`)
  }
}

function onButtonDelete() {
  if (userTimeStore.getSelection().length == 0) {
    notificationStore.addInfo(languageStore.l.notification.info.selectEntryFirst)
  } else if (userTimeStore.getSelection().length != 1) {
    notificationStore.addInfo(languageStore.l.notification.info.onlyDeleteOneEntry)
  } else {
    showDeletePrompt.value = true
  }
}

function deleteEntry() {
  const entryID = userTimeStore.getSelection()[0]
  userTimeRequest.deleteUserTimeByID(entryID).then((response) => {
    if (response.status === 200) {
      notificationStore.addInfo(languageStore.l.notification.info.deletedEntry(entryID))
      userTimeStore.getItems()
    } else {
      notificationStore.addWarn(response.data.detail)
    }
  })
  showDeletePrompt.value = false
}

function onButtonClear() {
  userTimeStore.clearSelection()
  userTimeStore.getItems()
}

function clearFilter() {
  userTimeFilterStore.reset()
  userTimeStore.getItems()
}
</script>

<template>
  <div class="controls-base-scope">
    <div id="item-controls" class="controls-base-container">
      <ButtonUserTimeLogin
        class="controls-base-element"
        :text="buttonLoginText"
        v-on:click="onButtonLogin"
      />
      <ButtonUserTimeLogout
        class="controls-base-element"
        :text="buttonLogoutText"
        v-on:click="onButtonLogout"
      />
      <ButtonUserTimeAdd
        class="controls-base-element"
        :text="buttonCreateText"
        v-on:click="onButtonNew"
      />
      <ButtonUserTimeEdit
        class="controls-base-element"
        :text="buttonEditText"
        v-on:click="onButtonEdit"
      />
      <ButtonDelete
        v-if="gtMinWidthTablet"
        class="controls-base-element"
        :text="buttonDeleteText"
        v-on:click="onButtonDelete"
      />
      <ButtonClear
        class="controls-base-element"
        :text="languageStore.l.userTime.button.unselect"
        v-on:click="onButtonClear"
      />
    </div>
    <div id="filter-controls" class="controls-base-container">
      <ButtonSyncOff
        v-if="userTimeStore.paused"
        class="controls-base-element"
        :text="buttonSyncText"
      />
      <ButtonSync
        v-else
        class="controls-base-element"
        :text="buttonSyncText"
        :rotate="userTimeStore.loading"
        v-on:click="userTimeStore.getItems()"
      />

      <!-- <DropDownTableView
        class="controls-base-element"
        :text="buttonViewsText"
        :hide-when-clicked="false"
      >
        <div
          v-for="(value, key) in userTimeControlsStore.state"
          v-bind:key="key"
          class="drop-down-toggle-item"
        >
          <Toggle v-model="userTimeControlsStore.state[key]" />
          <span class="drop-down-toggle-item-text">{{
            camelToTitle(languageStore.l.userTime.options.views[key])
          }}</span>
        </div>
      </DropDownTableView> -->

      <!-- <DropDownTableColumns
        class="controls-base-element"
        :text="buttonColumnsText"
        :hide-when-clicked="false"
      >
        <div
          v-for="(value, key) in userTimeControlsStore.columns"
          class="drop-down-toggle-item"
          v-bind:key="key"
        >
          <Toggle v-model="userTimeControlsStore.columns[key]"></Toggle
          ><span class="drop-down-toggle-item-text">{{
            camelToTitle(languageStore.l.userTime.table[key])
          }}</span>
        </div>
      </DropDownTableColumns> -->

      <ButtonFilterClear
        class="controls-base-element"
        :text="buttonClearFilterText"
        v-on:click="clearFilter"
        v-bind:class="{ 'controls-base-filter-applied': userTimeFilterStore.filterApplied }"
      />

      <SelectPreText
        class="controls-base-element"
        text="Limit"
        v-model:selection="userTimeFilterStore.state.limit"
        v-on:update:selection="userTimeStore.getItems()"
        :options="availableOptionsLimit"
      />
    </div>
  </div>

  <Prompt
    :text="languageStore.l.userTime.prompt.deleteEntry"
    yes-is-danger
    v-bind:at-mouse="gtMinWidthDesktop"
    v-model:show="showDeletePrompt"
    v-bind:on-yes="deleteEntry"
    v-bind:on-no="
      () => {
        showDeletePrompt = false
      }
    "
  />
</template>

<style scoped lang="scss">
@use '@/scss/controls/controlsBase.scss';
</style>
