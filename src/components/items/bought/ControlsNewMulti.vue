<script setup lang="ts">
import { ref } from 'vue'

import router from '@/router/index'

import { boughtItemsRequest } from '@/requests/items'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'
import { useBoughtItemsBatchImportStore } from '@/stores/boughtItems'

import ExcelImport from '@/components/items/bought/ExcelImport.vue'

import ButtonLoading from '@/components/elements/ButtonLoading.vue'
import ButtonItemCreate from '@/components/elements/ButtonItemCreate.vue'
import ButtonAbort from '@/components/elements/ButtonAbort.vue'
import ButtonDelete from '@/components/elements/ButtonDelete.vue'
import ButtonPlus from '@/components/elements/ButtonPlus.vue'
import ButtonExcel from '@/components/elements/ButtonExcel.vue'
import ButtonCheck from '@/components/elements/ButtonCheck.vue'

// Stores
const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()
const boughtItemBatchImportStore = useBoughtItemsBatchImportStore()

const showExcelImport = ref<boolean>(false)

function onCreate() {
  boughtItemBatchImportStore.createAll()
}

function onValidate() {
  boughtItemBatchImportStore.validateAll()
}

function onAbort() {
  router.push({ name: 'BoughtItems' })
}

function onNewRow() {
  boughtItemBatchImportStore.addEmptyRow()
}

function onRemoveAll() {
  boughtItemBatchImportStore.clearItems()
}

function onTemplate() {
  boughtItemsRequest.getItemsExcelTemplate().then((response) => {
    if (response.status == 200) {
      let blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      let url = window.URL.createObjectURL(blob)
      window.open(url)
    } else if (response.status == 404) {
      notificationStore.addWarn(response.data.detail)
    } else {
      notificationStore.addWarn(languageStore.l.notification.warn.xlsxTemplateDownloadFailed)
    }
  })
}
</script>

<template>
  <div class="controls-base-scope">
    <div id="item-controls" class="controls-base-container">
      <ButtonExcel
        class="controls-base-element"
        :text="languageStore.l.boughtItem.button.template"
        v-on:click="onTemplate"
      />
      <ButtonExcel
        class="controls-base-element"
        :text="languageStore.l.boughtItem.button.importExcel"
        v-on:click="showExcelImport = true"
      />
      <ButtonLoading
        v-if="boughtItemBatchImportStore.validating || boughtItemBatchImportStore.creating"
        class="controls-base-element"
        :text="
          boughtItemBatchImportStore.validating
            ? languageStore.l.boughtItem.button.validateAll
            : languageStore.l.boughtItem.button.createAll
        "
      />
      <ButtonCheck
        v-else-if="!boughtItemBatchImportStore.validated"
        class="controls-base-element"
        :text="languageStore.l.boughtItem.button.validateAll"
        v-on:click="onValidate"
      />
      <ButtonItemCreate
        v-else
        class="controls-base-element"
        :text="languageStore.l.boughtItem.button.createAll"
        v-on:click="onCreate"
      />
      <ButtonAbort
        class="controls-base-element"
        :text="languageStore.l.boughtItem.button.cancel"
        v-on:click="onAbort"
      />
    </div>
    <div id="item-controls" class="controls-base-container">
      <ButtonPlus
        class="controls-base-element"
        :text="languageStore.l.boughtItem.button.newRow"
        v-on:click="onNewRow"
      />
      <ButtonDelete
        class="controls-base-element"
        :text="languageStore.l.boughtItem.button.removeAll"
        v-on:click="onRemoveAll"
      />
    </div>
  </div>

  <ExcelImport v-model:show-uploader="showExcelImport" />
</template>

<style scoped lang="scss">
@use '@/scss/controls/controlsBase.scss';
</style>
