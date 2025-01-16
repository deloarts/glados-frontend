import { ref, watch, onBeforeMount } from 'vue'
import { defineStore } from 'pinia'

import constants from '@/constants'
import { hostRequest } from '@/requests/host'

import type {
  HostConfigBoughtItemsFilterSchema,
  HostConfigProjectFilterSchema,
} from '@/schemas/host'

interface BoughtItemPreset {
  [key: string]: HostConfigBoughtItemsFilterSchema
}

export const useBoughtItemFilterStore = defineStore('boughtItemFilter', () => {
  const loading = ref<boolean>(false)
  const presets = ref<BoughtItemPreset>({})
  const state = ref<HostConfigBoughtItemsFilterSchema>({
    limit: 25,
    skip: null,
    ignoreDelivered: false,
    ignoreCanceled: false,
    ignoreLost: false,
    highPriority: null,
    creatorID: null,
    createdDate: null,
    changedDateFrom: null,
    desiredDate: null,
    requesterID: null,
    requestedDate: null,
    ordererID: null,
    orderedDate: null,
    expectedDate: null,
    deliveredDate: null,
    sortBy: 'id',
    id: null,
    status: null,
    projectNumber: null,
    projectCustomer: null,
    projectDescription: null,
    productNumber: null,
    quantity: null,
    unit: null,
    partnumber: null,
    orderNumber: null,
    manufacturer: null,
    supplier: null,
    group1: null,
    noteGeneral: null,
    noteSupplier: null,
    storagePlace: null,
    receiverID: null,
  })

  function set(key: string, value: string | number | Date | null) {
    state.value[key] = value
  }

  function reset() {
    state.value = {
      limit: 25,
      skip: null,
      ignoreDelivered: false,
      ignoreCanceled: false,
      ignoreLost: false,
      highPriority: null,
      creatorID: null,
      createdDate: null,
      changedDateFrom: null,
      desiredDate: null,
      requesterID: null,
      requestedDate: null,
      ordererID: null,
      orderedDate: null,
      expectedDate: null,
      deliveredDate: null,
      sortBy: 'id',
      id: null,
      status: null,
      projectNumber: null,
      projectCustomer: null,
      projectDescription: null,
      productNumber: null,
      quantity: null,
      unit: null,
      partnumber: null,
      orderNumber: null,
      manufacturer: null,
      supplier: null,
      group1: null,
      noteGeneral: null,
      noteSupplier: null,
      storagePlace: null,
      receiverID: null,
    }
    console.log('Reset bought items filter')
  }

  function saveMy() {
    localStorage.setItem('gladosBoughtItemMyFilter', JSON.stringify(state.value))
    console.log('Saved bought items user filter to local storage.')
  }

  function loadMy() {
    const filterObject = localStorage.getItem('gladosBoughtItemMyFilter')
    if (filterObject != null) {
      state.value = JSON.parse(filterObject)
      console.log('Got bought items user filter from local storage.')
    }
  }

  function applyPreset(name: string) {
    if (name in presets.value) {
      const p = presets.value[name]
      state.value = {
        limit: p.limit,
        skip: null,
        ignoreDelivered: p.ignoreDelivered,
        ignoreCanceled: p.ignoreCanceled,
        ignoreLost: p.ignoreLost,
        highPriority: p.highPriority,
        creatorID: p.creatorID,
        createdDate: p.createdDate,
        changedDateFrom: p.changedDateFrom,
        desiredDate: p.deliveredDate,
        requesterID: p.requesterID,
        requestedDate: p.requestedDate,
        ordererID: p.ordererID,
        orderedDate: p.orderedDate,
        expectedDate: p.expectedDate,
        deliveredDate: p.deliveredDate,
        sortBy: p.sortBy,
        id: p.id,
        status: p.status,
        projectNumber: p.projectNumber,
        projectCustomer: p.projectCustomer,
        projectDescription: p.projectDescription,
        productNumber: p.productNumber,
        quantity: p.quantity,
        unit: p.unit,
        partnumber: p.partnumber,
        orderNumber: p.orderNumber,
        manufacturer: p.manufacturer,
        supplier: p.supplier,
        group1: p.group1,
        noteGeneral: p.noteGeneral,
        noteSupplier: p.noteSupplier,
        storagePlace: p.storagePlace,
        receiverID: p.receiverID,
      }
    }
  }

  async function get() {
    console.log('Filter store is requesting presets ...')
    loading.value = true

    return hostRequest.getConfigItemsBoughtFilters().then((response) => {
      loading.value = false
      if (response.status === 200) {
        presets.value = response.data
        console.log('Filter store got data from server.')
      }
      return response
    })
  }

  function getPresets() {
    get().then(() => {
      setTimeout(getPresets, constants.patchServerConfigInterval)
    })
  }

  watch(
    state,
    () => {
      localStorage.setItem('gladosBoughtItemFilter', JSON.stringify(state.value))
      console.log('Saved bought items filter to local storage.')
    },
    { deep: true },
  )

  onBeforeMount(() => {
    getPresets()

    const ls = localStorage.getItem('gladosBoughtItemFilter')
    if (ls != null) {
      state.value = JSON.parse(ls)
      console.log('Got bought items filter from local storage.')
    }
  })

  return {
    state,
    presets,
    get,
    set,
    reset,
    applyPreset,
    saveMy,
    loadMy,
  }
})

export const useProjectFilterStore = defineStore('projectFilter', () => {
  const state = ref<HostConfigProjectFilterSchema>({
    limit: 25,
    skip: null,
    id: null,
    number: null,
    productNumber: null,
    customer: null,
    description: null,
    isActive: null,
    designatedUserID: null,
  })
  const all: HostConfigProjectFilterSchema = {
    limit: null,
    skip: null,
    id: null,
    number: null,
    productNumber: null,
    customer: null,
    description: null,
    isActive: null,
    designatedUserID: null,
  }

  function set(key: string, value: string | number | Date | null) {
    state.value[key] = value
  }

  function reset() {
    state.value = {
      limit: 25,
      skip: null,
      id: null,
      number: null,
      productNumber: null,
      customer: null,
      description: null,
      isActive: null,
      designatedUserID: null,
    }
  }

  onBeforeMount(() => {
    reset()
  })

  return { state, all, set, reset }
})
