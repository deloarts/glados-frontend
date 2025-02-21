import { request, requestConfig } from './index'
import constants from '@/constants'

import type { AxiosResponse } from 'axios'
import type { ErrorDetailSchema } from '@/schemas/common'

export class LogsRequest {
  getLogs(): Promise<AxiosResponse<string[]>> {
    return request.get(constants.apiLogs, requestConfig(null))
  }
  getLogFile(file: string): Promise<AxiosResponse<string[] | ErrorDetailSchema>> {
    return request.get(`${constants.apiLogs}/${file}/`, requestConfig(null))
  }
}

export const logsRequest = new LogsRequest()
