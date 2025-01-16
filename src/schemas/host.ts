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
