import type { HostConfigBoughtItemsFilterSchema } from '@/schemas/host'

export function getBoughtItemsFilterParams(
  filter: HostConfigBoughtItemsFilterSchema,
): URLSearchParams {
  const params = new URLSearchParams()

  if (filter.limit != null && filter.limit != undefined) {
    params.append('limit', String(filter.limit))
  }
  if (filter.skip != null && filter.limit != undefined) {
    params.append('skip', String(filter.skip))
  }
  if (filter.ignoreDelivered) {
    params.append('ignore_delivered', String(filter.ignoreDelivered))
  }
  if (filter.ignoreCanceled) {
    params.append('ignore_canceled', String(filter.ignoreCanceled))
  }
  if (filter.ignoreLost) {
    params.append('ignore_lost', String(filter.ignoreLost))
  }
  if (filter.highPriority) {
    params.append('high_priority', String(filter.highPriority))
  }
  if (String(filter.creatorID) != '' && filter.creatorID != undefined) {
    params.append('creator_id', String(filter.creatorID))
  }
  if (filter.createdDate) {
    params.append('created_from', String(filter.createdDate))
    params.append('created_to', String(filter.createdDate))
  }
  if (filter.changedDateFrom) {
    params.append('changed_from', String(filter.changedDateFrom))
  }
  if (filter.desiredDate) {
    params.append('desired_from', String(filter.desiredDate))
    params.append('desired_to', String(filter.desiredDate))
  }
  if (String(filter.requesterID) != '' && filter.requesterID != undefined) {
    params.append('requester_id', String(filter.requesterID))
  }
  if (filter.requestedDate) {
    params.append('requested_from', String(filter.requestedDate))
    params.append('requested_to', String(filter.requestedDate))
  }
  if (String(filter.ordererID) != '' && filter.ordererID != undefined) {
    params.append('orderer_id', String(filter.ordererID))
  }
  if (filter.orderedDate) {
    params.append('ordered_from', String(filter.orderedDate))
    params.append('ordered_to', String(filter.orderedDate))
  }
  if (filter.expectedDate) {
    params.append('expected_from', String(filter.expectedDate))
    params.append('expected_to', String(filter.expectedDate))
  }
  if (filter.deliveredDate) {
    params.append('delivered_from', String(filter.deliveredDate))
    params.append('delivered_to', String(filter.deliveredDate))
  }
  if (filter.sortBy != '' && filter.sortBy != undefined) {
    params.append('sort_by', filter.sortBy)
  }
  if (String(filter.id) != '' && filter.id != undefined) {
    params.append('id', String(filter.id))
  }
  if (filter.status != '' && filter.status != undefined) {
    params.append('status', filter.status)
  }
  if (filter.projectNumber != '' && filter.projectNumber != undefined) {
    params.append('project_number', filter.projectNumber)
  }
  if (filter.projectCustomer != '' && filter.projectCustomer != undefined) {
    params.append('project_customer', filter.projectCustomer)
  }
  if (filter.projectDescription != '' && filter.projectDescription != undefined) {
    params.append('project_description', filter.projectDescription)
  }
  if (filter.productNumber != '' && filter.productNumber != undefined) {
    params.append('product_number', filter.productNumber)
  }
  if (String(filter.quantity) != '' && filter.quantity != undefined) {
    params.append('quantity', String(filter.quantity))
  }
  if (filter.unit != '' && filter.unit != undefined) {
    params.append('unit', filter.unit)
  }
  if (filter.partnumber != '' && filter.partnumber != undefined) {
    params.append('partnumber', filter.partnumber)
  }
  if (filter.orderNumber != '' && filter.orderNumber != undefined) {
    params.append('order_number', filter.orderNumber)
  }
  if (filter.manufacturer != '' && filter.manufacturer != undefined) {
    params.append('manufacturer', filter.manufacturer)
  }
  if (filter.supplier != '' && filter.supplier != undefined) {
    params.append('supplier', filter.supplier)
  }
  if (filter.group1 != '' && filter.group1 != undefined) {
    params.append('group_1', filter.group1)
  }
  if (filter.noteGeneral != '' && filter.noteGeneral != undefined) {
    params.append('note_general', filter.noteGeneral)
  }
  if (filter.noteSupplier != '' && filter.noteSupplier != undefined) {
    params.append('note_supplier', filter.noteSupplier)
  }
  if (filter.storagePlace != '' && filter.storagePlace != undefined) {
    params.append('storage_place', filter.storagePlace)
  }
  if (String(filter.receiverID) != '' && filter.receiverID != undefined) {
    params.append('receiver_id', String(filter.receiverID))
  }

  return params
}
