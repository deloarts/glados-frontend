import type { HostConfigUserTimeFilterSchema } from '@/schemas/host'

export function getUserTimeFilterParams(filter: HostConfigUserTimeFilterSchema): URLSearchParams {
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
  if (filter.loginFrom) {
    params.append('login_from', String(filter.loginFrom))
  }
  if (filter.loginTo) {
    params.append('login_to', String(filter.loginTo))
  }
  if (filter.logoutFrom) {
    params.append('logout_from', String(filter.logoutFrom))
  }
  if (filter.logoutTo) {
    params.append('logout_to', String(filter.logoutTo))
  }

  return params
}
