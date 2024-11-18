export interface HostConfigBoughtItemsUnitsSchema {
  default: string;
  values: Array<string>;
}

export interface HostConfigBoughtItemsStatusSchema {
  open: string;
  requested: string;
  ordered: string;
  late: string;
  partial: string;
  delivered: string;
  canceled: string;
  lost: string;
}

export interface HostConfigBoughtItemsFilterSchema {
  limit: string;
  ignoreDelivered: boolean;
  ignoreCanceled: boolean;
  ignoreLost: boolean;
  highPriority: boolean | null;
  creatorID: number;
  createdDate: Date;
  changedDateFrom: Date;
  desiredDate: Date;
  requesterID: number;
  requestedDate: Date;
  ordererID: number;
  orderedDate: Date;
  expectedDate: Date;
  deliveredDate: Date;
  sortBy: string;
  id: number;
  status: string;
  projectNumber: string;
  projectCustomer: string;
  projectDescription: string;
  productNumber: string;
  quantity: number;
  unit: string;
  partnumber: string;
  orderNumber: string;
  manufacturer: string;
  supplier: string;
  group1: string;
  noteGeneral: string;
  noteSupplier: string;
  storagePlace: string;
  receiverID: number;
}

export interface HostConfigProjectFilterSchema {
  skip: number;
  limit: number;
  id: number;
  number: string;
  productNumber: string;
  customer: string;
  description: string;
  isActive: boolean;
  designatedUserID: number;
}
