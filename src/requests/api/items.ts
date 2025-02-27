import { request } from '@/requests/index'
import {
  requestConfig,
  requestConfigXlsxDownload,
  requestConfigFileUpload,
} from '@/requests/configuration'
import constants from '@/constants'

import type { AxiosResponse } from 'axios'
import type {
  BoughtItemSchema,
  BoughtItemCreateSchema,
  BoughtItemUpdateSchema,
} from '@/schemas/boughtItem'
import type { ErrorDetailSchema, ErrorValidationSchema } from '@/schemas/common'
import type { PageSchema } from '@/schemas/page'

export class BoughtItemsRequest {
  // GET
  getItems(params: URLSearchParams): Promise<AxiosResponse<PageSchema<BoughtItemSchema>>> {
    return request.get(constants.apiBoughtItems, requestConfig(params))
  }
  getItemsExcel(params: URLSearchParams): Promise<AxiosResponse<BlobPart | ErrorDetailSchema>> {
    return request.get(`${constants.apiBoughtItems}/excel/`, requestConfigXlsxDownload(params))
  }
  getItemsExcelTemplate(): Promise<AxiosResponse<BlobPart | ErrorDetailSchema>> {
    return request.get(
      `${constants.apiBoughtItems}/excel-template/`,
      requestConfigXlsxDownload(null),
    )
  }
  getItemsID(id: number): Promise<AxiosResponse<BoughtItemSchema | ErrorDetailSchema>> {
    return request.get(`${constants.apiBoughtItems}/${id}/`, requestConfig(null))
  }
  getItemsIDChangelog(id: number): Promise<AxiosResponse<string[] | ErrorDetailSchema>> {
    return request.get(`${constants.apiBoughtItems}/${id}/changelog/`, requestConfig(null))
  }

  // POST
  postItemsValidate(
    data: BoughtItemCreateSchema,
  ): Promise<AxiosResponse<BoughtItemSchema | ErrorDetailSchema | ErrorValidationSchema>> {
    return request.post(`${constants.apiBoughtItems}/validate`, requestConfig(null), data)
  }
  postItems(
    data: BoughtItemCreateSchema,
  ): Promise<AxiosResponse<BoughtItemSchema | ErrorDetailSchema | ErrorValidationSchema>> {
    return request.post(constants.apiBoughtItems, requestConfig(null), data)
  }
  postItemsExcel(
    formData: FormData,
    skipValidation: boolean,
  ): Promise<AxiosResponse<BoughtItemSchema[] | ErrorDetailSchema | ErrorValidationSchema>> {
    const params = new URLSearchParams()
    params.append('skip_validation', String(skipValidation))
    return request.post(
      `${constants.apiBoughtItems}/excel/`,
      requestConfigFileUpload(params),
      formData,
    )
  }

