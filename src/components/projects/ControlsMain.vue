<script setup lang="ts">
import { ref, computed } from 'vue'
import Toggle from '@vueform/toggle'

import router from '@/router/index'
import { projectsRequest } from '@/requests/projects'
import { boughtItemsRequest } from '@/requests/items'
import { getBoughtItemsFilterParams } from '@/requests/params'
import { camelToTitle } from '@/helper/string.helper'

import { useLanguageStore } from '@/stores/language'
import { useProjectsStore } from '@/stores/projects'
import { useProjectFilterStore } from '@/stores/filter'
import { useNotificationStore } from '@/stores/notification'
import { useUserStore } from '@/stores/user'
import { useResolutionStore } from '@/stores/resolution'
import { useProjectsControlsStore } from '@/stores/controls'

import Prompt from '@/components/main/UserPrompt.vue'
import ButtonLoadingGreen from '@/components/elements/ButtonLoadingGreen.vue'
import ButtonItemCreate from '@/components/elements/ButtonItemCreate.vue'
import ButtonFilterClear from '@/components/elements/ButtonFilterClear.vue'
import ButtonExcel from '@/components/elements/ButtonExcel.vue'
import ButtonEdit from '@/components/elements/ButtonEdit.vue'
import ButtonDelete from '@/components/elements/ButtonDelete.vue'
import ButtonSync from '@/components/elements/ButtonSync.vue'
import ButtonSyncOff from '@/components/elements/ButtonSyncOff.vue'
import ButtonClear from '@/components/elements/ButtonClear.vue'
import DropDownTableColumns from '@/components/elements/DropDownTableColumns.vue'
import DropDownTableView from '@/components/elements/DropDownTableView.vue'
import SelectPreText from '@/components/elements/SelectPreText.vue'

import type { AvailableOption } from '@/models/controls'

// Stores
const languageStore = useLanguageStore()
const projectStore = useProjectsStore()
const projectFilterStore = useProjectFilterStore()
const notificationStore = useNotificationStore()
const resolutionStore = useResolutionStore()
const userStore = useUserStore()
const projectsControlsStore = useProjectsControlsStore()

const is_guestuser = computed<boolean>(() => userStore.user.is_guestuser)
const enableControls = computed<boolean>(() => !userStore.user.is_guestuser)
const gtMinWidthDesktop = computed<boolean>(() => resolutionStore.gtMinWidthDesktop)
const gtMinWidthTablet = computed<boolean>(() => resolutionStore.gtMinWidthTablet)

// Shows
const showDeletePrompt = ref<boolean>(false)
  const loadExportExcel = ref<boolean>(false)

// Buttons
const buttonCreateText = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.project.button.newProject : ''
})
const buttonEditText = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.project.button.editProject : ''
})
const buttonDeleteText = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.project.button.deleteProject : ''
})
const buttonSyncText = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.project.button.sync : ''
})
const buttonViewsText = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.project.button.views : ''
})
const buttonColumnsText = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.project.button.columns : ''
})
const buttonClearFilterText = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.project.button.clearFilter : ''
})

// Selections
const availableOptionsLimit: Array<AvailableOption> = [
  { text: '10', value: '10' },
  { text: '25', value: '25' },
  { text: '50', value: '50' },
  { text: '100', value: '100' },
]

function onButtonNew() {
  router.push({ name: 'NewProject' })
}

function onButtonEdit() {
  if (projectStore.getSelection().length == 0) {
    notificationStore.addInfo(languageStore.l.notification.info.selectProjectFirst)
  } else if (projectStore.getSelection().length != 1) {
    notificationStore.addInfo(languageStore.l.notification.info.onlyEditOneProject)
  } else {
    router.push(`/projects/edit/${projectStore.getSelection()[0]}`)
  }
}

function onButtonDelete() {
  if (projectStore.getSelection().length == 0) {
    notificationStore.addInfo(languageStore.l.notification.info.selectProjectFirst)
  } else if (projectStore.getSelection().length != 1) {
    notificationStore.addInfo(languageStore.l.notification.info.onlyDeleteOneProject)
  } else {
    showDeletePrompt.value = true
  }
}

function deleteItem() {
  const projectID = projectStore.getSelection()[0]
  projectsRequest.deleteProjects(projectID).then((response) => {
    if (response.status === 200) {
      notificationStore.addInfo(languageStore.l.notification.info.deletedProject(projectID))
      projectStore.getItems()
    } else {
      notificationStore.addWarn(response.data.detail)
    }
  })
  showDeletePrompt.value = false
}

function onButtonClear() {
  projectStore.clearSelection()
  projectStore.getItems()
}

