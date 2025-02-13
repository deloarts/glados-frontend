import { request, requestConfig, requestConfigXlsxDownload, requestConfigFileUpload } from './index'

export class BoughtItemsRequest {
  // GET
  getItems(params: URLSearchParams) {
    return request.get('/api/web/v1/items/bought/', requestConfig(params))
  }
  getItemsExcel(params: URLSearchParams) {
    return request.get('/api/web/v1/items/bought/excel/', requestConfigXlsxDownload(params))
  }
  getItemsExcelTemplate() {
    return request.get('/api/web/v1/items/bought/excel-template/', requestConfigXlsxDownload(null))
  }
  getItemsID(id: Number) {
    return request.get(`/api/web/v1/items/bought/${id}/`, requestConfig(null))
  }
  getItemsIDChangelog(id: Number) {
    return request.get(`/api/web/v1/items/bought/${id}/changelog/`, requestConfig(null))
  }

  // POST
  postItemsValidate(data: object) {
    return request.post('/api/web/v1/items/bought/validate', requestConfig(null), data)
  }
  postItems(data: object) {
    return request.post('/api/web/v1/items/bought/', requestConfig(null), data)
  }
  postItemsExcel(formData: FormData, skipValidation: boolean) {
    const params = new URLSearchParams()
    params.append('skip_validation', String(skipValidation))
    return request.post(
      '/api/web/v1/items/bought/excel/',
      requestConfigFileUpload(params),
      formData,
    )
  }

  // PUT
  putItems(id: Number, data: any) {
    return request.put(`/api/web/v1/items/bought/${id}/`, requestConfig(null), data)
  }
  putItemsStatus(id: Number, status: string) {
    const params = new URLSearchParams()
    params.append('status', status)
    return request.put(`/api/web/v1/items/bought/${id}/status/`, requestConfig(params), null)
  }
  putItemsProject(id: Number, project_number: string) {
    const params = new URLSearchParams()
    params.append('project_number', project_number)
    return request.put(`/api/web/v1/items/bought/${id}/project/`, requestConfig(params), null)
  }
  putItemsQuantity(id: Number, quantity: any) {
    const params = new URLSearchParams()
    params.append('quantity', quantity)
    return request.put(`/api/web/v1/items/bought/${id}/quantity/`, requestConfig(params), null)
  }
  putItemsUnit(id: Number, unit: any) {
    const params = new URLSearchParams()
    params.append('unit', unit)
    return request.put(`/api/web/v1/items/bought/${id}/unit/`, requestConfig(params), null)
  }
  putItemsPartnumber(id: Number, partnumber: any) {
    const params = new URLSearchParams()
    params.append('value', partnumber)
    return request.put(
      `/api/web/v1/items/bought/${id}/field/required/partnumber/`,
      requestConfig(params),
      null,
    )
  }
  putItemsOrderNumber(id: Number, orderNumber: any) {
    const params = new URLSearchParams()
    params.append('value', orderNumber)
    return request.put(
      `/api/web/v1/items/bought/${id}/field/required/order-number/`,
      requestConfig(params),
      null,
    )
  }
  putItemsManufacturer(id: Number, manufacturer: any) {
    const params = new URLSearchParams()
    params.append('value', manufacturer)
    return request.put(
      `/api/web/v1/items/bought/${id}/field/required/manufacturer/`,
      requestConfig(params),
      null,
    )
  }
  putItemsSupplier(id: Number, supplier: any) {
    const params = new URLSearchParams()
    params.append('value', supplier)
    return request.put(
      `/api/web/v1/items/bought/${id}/field/optional/supplier/`,
      requestConfig(params),
      null,
    )
  }
  putItemsGroup1(id: Number, group: any) {
    const params = new URLSearchParams()
    params.append('value', group)
    return request.put(
      `/api/web/v1/items/bought/${id}/field/optional/group-1/`,
      requestConfig(params),
      null,
    )
  }
  putItemsNoteGeneral(id: Number, note: any) {
    const params = new URLSearchParams()
    params.append('value', note)
    return request.put(
      `/api/web/v1/items/bought/${id}/field/optional/note-general/`,
      requestConfig(params),
      null,
    )
  }
  putItemsNoteSupplier(id: Number, note: any) {
    const params = new URLSearchParams()
    params.append('value', note)
    return request.put(
      `/api/web/v1/items/bought/${id}/field/optional/note-supplier/`,
      requestConfig(params),
      null,
    )
  }
  putItemsStorage(id: Number, storage: any) {
    const params = new URLSearchParams()
    params.append('value', storage)
    return request.put(
      `/api/web/v1/items/bought/${id}/field/optional/storage-place/`,
      requestConfig(params),
      null,
    )
  }
  putItemsDesiredDeliveryDate(id: Number, date: any) {
    const params = new URLSearchParams()
    params.append('value', date)
    return request.put(
      `/api/web/v1/items/bought/${id}/field/date/desired-delivery-date/`,
      requestConfig(params),
      null,
    )
  }
  putItemsExpectedDeliveryDate(id: Number, date: any) {
    const params = new URLSearchParams()
    params.append('value', date)
    return request.put(
      `/api/web/v1/items/bought/${id}/field/date/expected-delivery-date/`,
      requestConfig(params),
      null,
    )
  }

  // DELETE
  deleteItemsID(id: Number) {
    return request.delete(`/api/web/v1/items/bought/${id}/`, requestConfig(null))
  }
}

export const boughtItemsRequest = new BoughtItemsRequest()
