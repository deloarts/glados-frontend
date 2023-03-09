import { request, requestConfig } from "./index";

export class HostRequest {
    // GET
    getConfigItemsBoughtStatus() { return request.get("/api/web/v1/host/config/items/bought/status", requestConfig(null)); }
    getConfigItemsBoughtUnits() { return request.get("/api/web/v1/host/config/items/bought/units", requestConfig(null)); }
}

export const hostRequest = new HostRequest();
