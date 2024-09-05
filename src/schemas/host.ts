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
  creatorId: number;
  createdDate: Date;
  changedDateFrom: Date;
  desiredDate: Date;
  requesterId: number;
  requestedDate: Date;
  ordererId: number;
  orderedDate: Date;
  expectedDate: Date;
  deliveredDate: Date;
  sortBy: string;
  id: number;
  status: string;
  project: string;
  machine: string;
  quantity: number;
  unit: string;
  partnumber: string;
  definition: string;
  manufacturer: string;
  supplier: string;
  group1: string;
  noteGeneral: string;
  noteSupplier: string;
  storagePlace: string;
  receiverId: number;
}