  // PUT
  putItems(
    id: number,
    data: BoughtItemUpdateSchema,
  ): Promise<AxiosResponse<BoughtItemSchema | ErrorDetailSchema | ErrorValidationSchema>> {
    return request.put(`${constants.apiBoughtItems}/${id}/`, requestConfig(null), data)
  }
  putItemsStatus(
    id: number,
    status: string,
  ): Promise<AxiosResponse<BoughtItemSchema | ErrorDetailSchema | ErrorValidationSchema>> {
    const params = new URLSearchParams()
    params.append('status', status)
    return request.put(`${constants.apiBoughtItems}/${id}/status/`, requestConfig(params), null)
  }
  putItemsProject(
    id: number,
    project_number: string,
  ): Promise<AxiosResponse<BoughtItemSchema | ErrorDetailSchema | ErrorValidationSchema>> {
    const params = new URLSearchParams()
    params.append('project_number', project_number)
    return request.put(`${constants.apiBoughtItems}/${id}/project/`, requestConfig(params), null)
  }
  putItemsQuantity(
    id: number,
    quantity: number | string,
  ): Promise<AxiosResponse<BoughtItemSchema | ErrorDetailSchema | ErrorValidationSchema>> {
    const params = new URLSearchParams()
    params.append('quantity', String(quantity))
    return request.put(`${constants.apiBoughtItems}/${id}/quantity/`, requestConfig(params), null)
  }
  putItemsUnit(
    id: number,
    unit: string,
  ): Promise<AxiosResponse<BoughtItemSchema | ErrorDetailSchema | ErrorValidationSchema>> {
    const params = new URLSearchParams()
    params.append('unit', unit)
    return request.put(`${constants.apiBoughtItems}/${id}/unit/`, requestConfig(params), null)
  }
  putItemsPartnumber(
    id: number,
    partnumber: string,
  ): Promise<AxiosResponse<BoughtItemSchema | ErrorDetailSchema | ErrorValidationSchema>> {
    const params = new URLSearchParams()
    params.append('value', partnumber)
    return request.put(
      `${constants.apiBoughtItems}/${id}/field/required/partnumber/`,
      requestConfig(params),
      null,
    )
  }
  putItemsOrderNumber(
    id: number,
    orderNumber: string,
  ): Promise<AxiosResponse<BoughtItemSchema | ErrorDetailSchema | ErrorValidationSchema>> {
    const params = new URLSearchParams()
    params.append('value', orderNumber)
    return request.put(
      `${constants.apiBoughtItems}/${id}/field/required/order-number/`,
      requestConfig(params),
      null,
    )
  }
  putItemsManufacturer(
    id: number,
    manufacturer: string,
  ): Promise<AxiosResponse<BoughtItemSchema | ErrorDetailSchema | ErrorValidationSchema>> {
    const params = new URLSearchParams()
    params.append('value', manufacturer)
    return request.put(
      `${constants.apiBoughtItems}/${id}/field/required/manufacturer/`,
      requestConfig(params),
      null,
    )
  }
  putItemsSupplier(
    id: number,
    supplier: string,
  ): Promise<AxiosResponse<BoughtItemSchema | ErrorDetailSchema | ErrorValidationSchema>> {
    const params = new URLSearchParams()
    params.append('value', supplier)
    return request.put(
      `${constants.apiBoughtItems}/${id}/field/optional/supplier/`,
      requestConfig(params),
      null,
    )
  }
  putItemsGroup1(
    id: number,
    group: string,
  ): Promise<AxiosResponse<BoughtItemSchema | ErrorDetailSchema | ErrorValidationSchema>> {
    const params = new URLSearchParams()
    params.append('value', group)
    return request.put(
      `${constants.apiBoughtItems}/${id}/field/optional/group-1/`,
      requestConfig(params),
      null,
    )
  }
  putItemsNoteGeneral(
    id: number,
    note: string,
  ): Promise<AxiosResponse<BoughtItemSchema | ErrorDetailSchema | ErrorValidationSchema>> {
    const params = new URLSearchParams()
    params.append('value', note)
    return request.put(
      `${constants.apiBoughtItems}/${id}/field/optional/note-general/`,
      requestConfig(params),
      null,
    )
  }
  putItemsNoteSupplier(
    id: number,
    note: string,
  ): Promise<AxiosResponse<BoughtItemSchema | ErrorDetailSchema | ErrorValidationSchema>> {
    const params = new URLSearchParams()
    params.append('value', note)
    return request.put(
      `${constants.apiBoughtItems}/${id}/field/optional/note-supplier/`,
      requestConfig(params),
      null,
    )
  }
  putItemsStorage(
    id: number,
    storage: string,
  ): Promise<AxiosResponse<BoughtItemSchema | ErrorDetailSchema | ErrorValidationSchema>> {
    const params = new URLSearchParams()
    params.append('value', storage)
    return request.put(
      `${constants.apiBoughtItems}/${id}/field/optional/storage-place/`,
      requestConfig(params),
      null,
    )
  }
  putItemsDesiredDeliveryDate(
    id: number,
    date: Date | string,
  ): Promise<AxiosResponse<BoughtItemSchema | ErrorDetailSchema | ErrorValidationSchema>> {
    const params = new URLSearchParams()
    params.append('value', String(date))
    return request.put(
      `${constants.apiBoughtItems}/${id}/field/date/desired-delivery-date/`,
      requestConfig(params),
      null,
    )
  }
  putItemsExpectedDeliveryDate(
    id: number,
    date: Date | string,
  ): Promise<AxiosResponse<BoughtItemSchema | ErrorDetailSchema | ErrorValidationSchema>> {
    const params = new URLSearchParams()
    params.append('value', String(date))
    return request.put(
      `${constants.apiBoughtItems}/${id}/field/date/expected-delivery-date/`,
      requestConfig(params),
      null,
    )
  }

  // DELETE
  deleteItemsID(id: number): Promise<AxiosResponse<BoughtItemSchema | ErrorDetailSchema>> {
    return request.delete(`${constants.apiBoughtItems}/${id}/`, requestConfig(null))
  }
}

export const boughtItemsRequest = new BoughtItemsRequest()
