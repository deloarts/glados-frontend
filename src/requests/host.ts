import { request, requestConfig } from "./index";

export class HostRequest {
  // GET
  getHostInfo() {
    return request.get("/api/web/v1/host/info", requestConfig(null));
  }
  getConfigItemsBoughtStatus() {
    return request.get(
      "/api/web/v1/host/config/items/bought/status",
      requestConfig(null),
    );
  }
  getConfigItemsBoughtUnits() {
    return request.get(
      "/api/web/v1/host/config/items/bought/units",
      requestConfig(null),
    );
  }
  getConfigItemsBoughtFilters() {
    return request.get(
      "/api/web/v1/host/config/items/bought/filters",
      requestConfig(null),
    );
  }
  getConfigItemsBoughtFiltersDefault() {
    return request.get(
      "/api/web/v1/host/config/items/bought/filters/default",
      requestConfig(null),
    );
  }

  // POST
  postConfigItemsBoughtFilter(name: string, data: object) {
    return request.post(
      `/api/web/v1/host/config/items/bought/filters/${name}`,
      requestConfig(null),
      data,
    );
  }

  // PUT
  putConfigItemsBoughtFilter(name: string, data: object) {
    return request.put(
      `/api/web/v1/host/config/items/bought/filters/${name}`,
      requestConfig(null),
      data,
    );
  }

  // DELETE
  deleteConfigItemsBoughtFilter(name: string) {
    return request.delete(
      `/api/web/v1/host/config/items/bought/filters/${name}`,
      requestConfig(null),
    );
  }
}

export const hostRequest = new HostRequest();
