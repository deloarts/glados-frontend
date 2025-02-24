import type { HostConfigProjectFilterSchema } from '@/schemas/host'

export function getProjectFilterParams(filter: HostConfigProjectFilterSchema): URLSearchParams {
  const params = new URLSearchParams()

  if (filter.skip != null && filter.skip != undefined) {
    params.append('skip', String(filter.skip))
  }
  if (filter.limit != null && filter.limit != undefined) {
    params.append('limit', String(filter.limit))
  }
  if (filter.id != null && filter.id != undefined) {
    params.append('id', String(filter.id))
  }
  if (filter.number != '' && filter.number != undefined) {
    params.append('number', filter.number)
  }
  if (filter.productNumber != '' && filter.productNumber != undefined) {
    params.append('product_number', filter.productNumber)
  }
  if (filter.customer != '' && filter.customer != undefined) {
    params.append('customer', filter.customer)
  }
  if (filter.description != '' && filter.description != undefined) {
    params.append('description', filter.description)
  }
  if (filter.isActive) {
    params.append('is_active', String(filter.isActive))
  }
  if (String(filter.designatedUserID) != '' && filter.designatedUserID != undefined) {
    params.append('designated_user_id', String(filter.designatedUserID))
  }

  return params
}