function clearFilter() {
  projectFilterStore.reset()
  projectStore.getItems()
}

function onButtonDownloadExcel() {
  if (projectStore.getSelection().length == 0) {
    notificationStore.addInfo(languageStore.l.notification.info.selectProjectFirst)
  } else if (projectStore.getSelection().length != 1) {
    notificationStore.addInfo(languageStore.l.notification.info.onlyExportOneProject)
  } else {
    const projectNumber = projectStore.getProjectByID(projectStore.getSelection()[0])?.number
    if (!projectNumber) {
      notificationStore.addWarn(languageStore.l.notification.warn.projectNumberNotFound)
      return
    }

    loadExportExcel.value = true   
    const params = getBoughtItemsFilterParams({ skip: null, limit: null, projectNumber: projectNumber })

    boughtItemsRequest.getItemsExcel(params).then((response) => {
      setTimeout(() => {
        loadExportExcel.value = false
      }, 400)

      if (response.status == 200) {
        const blob = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          }),
          url = window.URL.createObjectURL(blob)
        window.open(url)
      } else {
        notificationStore.addWarn(response.data.detail)
      }
    })
  }
}

</script>

<template>
  <div class="controls-base-scope">
    <div id="item-controls" v-if="enableControls" class="controls-base-container">
      <ButtonItemCreate
        class="controls-base-element"
        :text="buttonCreateText"
        v-on:click="onButtonNew"
      ></ButtonItemCreate>
      <ButtonLoadingGreen
        v-if="loadExportExcel"
        class="controls-base-element"
        :text="languageStore.l.boughtItem.button.exportExcel"
      />
      <ButtonExcel
        v-if="!loadExportExcel && gtMinWidthDesktop && !is_guestuser"
        class="controls-base-element"
        :text="languageStore.l.boughtItem.button.exportExcel"
        v-on:click="onButtonDownloadExcel"
      />
      <ButtonEdit
        class="controls-base-element"
        :text="buttonEditText"
        v-on:click="onButtonEdit"
      ></ButtonEdit>
      <ButtonDelete
        v-if="gtMinWidthTablet"
        class="controls-base-element"
        :text="buttonDeleteText"
        v-on:click="onButtonDelete"
      ></ButtonDelete>
      <ButtonClear
        class="controls-base-element"
        :text="languageStore.l.project.button.unselect"
        v-on:click="onButtonClear"
      ></ButtonClear>
    </div>
    <div id="filter-controls" class="controls-base-container">
      <ButtonSyncOff
        v-if="projectStore.paused"
        class="controls-base-element"
        :text="buttonSyncText"
      ></ButtonSyncOff>
      <ButtonSync
        v-else
        class="controls-base-element"
        :text="buttonSyncText"
        :rotate="projectStore.loading"
        v-on:click="projectStore.getItems()"
      ></ButtonSync>

      <DropDownTableView
        class="controls-base-element"
        :text="buttonViewsText"
        :hide-when-clicked="false"
      >
        <div
          v-for="(value, key) in projectsControlsStore.state"
          v-bind:key="key"
          class="drop-down-toggle-item"
        >
          <Toggle v-model="projectsControlsStore.state[key]" />
          <span class="drop-down-toggle-item-text">{{
            camelToTitle(languageStore.l.project.options.views[key])
          }}</span>
        </div>
      </DropDownTableView>

      <DropDownTableColumns
        class="controls-base-element"
        :text="buttonColumnsText"
        :hide-when-clicked="false"
      >
        <div
          v-for="(value, key) in projectsControlsStore.columns"
          class="drop-down-toggle-item"
          v-bind:key="key"
        >
          <Toggle v-model="projectsControlsStore.columns[key]"></Toggle
          ><span class="drop-down-toggle-item-text">{{
            camelToTitle(languageStore.l.project.table[key])
          }}</span>
        </div>
      </DropDownTableColumns>

      <ButtonFilterClear
        class="controls-base-element"
        :text="buttonClearFilterText"
        v-on:click="clearFilter"
      ></ButtonFilterClear>

      <SelectPreText
        v-if="gtMinWidthDesktop"
        class="controls-base-element"
        text="Limit"
        v-model:selection="projectFilterStore.state.limit"
        v-on:update:selection="projectStore.getItems()"
        :options="availableOptionsLimit"
      />
    </div>
  </div>

  <Prompt
    :text="languageStore.l.project.prompt.deleteProject"
    yes-is-danger
    v-bind:at-mouse="gtMinWidthDesktop"
    v-model:show="showDeletePrompt"
    v-bind:on-yes="deleteItem"
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
