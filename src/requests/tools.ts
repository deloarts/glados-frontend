import { request, requestConfig } from "./index";

export class ToolsStockCut1DRequest {
  // POST
  postSolver(data: object) {
    return request.post(
      "/api/web/v1/tools/stock-cut/1d/solve",
      requestConfig(null),
      data,
    );
  }
}

export const stockCut1DRequest = new ToolsStockCut1DRequest();
