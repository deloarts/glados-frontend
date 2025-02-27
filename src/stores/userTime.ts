import { ref, watch, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { defineStore } from 'pinia'

import constants from '@/constants'

import { userTimeRequest } from '@/requests/api/userTime'
import { useUserTimeFilterStore } from '@/stores/filter'
import { getUserTimeFilterParams } from '@/requests/urlSearchParams/userTime'

import type { PageSchema } from '@/schemas/page'
import type { UserTimeSchema } from '@/schemas/userTime'
import type { HostConfigUserTimeFilterSchema } from '@/schemas/host'

import { userTimeFilterAll } from '@/presets/userTimeFilter'
import moment from 'moment'

export const useUserTimeStore = defineStore('userTime', () => {
  const _route = useRoute()
  const _filterStore = useUserTimeFilterStore()

  const loading = ref<boolean>(false)
  const paused = ref<boolean>(false)
  const items = ref<UserTimeSchema[]>([])
  const loggedInSince = ref<Date | null>()
  const weekTime = ref<Array<Array<number[]>>>([[]])
  const weekSum = ref<number[]>([0, 0, 0, 0, 0, 0, 0])
  const page = ref<PageSchema<UserTimeSchema>>({
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

  function getItems(): Array<UserTimeSchema> {
    get()
    fetchCurrentWeek()
    fetchCurrentLogin()
    return items.value
  }

  async function fetchCurrentLogin() {
    return userTimeRequest.getUserLoginTime().then((response) => {
      if (response.status === 200) {
        loggedInSince.value = response.data.login
      } else {
        loggedInSince.value = null
      }
      return response
    })
  }

  async function fetchCurrentWeek() {
    const tempWeekTime: Array<Array<number[]>> = []
    const tempWeekSum: number[] = [0, 0, 0, 0, 0, 0, 0]

    for (let i = 0; i < 7; i++) {
      const filter: HostConfigUserTimeFilterSchema = JSON.parse(JSON.stringify(userTimeFilterAll))
      const currentDate = moment()
      const startOfCurrentWeek = currentDate.clone().startOf('isoWeek')
      filter.loginFrom = moment(startOfCurrentWeek).add(i, 'days').toISOString()
      filter.loginTo = moment(filter.loginFrom).add(23, 'hours').add(59, 'minutes').toISOString()
      const params = getUserTimeFilterParams(filter)

      await userTimeRequest.getUserTime(params).then((response) => {
        if (response.status === 200) {
          let duration: number = 0
          const entries: UserTimeSchema[] = response.data.items

          for (let j = 0; j < entries.length; j++) {
            // Create a list for the days
            const loginTime = moment.utc(entries[j].login).local()
            const logoutTime = moment.utc(entries[j].logout).local()
            if (tempWeekTime.length < entries.length) {
              tempWeekTime.push([[], [], [], [], [], [], []])
            }
            if (entries[j].logout) {
              const loginData = Number((loginTime.hours() + loginTime.minutes() / 60).toFixed(1))
              let logoutData = Number((logoutTime.hours() + logoutTime.minutes() / 60).toFixed(1))
              if (logoutTime.date() > loginTime.date()) {
                logoutData = 24
              }
              tempWeekTime[j][i] = [loginData, logoutData]
            }
            // Create total sum for the day
            if (entries[j].duration_minutes) {
              duration += Number(entries[j].duration_minutes.toFixed(1))
            }
          }
          tempWeekSum[i] = duration / 60
        }
      })
    }

    if (JSON.stringify(tempWeekTime) != JSON.stringify(weekTime.value)) {
      weekTime.value = tempWeekTime
    }
    if (JSON.stringify(tempWeekSum) != JSON.stringify(weekSum.value)) {
      weekSum.value = tempWeekSum
    }
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

  async function get() {
    loading.value = true
    const params = getUserTimeFilterParams(_filterStore.state)
    return userTimeRequest.getUserTime(params).then((response) => {
      loading.value = false
      if (response.status === 200) {
        items.value = response.data.items
        page.value = {
          items: response.data.items,
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
        fetchCurrentLogin()
        fetchCurrentWeek()
        setTimeout(fetchItems, constants.patchUserTimeStoreInterval)
      })
    }
  }

  onBeforeMount(() => {
    clear()
    fetchItems()
    fetchCurrentWeek()
    fetchCurrentLogin()
  })

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

  watch(_route, () => {
    paused.value = !_route.path.includes('user-time')
  })

  // watch(
  //   () => items.value,
  //   async () => {
  //     await fetchCurrentLogin()
  //     await fetchCurrentWeek()
  //   },
  //   { deep: true },
  // )

  return {
    loading,
    paused,
    items,
    loggedInSince,
    weekTime,
    weekSum,
    page,
    clear,
    pause,
    get,
    getItems,
    fetchCurrentWeek,
    fetchCurrentLogin,
    clearItems,
    getSelection,
    setSelection,
    clearSelection,
  }
})
