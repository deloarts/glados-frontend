import { ref } from 'vue'
import { defineStore } from 'pinia'

import { apiKeysRequest } from '@/requests/api/apiKeys'
import type { ApiKeysSchema } from '@/schemas/apiKeys'

export const useApiKeysStore = defineStore('apiKeys', () => {
  const loading = ref<boolean>(false)
  const apiKeys = ref<Array<ApiKeysSchema>>([])

  async function get() {
    loading.value = true
    return apiKeysRequest.getApiKeys().then((response) => {
      loading.value = false
      if (response.status === 200) {
        apiKeys.value = response.data
      }
      return response
    })
  }

  function getByID(id: number | null): ApiKeysSchema | null {
    if (id == null) {
      return null
    }
    for (let i = 0; i < apiKeys.value.length; i++) {
      if (apiKeys.value[i].id == id) {
        return apiKeys.value[i]
      }
    }
    return null
  }

  return {
    get,
    getByID,
    loading,
    apiKeys,
  }
})
