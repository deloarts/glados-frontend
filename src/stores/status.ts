import { ref, watch, onBeforeMount } from 'vue'
import { defineStore } from 'pinia'

import constants from '@/constants'
import { hostRequest } from '@/requests/api/host'

import type { AvailableOption } from '@/models/controls'
import type { HostConfigBoughtItemsStatusSchema } from '@/schemas/host'

import { useLanguageStore } from './language'

export const useStatusStore = defineStore('status', () => {
  const _languageStore = useLanguageStore()

  const loading = ref(false)
  const boughtItemStatus = ref<HostConfigBoughtItemsStatusSchema>({
    open: '',
    requested: '',
    ordered: '',
    late: '',
    partial: '',
    delivered: '',
    canceled: '',
    lost: '',
  })
  const boughtItemStatusOption = ref<Array<AvailableOption>>([])
  const boughtItemStatusOptionFilter = ref<Array<AvailableOption>>([])

  async function get() {
    console.log('Status store requesting data ...')
    loading.value = true

    return hostRequest.getConfigItemsBoughtStatus().then((response) => {
      loading.value = false
      if (response.status === 200) {
        boughtItemStatus.value = response.data

        const tempOptions = []
        const tempFilter = [
          {
            text: _languageStore.l.boughtItem.options.showAll,
            value: null,
          },
        ]
        for (const key in boughtItemStatus.value) {
          tempOptions.push({
            text: _languageStore.l.boughtItem.options.status[key],
            value: boughtItemStatus.value[key],
          })
          tempFilter.push({
            text: _languageStore.l.boughtItem.options.status[key],
            value: boughtItemStatus.value[key],
          })
        }
        boughtItemStatusOption.value = tempOptions
        boughtItemStatusOptionFilter.value = tempFilter
        console.log('Status store got data from server.')
        return response
      }
    })
  }

  function fetch() {
    get().then(() => {
      setTimeout(fetch, constants.patchServerConfigInterval)
    })
  }

  watch(
    () => _languageStore.l,
    () => {
      get()
    },
  )

  onBeforeMount(() => {
    fetch()
  })

  return {
    loading,
    boughtItemStatus,
    boughtItemStatusOption,
    boughtItemStatusOptionFilter,
  }
})
