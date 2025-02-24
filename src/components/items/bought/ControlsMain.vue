<script setup lang="ts">
import { ref, watch, computed, onBeforeMount } from 'vue'
import Toggle from '@vueform/toggle'

import router from '@/router/index'
import { useLanguageStore } from '@/stores/language'
import { useBoughtItemsControlsStore } from '@/stores/controls'
import { useBoughtItemFilterStore } from '@/stores/filter'
import { useBoughtItemsStore } from '@/stores/boughtItems'
import { useNotificationStore } from '@/stores/notification'
import { useUserStore } from '@/stores/user'
import { useResolutionStore } from '@/stores/resolution'
import { boughtItemsRequest } from '@/requests/items'
import { getBoughtItemsFilterParams } from '@/requests/params'
import { camelToTitle } from '@/helper/string.helper'

import Prompt from '@/components/main/UserPrompt.vue'
import ButtonLoadingGreen from '@/components/elements/ButtonLoadingGreen.vue'
import ButtonItemCreate from '@/components/elements/ButtonItemCreate.vue'
import ButtonEdit from '@/components/elements/ButtonEdit.vue'
import ButtonCopy from '@/components/elements/ButtonCopy.vue'
import ButtonDelete from '@/components/elements/ButtonDelete.vue'
import ButtonExcel from '@/components/elements/ButtonExcel.vue'
import ButtonSync from '@/components/elements/ButtonSync.vue'
import ButtonSyncOff from '@/components/elements/ButtonSyncOff.vue'
import ButtonFilterClear from '@/components/elements/ButtonFilterClear.vue'
import ButtonFilterSave from '@/components/elements/ButtonFilterSave.vue'
import ButtonFilterLoad from '@/components/elements/ButtonFilterLoad.vue'
import ButtonClear from '@/components/elements/ButtonClear.vue'
import ButtonView from '@/components/elements/ButtonView.vue'
import ButtonShowInitial from '@/components/elements/ButtonShowInitial.vue'
import DropDownTableView from '@/components/elements/DropDownTableView.vue'
import DropDownTableColumns from '@/components/elements/DropDownTableColumns.vue'
import SelectPreText from '@/components/elements/SelectPreText.vue'

import type { AvailableOption } from '@/models/controls'
import type { ErrorDetailSchema } from '@/schemas/common'

// Stores
const languageStore = useLanguageStore()
const boughtItemsStore = useBoughtItemsStore()
const controlsStore = useBoughtItemsControlsStore()
const filterStore = useBoughtItemFilterStore()
const notificationStore = useNotificationStore()
const resolutionStore = useResolutionStore()
const userStore = useUserStore()

const is_guestuser = computed<boolean>(() => userStore.user.is_guestuser)
const gtMinWidthDesktop = computed<boolean>(() => resolutionStore.gtMinWidthDesktop)
const gtMinWidthTablet = computed<boolean>(() => resolutionStore.gtMinWidthTablet)

// Shows
const showDeletePrompt = ref<boolean>(false)
const loadExportExcel = ref<boolean>(false)

// Buttons
const buttonItemCreateText = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.boughtItem.button.newItem : ''
})
const buttonItemEditText = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.boughtItem.button.editItem : ''
})
const buttonItemCopyText = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.boughtItem.button.copyItem : ''
})
const buttonSyncText = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.boughtItem.button.sync : ''
})
const buttonViewText = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.boughtItem.button.view : ''
})
const buttonViewsText = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.boughtItem.button.views : ''
})
const buttonColumnsText = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.boughtItem.button.columns : ''
})
const buttonClearFilterText = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.boughtItem.button.clearFilter : ''
})

// Selections
const availableOptionsLimit: Array<AvailableOption> = [
  { text: '10', value: '10' },
  { text: '25', value: '25' },
  { text: '50', value: '50' },
  { text: '100', value: '100' },
]
const availableOptionsOrderBy = computed<Array<AvailableOption>>(() => {
  return [
    { text: languageStore.l.boughtItem.options.orderBy.id, value: 'id' },
    {
      text: languageStore.l.boughtItem.options.orderBy.created,
      value: 'created',
    },
    {
      text: languageStore.l.boughtItem.options.orderBy.project,
      value: 'project',
    },
    {
      text: languageStore.l.boughtItem.options.orderBy.product,
      value: 'productNumber',
    },
    { text: languageStore.l.boughtItem.options.orderBy.group, value: 'group1' },
    {
      text: languageStore.l.boughtItem.options.orderBy.manufacturer,
      value: 'manufacturer',
    },
    {
      text: languageStore.l.boughtItem.options.orderBy.supplier,
      value: 'supplier',
    },
  ]
})
const availableOptionsFilterPresets = computed<Array<AvailableOption>>(() => {
  const presets = []
  for (const key in filterStore.presets) {
    presets.push({ text: camelToTitle(key), value: key })
  }
  return presets
})
const selectedOptionFilterPreset = ref<string>('')

