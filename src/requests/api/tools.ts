import { request } from '@/requests/index'
import { requestConfig, requestConfigPdfDownload } from '@/requests/config'
import constants from '@/constants'

export class ToolsStockCut1DRequest {
  postSolver(data: object) {
    return request.post(`${constants.apiTools}/stock-cut/1d/solve`, requestConfig(null), data)
  }
}

export class ToolsStockCut2DRequest {
  postSolver(data: object) {
    return request.post(`${constants.apiTools}/stock-cut/2d/solve`, requestConfig(null), data)
  }

  postGenerate(data: object, output_format: string) {
    const params = new URLSearchParams()
    params.append('output_format', output_format)
    return request.post(
      `${constants.apiTools}/stock-cut/2d/generate`,
      requestConfigPdfDownload(params),
      data,
    )
  }
}

export const stockCut1DRequest = new ToolsStockCut1DRequest()
export const stockCut2DRequest = new ToolsStockCut2DRequest()
