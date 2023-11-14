import { request, requestConfig } from "./index";

export class LogsRequest {
  getLogs() {
    return request.get("/api/web/v1/logs/", requestConfig(null));
  }
  getLogFile(file: any) {
    return request.get(`/api/web/v1/logs/${file}/`, requestConfig(null));
  }
}

export const logsRequest = new LogsRequest();
