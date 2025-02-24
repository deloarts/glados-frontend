export interface HostConfigInfoSpaceSchema {
  db_total: number
  db_used: number
  db_free: number
  db_path: string
  backup_total: number
  backup_used: number
  backup_free: number
  backup_path: string
}

export interface HostConfigInfoSchema {
  now: Date
  version: string
  os: string
  hostname: string
  disc_space: HostConfigInfoSpaceSchema
}

export interface HostConfigMailSchema {
  enabled: boolean
  config: {
    server: string
    port: number
    account: string
  }
}

export interface HostConfigBoughtItemsUnitsSchema {
  default: string | null
  values: Array<string>
}

export interface HostConfigBoughtItemsStatusSchema {
  open: string
  requested: string
  ordered: string
  late: string
  partial: string
  delivered: string
  canceled: string
  lost: string
}

export interface HostConfigBoughtItemsFilterSchema {
  limit: number | null
  skip: number | null
  ignoreDelivered: boolean | null
  ignoreCanceled: boolean | null
  ignoreLost: boolean | null
  highPriority: boolean | null
  creatorID: number | null
  createdDate: Date | null
  changedDateFrom: Date | null
  desiredDate: Date | null
  requesterID: number | null
  requestedDate: Date | null
  ordererID: number | null
  orderedDate: Date | null
  expectedDate: Date | null
  deliveredDate: Date | null
  sortBy: string | null
  id: number | null
  status: string | null
  projectNumber: string | null
  projectCustomer: string | null
  projectDescription: string | null
  productNumber: string | null
  quantity: number | null
  unit: string | null
  partnumber: string | null
  orderNumber: string | null
  manufacturer: string | null
  supplier: string | null
  group1: string | null
  noteGeneral: string | null
  noteSupplier: string | null
  storagePlace: string | null
  receiverID: number | null
}

export interface HostConfigBoughtItemsFilterPresetsSchema {
  [key: string]: HostConfigBoughtItemsFilterSchema
}

export interface HostConfigProjectFilterSchema {
  skip: number | null
  limit: number | null
  id: number | null
  number: string | null
  productNumber: string | null
  customer: string | null
  description: string | null
  isActive: boolean | null
  designatedUserID: number | null
}

export interface HostConfigUserTimeFilterSchema {
  skip: number | null
  limit: number | null
  id: number | null
  loginFrom: string | Date | null
  loginTo: string | Date | null
  logoutFrom: string | Date | null
  logoutTo: string | Date | null
}
