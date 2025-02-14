import { ref, watch, onBeforeMount } from 'vue'
import { defineStore } from 'pinia'

import constants from '@/constants'
import { userTimeRequest } from '@/requests/userTime'
import { useUserTimeFilterStore } from '@/stores/filter'
import { getUserTimeFilterParams } from '@/requests/params'

import type { PageSchema } from '@/schemas/page'
import type { UserTimeSchema } from '@/schemas/userTime'

export const useUserTimeStore = defineStore('userTime', () => {
  const _filterStore = useUserTimeFilterStore()

  const loading = ref<boolean>(false)
  const paused = ref<boolean>(false)
  const items = ref<UserTimeSchema[]>([])
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

  function getItems(): Array<UserTimeSchema> {
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

  async function get() {
    loading.value = true
    const params = getUserTimeFilterParams(_filterStore.state)
    return userTimeRequest.getUserTime(params).then((response) => {
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
        console.log('User Time store got data from server.')
      }
      return response
    })
  }

  function fetchItems() {
    if (paused.value) {
      console.log('User Time store is paused.')
      setTimeout(fetchItems, constants.patchUserTimeStoreInterval)
    } else {
      get().then(() => {
        setTimeout(fetchItems, constants.patchUserTimeStoreInterval)
      })
    }
  }

  watch(
    () => _filterStore.state.limit,
    async () => {
      console.log('User Time store limit value changed.')
      _filterStore.state.skip = 0
      clear()
      await get()
    },
    { deep: true },
  )

  watch(
    () => _filterStore.state,
    async () => {
      console.log('User Time store value changed.')
      clear()
      await get()
    },
    { deep: true },
  )

  onBeforeMount(() => {
    clear()
    fetchItems()
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
