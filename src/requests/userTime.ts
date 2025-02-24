import { request, requestConfig } from './index'
import constants from '@/constants'

import type { AxiosResponse, AxiosError } from 'axios'
import type { UserTimeSchema, UserTimeCreateSchema, UserTimeUpdateSchema } from '@/schemas/userTime'
import type { PageSchema } from '@/schemas/page'

export class UserTimeRequest {
  // GET
  async getUserTime(params: URLSearchParams): Promise<AxiosResponse<PageSchema<UserTimeSchema>>> {
    return request.get(constants.apiUserTime, requestConfig(params))
  }
  async getUserTimeByID(id: number): Promise<AxiosResponse<UserTimeSchema>> {
    return request.get(`${constants.apiUserTime}/${id}/`, requestConfig(null))
  }
  async getUserLoginTime(): Promise<AxiosResponse<UserTimeSchema>> {
    return request.get(`${constants.apiUserTime}/login/`, requestConfig(null))
  }

  // POST
  async postUserTime(data: UserTimeCreateSchema): Promise<AxiosResponse<UserTimeSchema> | AxiosError> {
    return request.post(constants.apiUserTime, requestConfig(null), data)
  }
  async postUserTimeLogin(): Promise<AxiosResponse<UserTimeSchema>> {
    return request.post(`${constants.apiUserTime}/login/`, requestConfig(null), null)
  }
  async postUserTimeLogout(): Promise<AxiosResponse<UserTimeSchema>> {
    return request.post(`${constants.apiUserTime}/logout/`, requestConfig(null), null)
  }

  // PUT
  async putUserTimeByID(id: number, data: UserTimeUpdateSchema): Promise<AxiosResponse<UserTimeSchema>> {
    return request.put(`${constants.apiUserTime}/${id}/`, requestConfig(null),data)
  }
  async putUserTimeLogin(id: number, value: string): Promise<AxiosResponse<UserTimeSchema>> {
    const params = new URLSearchParams()
    params.append('value', value)
    return request.put(`${constants.apiUserTime}/${id}/login/`, requestConfig(params), null)
  }
  async putUserTimeLogout(id: number, value: string): Promise<AxiosResponse<UserTimeSchema>> {
    const params = new URLSearchParams()
    params.append('value', value)
    return request.put(`${constants.apiUserTime}/${id}/logout/`, requestConfig(params), null)
  }
  async putUserTimeNote(id: number, value: string): Promise<AxiosResponse<UserTimeSchema>> {
    const params = new URLSearchParams()
    params.append('value', value)
    return request.put(`${constants.apiUserTime}/${id}/field/optional/note/`, requestConfig(params), null)
  }

  // DELETE
  async deleteUserTimeByID(id: number): Promise<AxiosResponse<UserTimeSchema>> {
    return request.delete(`${constants.apiUserTime}/${id}/`, requestConfig(null))
  }
}

export const userTimeRequest = new UserTimeRequest()
