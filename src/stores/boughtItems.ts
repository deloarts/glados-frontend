import { ref, watch, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { defineStore } from 'pinia'

import constants from '@/constants'
import { boughtItemsRequest } from '@/requests/api/items'
import { getBoughtItemsFilterParams } from '@/requests/urlSearchParams/items'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'
import { useBoughtItemFilterStore } from '@/stores/filter'
import { useUnitsStore } from '@/stores/units'

import type { AxiosResponse } from 'axios'
import type { PageSchema } from '@/schemas/page'
import type { BoughtItemSchema, BoughtItemBatchImportSchema } from '@/schemas/boughtItem'
import type {
  ErrorDetailSchema,
  ErrorValidationSchema,
  ErrorValidationDetail,
} from '@/schemas/common'

export const useBoughtItemsStore = defineStore('boughtItems', () => {
  const _route = useRoute()
  const _filterStore = useBoughtItemFilterStore()

  const loading = ref<boolean>(false)
  const paused = ref<boolean>(false)
  const items = ref<Array<BoughtItemSchema>>([])
  const page = ref<PageSchema<BoughtItemSchema>>({
    items: [],
    total: 0,
    limit: 0,
    skip: 0,
    pages: 1,
    current: 1,
  })
  const selectedIDs = ref<Array<number>>([])

  function clear() {
    items.value = []
    page.value = { items: [], total: 0, limit: 0, skip: 0, pages: 1, current: 1 }
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
    page.value = { items: [], total: 0, limit: 0, skip: 0, pages: 1, current: 1 }
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

  async function get(): Promise<AxiosResponse<PageSchema<BoughtItemSchema>>> {
    console.log('Bought Items store requesting data ...')
    loading.value = true

    const params = getBoughtItemsFilterParams(_filterStore.state)
    return boughtItemsRequest.getItems(params).then((response) => {
      loading.value = false
      if (response.status === 200) {
        const data = response.data as PageSchema<BoughtItemSchema>
        items.value = data.items
        page.value = data
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
    paused.value = !_route.path.includes('items/bought')
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
  const warnings = ref<ErrorValidationDetail[]>([])

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

  function clearErrorMsgs() {
    for (let i = 0; i < items.value.length; i++) {
      items.value[i].project_id_error = undefined
      items.value[i].partnumber_error = undefined
      items.value[i].order_number_error = undefined
      items.value[i].manufacturer_error = undefined
      items.value[i].quantity_error = undefined
      items.value[i].unit_error = undefined
      items.value[i].supplier_error = undefined
      items.value[i].group_1_error = undefined
      items.value[i].weblink_error = undefined
      items.value[i].note_general_error = undefined
      items.value[i].note_supplier_error = undefined
      items.value[i].desired_delivery_date_error = undefined
    }
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

  async function createItem(
    index: number,
  ): Promise<BoughtItemSchema | ErrorDetailSchema | ErrorValidationSchema> {
    return boughtItemsRequest
      .postItems(items.value[index])
      .then((response) => {
        if (response.status === 200) {
          _notificationStore.addInfo(_languageStore.l.notification.info.createdItem)
          items.value.splice(index, 1)
        } else if (response.status === 422) {
          const data = response.data as ErrorValidationSchema
          _notificationStore.addWarn(_languageStore.l.notification.warn.someFieldsNotFilled)
          // Assign error msg to data
          for (let errIdx = 0; errIdx < data.detail.length; errIdx++) {
            const key = `${data.detail[errIdx].loc[1]}_error`
            const value = data.detail[errIdx].msg
            items.value[index][key] = String(value)
          }
        } else {
          const data = response.data as ErrorDetailSchema
          _notificationStore.addWarn(data.detail)
        }
        return response
      })
      .catch((error) => {
        console.log(error)
        _notificationStore.addWarn(error)
        return error
      })
  }

  async function validateAll() {
    clearErrorMsgs()
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
          const data = response.data as BoughtItemBatchImportSchema
          items.value[i] = data
        } else if (response.status === 422) {
          const data = response.data as ErrorValidationSchema
          anyError = true
          //Assign error msg to data
          for (let errIdx = 0; errIdx < data.detail.length; errIdx++) {
            const key = `${data.detail[errIdx].loc[1]}_error`
            const value = data.detail[errIdx].msg
            items.value[i][key] = String(value)
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
    clearErrorMsgs()
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
              const data = response.data as ErrorValidationSchema
              //Assign error msg to data
              for (let errIdx = 0; errIdx < data.detail.length; errIdx++) {
                const key = `${data.detail[errIdx].loc[1]}_error`
                const value = data.detail[errIdx].msg
                items.value[firstNotFailedItemIdx][key] = value
              }
            } else {
              const data = response.data as ErrorDetailSchema
              _notificationStore.addWarn(data.detail)
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

  async function importFile(
    file: File,
    serverSideValidation: boolean,
  ): Promise<
    AxiosResponse<BoughtItemBatchImportSchema[] | ErrorDetailSchema | ErrorValidationSchema>
  > {
    importing.value = true
    const formData = new FormData()
    formData.append('file', file)

    return boughtItemsRequest
      .postItemsExcel(formData, serverSideValidation)
      .then((response) => {
        importing.value = false
        if (response.status == 200) {
          const data = response.data as Array<BoughtItemBatchImportSchema>
          for (let i = 0; i < data.length; i++) {
            items.value.push(data[i])
          }
        } else if (response.status == 422) {
          const data = response.data as ErrorValidationSchema
          _notificationStore.addWarn(_languageStore.l.notification.warn.xlsxUploadContentIncomplete)
          warnings.value = data.detail
        } else {
          const data = response.data as ErrorDetailSchema
          _notificationStore.addWarn(data.detail)
        }
        return response
      })
      .catch((error) => {
        importing.value = false
        _notificationStore.addWarn(_languageStore.l.notification.warn.xlsxProcessError)
        return error
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
