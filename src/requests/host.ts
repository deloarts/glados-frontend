import { request, requestConfig } from './index'
import constants from '@/constants'

import type { AxiosResponse } from 'axios'
import type {
  HostConfigInfoSchema,
  HostConfigBoughtItemsUnitsSchema,
  HostConfigBoughtItemsStatusSchema,
  HostConfigBoughtItemsFilterSchema,
  HostConfigBoughtItemsFilterPresetsSchema,
} from '@/schemas/host'
import type { ErrorDetailSchema } from '@/schemas/common'

export class HostRequest {
  // GET
  getHostInfo(): Promise<AxiosResponse<HostConfigInfoSchema>> {
    return request.get(`${constants.apiHost}/info`, requestConfig(null))
  }
  getConfigItemsBoughtStatus(): Promise<AxiosResponse<HostConfigBoughtItemsStatusSchema>> {
    return request.get(`${constants.apiHost}/config/items/bought/status`, requestConfig(null))
  }
  getConfigItemsBoughtUnits(): Promise<AxiosResponse<HostConfigBoughtItemsUnitsSchema>> {
    return request.get(`${constants.apiHost}/config/items/bought/units`, requestConfig(null))
  }
  getConfigItemsBoughtFilters(): Promise<AxiosResponse<HostConfigBoughtItemsFilterPresetsSchema>> {
    return request.get(`${constants.apiHost}/config/items/bought/filters`, requestConfig(null))
  }
  getConfigItemsBoughtFiltersDefault(): Promise<AxiosResponse<HostConfigBoughtItemsFilterSchema>> {
    return request.get(
      `${constants.apiHost}/config/items/bought/filters/default`,
      requestConfig(null),
    )
  }

  // POST
  postConfigItemsBoughtFilter(
    name: string,
    data: HostConfigBoughtItemsFilterSchema,
  ): Promise<AxiosResponse<HostConfigBoughtItemsFilterSchema | ErrorDetailSchema>> {
    return request.post(
      `/api/web/v1/host/config/items/bought/filters/${name}`,
      requestConfig(null),
      data,
    )
  }

  // PUT
  putConfigItemsBoughtFilter(
    name: string,
    data: HostConfigBoughtItemsFilterSchema,
  ): Promise<AxiosResponse<HostConfigBoughtItemsFilterSchema | ErrorDetailSchema>> {
    return request.put(
      `/api/web/v1/host/config/items/bought/filters/${name}`,
      requestConfig(null),
      data,
    )
  }

  // DELETE
  deleteConfigItemsBoughtFilter(
    name: string,
  ): Promise<AxiosResponse<HostConfigBoughtItemsFilterSchema | ErrorDetailSchema>> {
    return request.delete(
      `/api/web/v1/host/config/items/bought/filters/${name}`,
      requestConfig(null),
    )
  }
}

export const hostRequest = new HostRequest()
