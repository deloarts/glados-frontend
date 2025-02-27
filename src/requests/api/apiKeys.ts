import { request } from '@/requests/index'
import { requestConfig } from '@/requests/configuration'
import constants from '@/constants'

import type { AxiosResponse } from 'axios'
import type { ApiKeysSchema, ApiKeysCreateSchema } from '@/schemas/apiKeys'
import type { ErrorDetailSchema } from '@/schemas/common'

export class ApiKeysRequest {
  // GET
  getApiKeys(): Promise<AxiosResponse<ApiKeysSchema[]>> {
    return request.get(constants.apiApiKeys, requestConfig(null))
  }
  getApiKeysID(id: number): Promise<AxiosResponse<ApiKeysSchema>> {
    return request.get(`${constants.apiApiKeys}/${id}/`, requestConfig(null))
  }

  // POST
  postApiKeys(
    data: ApiKeysCreateSchema,
  ): Promise<AxiosResponse<ApiKeysSchema | ErrorDetailSchema>> {
    return request.post(constants.apiApiKeys, requestConfig(null), data)
  }

  // DELETE
  deleteApiKeys(id: number): Promise<AxiosResponse<ApiKeysSchema>> {
    return request.delete(`${constants.apiApiKeys}/${id}/`, requestConfig(null))
  }
}

export const apiKeysRequest = new ApiKeysRequest()
