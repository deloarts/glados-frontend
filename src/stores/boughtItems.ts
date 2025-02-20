import { ref, watch, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { defineStore } from 'pinia'

import constants from '@/constants'
import { boughtItemsRequest } from '@/requests/items'
import { getBoughtItemsFilterParams } from '@/requests/params'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'
import { useBoughtItemFilterStore } from '@/stores/filter'
import { useUnitsStore } from '@/stores/units'

import type { PageSchema } from '@/schemas/page'
import type { BoughtItemSchema } from '@/schemas/boughtItem'
import type { BoughtItemBatchImportSchema } from '@/schemas/boughtItem'
import type { ResponseWarning } from '@/models/response'

export const useBoughtItemsStore = defineStore('boughtItems', () => {
  const _route = useRoute()
  const _filterStore = useBoughtItemFilterStore()

  const loading = ref<boolean>(false)
  const paused = ref<boolean>(false)
  const items = ref<Array<BoughtItemSchema>>([])
  const page = ref<PageSchema>({ total: 0, limit: 0, skip: 0, pages: 1, current: 1 })
  const selectedIDs = ref<Array<number>>([])

  function clear() {
    items.value = []
    page.value = { total: 0, limit: 0, skip: 0, pages: 1, current: 1 }
    selectedIDs.value = []
  }

  function pause(state: boolean) {
    paused.value = state
  }

  function getItems(): Array<BoughtItemSchema> {
    get()
    return items.value
  }

  function clearItems() {
    items.value = []
    page.value = { total: 0, limit: 0, skip: 0, pages: 1, current: 1 }
  }

  function getSelection(): Array<number> {
    return selectedIDs.value
  }

  function setSelection(itemIDs: Array<number>) {
    selectedIDs.value = itemIDs
  }

  function clearSelection() {
    selectedIDs.value = []
  }

  async function get(): Promise<void> {
    console.log('Bought Items store requesting data ...')
    loading.value = true

    const params = getBoughtItemsFilterParams(_filterStore.state)
    return boughtItemsRequest.getItems(params).then((response) => {
      loading.value = false
      if (response.status === 200) {
        items.value = response.data.items
        page.value = {
          total: response.data.total,
          limit: response.data.limit,
          skip: response.data.skip,
          pages: response.data.pages,
          current: response.data.current,
        }
        console.log('Bought Items store got data from server.')
      }
      return response
    })
  }

  function fetchItems() {
    if (paused.value) {
      console.log('Bought Items store is paused.')
      setTimeout(fetchItems, constants.patchBoughtItemsStoreInterval)
    } else {
      get().then(() => {
        setTimeout(fetchItems, constants.patchBoughtItemsStoreInterval)
      })
    }
  }

  onBeforeMount(() => {
    clear()
    fetchItems()
  })

  watch(
    () => _filterStore.state.limit,
    async () => {
      console.log('Bought Items store limit value changed.')
      _filterStore.state.skip = 0
      clear()
      await get()
    },
    { deep: true },
  )

  watch(
    () => _filterStore.state,
    async () => {
      console.log('Bought Items store value changed.')
      clear()
      await get()
    },
    { deep: true },
  )

  watch(_route, () => {
    paused.value = !(_route.path.includes('items/bought'))
  })

  return {
    loading,
    paused,
    items,
    page,
    clear,
    pause,
    getItems,
    clearItems,
    getSelection,
    setSelection,
    clearSelection,
  }
})

export const useBoughtItemsBatchImportStore = defineStore('boughtItemsBatchImport', () => {
  const _languageStore = useLanguageStore()
  const _notificationStore = useNotificationStore()
  const _unitsStore = useUnitsStore()

  const importing = ref<boolean>(false)
  const creating = ref<boolean>(false)
  const validating = ref<boolean>(false)
  const validated = ref<boolean>(false)
  const items = ref<Array<BoughtItemBatchImportSchema>>([])
  const warnings = ref<Array<ResponseWarning>>([])

  function clear() {
    items.value = []
    warnings.value = []
  }

  function clearItems() {
    items.value = []
  }

  function clearWarnings() {
    warnings.value = []
  }

  function addEmptyRow() {
    const tempMultiData = JSON.parse(JSON.stringify(items.value))
    const temp = [
      {
        project_id: null,
        partnumber: null,
        order_number: null,
        manufacturer: null,
        quantity: 1,
        unit: _unitsStore.boughtItemUnits.default,
        supplier: null,
        group_1: null,
        weblink: null,
        note_general: null,
        note_supplier: null,
        desired_delivery_date: null,
        high_priority: null,
        notify_on_delivery: null,
      },
    ]
    for (let i = 0; i < tempMultiData.length; i++) {
      temp.push(tempMultiData[i])
    }
    items.value = temp
  }

  function removeItem(index: number) {
    items.value.splice(index, 1)
  }

  async function createItem(index: number): Promise<void> {
    return boughtItemsRequest
      .postItems(items.value[index])
      .then((response) => {
        if (response.status === 200) {
          _notificationStore.addInfo(_languageStore.l.notification.info.createdItem)
          items.value.splice(index, 1)
        } else if (response.status === 422) {
          _notificationStore.addWarn(_languageStore.l.notification.warn.someFieldsNotFilled)
          // Assign error msg to data
          for (let errIdx = 0; errIdx < response.data.detail.length; errIdx++) {
            const key = `${response.data.detail[errIdx].loc[1]}_error`
            const value = response.data.detail[errIdx].msg
            items.value[index][key] = value
          }
        } else {
          _notificationStore.addWarn(response.data.detail)
        }
        return response
      })
      .catch((error) => {
        console.log(error)
        _notificationStore.addWarn(error)
      })
  }

  async function validateAll() {
    if (items.value.length == 0) {
      _notificationStore.addInfo(_languageStore.l.notification.info.createRowFirst)
      return
    }
    validating.value = true
    validated.value = false
    let anyError = false
    for (let i = 0; i < items.value.length; i++) {
      await boughtItemsRequest.postItemsValidate(items.value[i]).then((response) => {
        if (response.status === 200) {
          items.value[i] = response.data
        } else if (response.status === 422) {
          anyError = true
          //Assign error msg to data
          for (let errIdx = 0; errIdx < response.data.detail.length; errIdx++) {
            const key = `${response.data.detail[errIdx].loc[1]}_error`
            const value = response.data.detail[errIdx].msg
            items.value[i][key] = value
          }
        } else {
          anyError = true
        }
      })
    }
    validating.value = false
    if (anyError) {
      validated.value = false
      _notificationStore.addInfo(_languageStore.l.notification.info.batchImportValidationError)
    } else {
      validated.value = true
      _notificationStore.addInfo(_languageStore.l.notification.info.batchImportAllValidated)
    }
  }

  async function createAll() {
    if (items.value.length == 0) {
      _notificationStore.addInfo(_languageStore.l.notification.info.createRowFirst)
      return
    }
    creating.value = true

    let firstNotFailedItemIdx = 0
    let anyCreated = false

    do {
      await boughtItemsRequest
        .postItems(items.value[firstNotFailedItemIdx])
        .then((response) => {
          if (response.status === 200) {
            items.value.splice(firstNotFailedItemIdx, 1)
            anyCreated = true
          } else {
            if (response.status === 422) {
              //Assign error msg to data
              for (let errIdx = 0; errIdx < response.data.detail.length; errIdx++) {
                const key = `${response.data.detail[errIdx].loc[1]}_error`
                const value = response.data.detail[errIdx].msg
                items.value[firstNotFailedItemIdx][key] = value
              }
            } else {
              _notificationStore.addWarn(response.data.detail)
            }
            firstNotFailedItemIdx++
          }
        })
        .catch((error) => {
          _notificationStore.addWarn(error)
        })
    } while (items.value.length - firstNotFailedItemIdx > 0)
    creating.value = false

    if (anyCreated && firstNotFailedItemIdx == 0) {
      _notificationStore.addInfo(_languageStore.l.notification.info.batchImportAllCreated)
    } else if (anyCreated && firstNotFailedItemIdx > 0) {
      _notificationStore.addWarn(_languageStore.l.notification.warn.batchImportSomeFailed)
    } else {
      _notificationStore.addWarn(_languageStore.l.notification.warn.batchImportAllFailed)
    }
  }

  async function importFile(file: File, serverSideValidation: boolean): Promise<void> {
    importing.value = true
    const formData = new FormData()
    formData.append('file', file)

    return boughtItemsRequest
      .postItemsExcel(formData, serverSideValidation)
      .then((response) => {
        importing.value = false
        if (response.status == 200) {
          for (let i = 0; i < response.data.length; i++) {
            items.value.push(response.data[i])
          }
          // _notificationStore.addInfo(
          //   _languageStore.l.notification.info.xlsxImportSuccess,
          // );
        } else if (response.status == 422) {
          _notificationStore.addWarn(_languageStore.l.notification.warn.xlsxUploadContentIncomplete)
          warnings.value = response.data.detail
        } else {
          _notificationStore.addWarn(response.data.detail)
        }
        return response
      })
      .catch(() => {
        importing.value = false
        _notificationStore.addWarn(_languageStore.l.notification.warn.xlsxProcessError)
      })
  }

  onBeforeMount(() => {
    importing.value = false
    validated.value = false
    validating.value = false
    creating.value = false
    warnings.value = []
  })

  watch(
    () => items.value,
    () => {
      validated.value = false
    },
    { deep: true },
  )

  return {
    importing,
    validating,
    validated,
    creating,
    items,
    warnings,
    clear,
    clearItems,
    clearWarnings,
    addEmptyRow,
    removeItem,
    importFile,
    createItem,
    validateAll,
    createAll,
  }
})
