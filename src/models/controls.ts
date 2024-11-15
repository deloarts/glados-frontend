export interface AvailableOption {
  text: string;
  value: string;
}

export interface BoughtItemControlsState {
  changelog: boolean;
  rainbow: boolean;
  fixedHeight: boolean;
  lockCols: boolean;
  textView: boolean;
  requestView: boolean;
}

export interface BoughtItemControlsColumns {
  id: boolean;
  state: boolean;
  status: boolean;
  projectNumber: boolean;
  productNumber: boolean;
  projectCustomer: boolean;
  projectDescription: boolean;
  quantity: boolean;
  unit: boolean;
  weblink: boolean;
  partnumber: boolean;
  orderNumber: boolean;
  manufacturer: boolean;
  supplier: boolean;
  group1: boolean;
  noteGeneral: boolean;
  noteSupplier: boolean;
  createdDate: boolean;
  creatorID: boolean;
  desiredDate: boolean;
  requestedDate: boolean;
  requesterID: boolean;
  orderedDate: boolean;
  ordererID: boolean;
  expectedDate: boolean;
  deliveredDate: boolean;
  receiverID: boolean;
  arrivalWeeks: boolean;
  totalWeeks: boolean;
  storagePlace: boolean;
}

export interface ProjectControlsState {
  fixedHeight: boolean;
}

export interface ProjectControlsColumns {
  id: boolean;
  projectNumber: boolean;
  projectLink: boolean;
  productNumber: boolean;
  customer: boolean;
  description: boolean;
  designatedUser: boolean;
  createdDate: boolean;
  state: boolean;
}
