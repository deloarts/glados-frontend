import { request, requestConfig } from './index'
import type { ApiKeysCreateSchema } from '@/schemas/apiKeys'

export class ApiKeysRequest {
  // GET
  getApiKeys() {
    return request.get('/api/web/v1/api-keys/', requestConfig(null))
  }
  getApiKeysID(id: number) {
    return request.get(`/api/web/v1/api-keys/${id}/`, requestConfig(null))
  }

  // POST
  postApiKeys(data: ApiKeysCreateSchema) {
    return request.post('/api/web/v1/api-keys/', requestConfig(null), data)
  }

  // DELETE
  deleteApiKeys(id: number) {
    return request.delete(`/api/web/v1/api-keys/${id}/`, requestConfig(null))
  }
}

export const apiKeysRequest = new ApiKeysRequest()