function saveFilter() {
  filterStore.saveMy()
  boughtItemsStore.getItems()
  notificationStore.addInfo(languageStore.l.notification.info.savedNewFilter)
}

function loadFilter() {
  filterStore.loadMy()
  boughtItemsStore.getItems()
}

function clearFilter() {
  selectedOptionFilterPreset.value = ''
  filterStore.reset()
  boughtItemsStore.getItems()
  console.log('Cleared filter')
}

function onButtonNewItem() {
  router.push({ name: 'NewBoughtItem' })
}

function onButtonView() {
  if (boughtItemsStore.getSelection().length == 0) {
    notificationStore.addInfo(languageStore.l.notification.info.selectItemFirst)
  } else if (boughtItemsStore.getSelection().length != 1) {
    notificationStore.addInfo(languageStore.l.notification.info.onlyViewOneItem)
  } else {
    router.push(`/items/bought/view/${boughtItemsStore.getSelection()[0]}`)
  }
}

function onButtonEdit() {
  if (boughtItemsStore.getSelection().length == 0) {
    notificationStore.addInfo(languageStore.l.notification.info.selectItemFirst)
  } else if (boughtItemsStore.getSelection().length != 1) {
    notificationStore.addInfo(languageStore.l.notification.info.onlyEditOneItem)
  } else {
    router.push(`/items/bought/edit/${boughtItemsStore.getSelection()[0]}`)
  }
}

function onButtonCopy() {
  if (boughtItemsStore.getSelection().length == 0) {
    notificationStore.addInfo(languageStore.l.notification.info.selectItemFirst)
  } else if (boughtItemsStore.getSelection().length != 1) {
    notificationStore.addInfo(languageStore.l.notification.info.onlyCopyOneItem)
  } else {
    router.push(`/items/bought/copy/${boughtItemsStore.getSelection()[0]}`)
  }
}

function onButtonDelete() {
  if (boughtItemsStore.getSelection().length == 0) {
    notificationStore.addInfo(languageStore.l.notification.info.selectItemFirst)
  } else if (boughtItemsStore.getSelection().length != 1) {
    notificationStore.addInfo(languageStore.l.notification.info.onlyDeleteOneItem)
  } else {
    showDeletePrompt.value = true
  }
}

function onButtonDownloadExcel() {
  loadExportExcel.value = true
  const params = getBoughtItemsFilterParams(filterStore.state)

  boughtItemsRequest.getItemsExcel(params).then((response) => {
    setTimeout(() => { loadExportExcel.value = false }, 400)
      
    if (response.status == 200) {
      const data = response.data as BlobPart
      const blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }),
        url = window.URL.createObjectURL(blob)
      window.open(url)
    } else {
      const data = response.data as ErrorDetailSchema
      notificationStore.addWarn(data.detail)
    }
  })
}

function onButtonBatchCreate() {
  router.push({ name: 'NewMultiBoughtItem' })
}

function deleteItem() {
  const itemID = boughtItemsStore.getSelection()[0]
  boughtItemsRequest.deleteItemsID(itemID).then((response) => {
    if (response.status === 200) {
      notificationStore.addInfo(languageStore.l.notification.info.deletedItem(itemID))
      boughtItemsStore.getItems()
    } else {
      const data = response.data as ErrorDetailSchema
      notificationStore.addWarn(data.detail)
    }
  })
  showDeletePrompt.value = false
}

function onButtonClear() {
  boughtItemsStore.clearSelection()
  boughtItemsStore.getItems()
}

function setupMobileView() {
  if (!gtMinWidthTablet.value) {
    // controlsStore.state.lockCols = false;
  }
}

function setupTabletView() {
  if (!gtMinWidthDesktop.value) {
    // controlsStore.state.lockCols = false;
  }
}

watch(selectedOptionFilterPreset, () => {
  const name = selectedOptionFilterPreset.value
  filterStore.applyPreset(name)
  boughtItemsStore.getItems()
})

watch(gtMinWidthTablet, () => {
  setupMobileView()
})

watch(gtMinWidthDesktop, () => {
  setupTabletView()
})

onBeforeMount(setupMobileView)
onBeforeMount(setupTabletView)
</script>

