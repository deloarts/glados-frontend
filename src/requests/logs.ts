import { request, requestConfig } from './index'

export class LogsRequest {
  getLogs() {
    return request.get('/api/web/v1/logs/', requestConfig(null))
  }
  getLogFile(file: string) {
    return request.get(`/api/web/v1/logs/${file}/`, requestConfig(null))
  }
}

export const logsRequest = new LogsRequest()
