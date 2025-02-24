import { ref, watch, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { defineStore } from 'pinia'

import constants from '@/constants'
import { projectsRequest } from '@/requests/api/projects'
import { useProjectFilterStore } from '@/stores/filter'
import { getProjectFilterParams } from '@/requests/urlSearchParams/projects'

import type { PageSchema } from '@/schemas/page'
import type { ProjectSchema } from '@/schemas/project'

export const useProjectsStore = defineStore('projects', () => {
  const _route = useRoute()
  const _filterStore = useProjectFilterStore()

  const loading = ref<boolean>(false)
  const paused = ref<boolean>(false)
  const items = ref<ProjectSchema[]>([])
  const all = ref<ProjectSchema[]>([])
  const active = ref<ProjectSchema[]>([])
  const inactive = ref<ProjectSchema[]>([])
  const page = ref<PageSchema<ProjectSchema>>({
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

  function getItems(): Array<ProjectSchema> {
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

  async function get() {
    loading.value = true
    const params = getProjectFilterParams(_filterStore.state)
    return projectsRequest.getProjects(params).then((response) => {
      loading.value = false
      if (response.status === 200) {
        items.value = response.data.items
        page.value = response.data
        console.log('Projects store got data from server.')
      }
      return response
    })
  }

  async function getAll() {
    loading.value = true
    const params = getProjectFilterParams(_filterStore.all)
    return projectsRequest.getProjects(params).then((response) => {
      loading.value = false
      if (response.status === 200) {
        all.value = []
        active.value = []
        inactive.value = []

        all.value = response.data.items
        for (let i = 0; i < all.value.length; i++) {
          if (all.value[i].is_active) {
            active.value.push(all.value[i])
          } else {
            inactive.value.push(all.value[i])
          }
        }
      }
      return response
    })
  }

  function fetchItems() {
    if (paused.value) {
      console.log('Project store is paused.')
      setTimeout(fetchItems, constants.patchProjectsStoreInterval)
    } else {
      get().then(() => {
        setTimeout(fetchItems, constants.patchProjectsStoreInterval)
      })
    }
  }

  function getProductNumber(project_id: number) {
    for (let i = 0; i < all.value.length; i++) {
      if (all.value[i].id == project_id) {
        return all.value[i].product_number
      }
    }
    return null
  }

  function getProjectByID(project_id: number) {
    for (let i = 0; i < all.value.length; i++) {
      if (all.value[i].id == project_id) {
        return all.value[i]
      }
    }
    return null
  }

  onBeforeMount(() => {
    clear()
    getAll()
    fetchItems()
  })

  watch(
    () => _filterStore.state.limit,
    async () => {
      console.log('Projects store limit value changed.')
      _filterStore.state.skip = 0
      clear()
      await get()
    },
    { deep: true },
  )

  watch(
    () => _filterStore.state,
    async () => {
      console.log('Projects store value changed.')
      clear()
      await get()
    },
    { deep: true },
  )

  watch(_route, () => {
    paused.value = !_route.path.includes('projects')
  })

  return {
    loading,
    paused,
    items,
    all,
    active,
    inactive,
    page,
    clear,
    pause,
    getItems,
    getAll,
    clearItems,
    getSelection,
    setSelection,
    clearSelection,
    getProductNumber,
    getProjectByID,
  }
})