<template>
  <div class="controls-base-scope">
    <div id="item-controls" class="controls-base-container">
      <ButtonItemCreate
        v-if="!is_guestuser"
        class="controls-base-element"
        v-model:text="buttonItemCreateText"
        v-on:click="onButtonNewItem"
      />
      <ButtonItemCreate
        v-if="gtMinWidthDesktop && !is_guestuser"
        class="controls-base-element"
        :text="languageStore.l.boughtItem.button.batchCreate"
        v-on:click="onButtonBatchCreate"
      />
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
        v-if="!is_guestuser"
        class="controls-base-element"
        v-model:text="buttonItemEditText"
        v-on:click="onButtonEdit"
      />
      <ButtonCopy
        v-if="!is_guestuser"
        class="controls-base-element"
        v-model:text="buttonItemCopyText"
        v-on:click="onButtonCopy"
      />
      <ButtonDelete
        v-if="gtMinWidthTablet && !is_guestuser"
        class="controls-base-element"
        :text="languageStore.l.boughtItem.button.deleteItem"
        v-on:click="onButtonDelete"
      />
      <ButtonView
        class="controls-base-element"
        :text="buttonViewText"
        v-on:click="onButtonView"
      />
      <ButtonClear
        class="controls-base-element"
        :text="languageStore.l.boughtItem.button.unselect"
        v-on:click="onButtonClear"
      />
    </div>
    <div id="filter-controls" class="controls-base-container">
      <ButtonSyncOff
        v-if="boughtItemsStore.paused"
        class="controls-base-element"
        v-model:text="buttonSyncText"
      />

      <ButtonSync
        v-else
        class="controls-base-element"
        v-model:text="buttonSyncText"
        v-model:rotate="boughtItemsStore.loading"
        v-on:click="boughtItemsStore.getItems()"
      />

      <DropDownTableView
        class="controls-base-element"
        v-model:text="buttonViewsText"
        :hide-when-clicked="false"
      >
        <div class="drop-down-toggle-item">
          <Toggle
            v-model="filterStore.state.ignoreDelivered"
            @change="boughtItemsStore.getItems()"
          />
          <span class="drop-down-toggle-item-text">{{
            languageStore.l.boughtItem.options.views.ignoreDelivered
          }}</span>
        </div>
        <div class="drop-down-toggle-item">
          <Toggle
            v-model="filterStore.state.ignoreCanceled"
            @change="boughtItemsStore.getItems()"
          />
          <span class="drop-down-toggle-item-text">{{
            languageStore.l.boughtItem.options.views.ignoreCanceled
          }}</span>
        </div>
        <div class="drop-down-toggle-item">
          <Toggle v-model="filterStore.state.ignoreLost" @change="boughtItemsStore.getItems()" />
          <span class="drop-down-toggle-item-text">{{
            languageStore.l.boughtItem.options.views.ignoreLost
          }}</span>
        </div>

        <hr />

        <div
          v-for="(value, key) in controlsStore.state"
          v-bind:key="key"
          class="drop-down-toggle-item"
        >
          <Toggle v-model="controlsStore.state[key]" />
          <span class="drop-down-toggle-item-text">{{
            camelToTitle(languageStore.l.boughtItem.options.views[key])
          }}</span>
        </div>
      </DropDownTableView>

      <DropDownTableColumns
        class="controls-base-element"
        v-model:text="buttonColumnsText"
        :hide-when-clicked="false"
        :overflow="true"
      >
        <div class="drop-down-button-item">
          <ButtonShowInitial
            :text="languageStore.l.boughtItem.button.showAll"
            v-on:click="controlsStore.enableAllColumns()"
          />
        </div>

        <div
          v-for="(value, key) in controlsStore.columns"
          v-bind:key="key"
          class="drop-down-toggle-item"
        >
          <Toggle v-model="controlsStore.columns[key]" />
          <span class="drop-down-toggle-item-text">{{
            camelToTitle(languageStore.l.boughtItem.table[key])
          }}</span>
        </div>
      </DropDownTableColumns>

      <ButtonFilterSave
        v-if="gtMinWidthDesktop"
        class="controls-base-element"
        :text="languageStore.l.boughtItem.button.saveFilter"
        v-on:click="saveFilter"
      />
      <ButtonFilterLoad
        v-if="gtMinWidthDesktop"
        class="controls-base-element"
        :text="languageStore.l.boughtItem.button.loadFilter"
        v-on:click="loadFilter"
      />
      <ButtonFilterClear
        class="controls-base-element"
        v-model:text="buttonClearFilterText"
        v-on:click="clearFilter"
        v-bind:class="{ 'controls-base-filter-applied': filterStore.filterApplied }"
      />

      <SelectPreText
        v-if="gtMinWidthDesktop"
        class="controls-base-element"
        text="Limit"
        v-model:selection="filterStore.state.limit"
        v-on:update:selection="boughtItemsStore.getItems()"
        :options="availableOptionsLimit"
      />
      <SelectPreText
        v-if="gtMinWidthTablet"
        class="controls-base-element"
        :text="languageStore.l.boughtItem.button.sortBy"
        v-model:selection="filterStore.state.sortBy"
        v-on:update:selection="boughtItemsStore.getItems()"
        :options="availableOptionsOrderBy"
      />
      <SelectPreText
        class="controls-base-element"
        :text="languageStore.l.boughtItem.button.preset"
        v-model:selection="selectedOptionFilterPreset"
        v-on:update:selection="boughtItemsStore.getItems()"
        :options="availableOptionsFilterPresets"
      />
    </div>
  </div>

  <Prompt
    :text="languageStore.l.boughtItem.prompt.deleteItem"
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
