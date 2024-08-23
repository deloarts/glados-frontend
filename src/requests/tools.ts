import { request, requestConfig } from "./index";

export class ToolsStockCutRequest {
  // POST
  postSolver(data: object) {
    return request.post(
      "/api/web/v1/tools/stock-cut/1d/solve",
      requestConfig(null),
      data,
    );
  }
}

export const stockCutRequest = new ToolsStockCutRequest();
