import axios from "axios";
import config from "../config";
import { request, requestConfig, requestConfigXlsxDownload } from "./index";

export class LogsRequest {
    getLogs() { return request.get("/api/web/v1/logs/", requestConfig(null)); }
    getLogFile(file: any) { return request.get(`/api/web/v1/logs/${file}/`, requestConfig(null)); }
}

export const logsRequest = new LogsRequest();
