import { request } from '@/requests/index'
import { requestConfig } from '@/requests/configuration'
import config from '@/config'
import constants from '@/constants'

import type { AxiosResponse } from 'axios'
import type { UserSchema, UserCreateSchema, UserUpdateSchema } from '@/schemas/user'
import type { ErrorDetailSchema, ErrorValidationSchema } from '@/schemas/common'

export class UsersRequest {
  // GET
  async getUsers(): Promise<AxiosResponse<UserSchema[]>> {
    return request.get(constants.apiUsers, requestConfig(null))
  }
  async getUsersMe(): Promise<AxiosResponse<UserSchema>> {
    return request.get(`${constants.apiUsers}/me/`, requestConfig(null))
  }
  async getUsersID(id: number): Promise<AxiosResponse<UserSchema | ErrorDetailSchema>> {
    return request.get(`${constants.apiUsers}/${id}/`, requestConfig(null))
  }

  // POST
  async postUsers(
    data: UserCreateSchema,
  ): Promise<AxiosResponse<UserSchema | ErrorDetailSchema | ErrorValidationSchema>> {
    return request.post(constants.apiUsers, requestConfig(null), data)
  }

  // PUT
  async putUsers(
    id: number,
    data: UserUpdateSchema,
  ): Promise<AxiosResponse<UserSchema | ErrorDetailSchema | ErrorValidationSchema>> {
    return request.put(`${constants.apiUsers}/${id}/`, requestConfig(null), data)
  }
  async putUsersMe(
    data: UserUpdateSchema,
  ): Promise<AxiosResponse<UserSchema | ErrorDetailSchema | ErrorValidationSchema>> {
    return request.put(`${constants.apiUsers}/me/`, requestConfig(null), data)
  }
  async putUsersMePAT(): Promise<AxiosResponse<string | ErrorDetailSchema>> {
    const params = new URLSearchParams()
    params.append('expires_in_minutes', config.patExpireMinutes.toString())
    return request.put(
      `${constants.apiUsers}/me/personal-access-token`,
      requestConfig(params),
      null,
    )
  }
  async putUsersMeLanguage(
    language: string,
  ): Promise<AxiosResponse<UserSchema | ErrorDetailSchema>> {
    const params = new URLSearchParams()
    params.append('language', language)
    return request.put(`${constants.apiUsers}/me/language`, requestConfig(params), null)
  }
  async putUsersMeTheme(theme: string): Promise<AxiosResponse<UserSchema | ErrorDetailSchema>> {
    const params = new URLSearchParams()
    params.append('theme', theme)
    return request.put(`${constants.apiUsers}/me/theme`, requestConfig(params), null)
  }
}

export const usersRequest = new UsersRequest()
