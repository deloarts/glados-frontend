export function getFilterParams(filter: any) {
  const params = new URLSearchParams();

  if (filter.limit != "" && filter.limit != undefined) { params.append("limit", filter.limit); }
  if (filter.ignoreDelivered) { params.append("ignore_delivered", filter.ignoreDelivered); }
  if (filter.ignoreCanceled) { params.append("ignore_canceled", filter.ignoreCanceled); }
  if (filter.ignoreLost) { params.append("ignore_lost", filter.ignoreLost); }
  if (filter.highPriority) { params.append("high_priority", filter.highPriority); }
  if (filter.creatorId != "" && filter.creatorId != undefined) { params.append("creator_id", filter.creatorId); }
  if (filter.createdDate) { params.append("created_from", filter.createdDate); params.append("created_to", filter.createdDate); }
  if (filter.changedDateFrom) { params.append("changed_from", filter.changedDateFrom); }
  if (filter.desiredDate) { params.append("desired_from", filter.desiredDate); params.append("desired_to", filter.desiredDate); }
  if (filter.requesterId != "" && filter.requesterId != undefined) { params.append("requester_id", filter.requesterId); }
  if (filter.requestedDate) { params.append("requested_from", filter.requestedDate); params.append("requested_to", filter.requestedDate); }
  if (filter.ordererId != "" && filter.ordererId != undefined) { params.append("orderer_id", filter.ordererId); }
  if (filter.orderedDate) { params.append("ordered_from", filter.orderedDate); params.append("ordered_to", filter.orderedDate); }
  if (filter.expectedDate) { params.append("expected_from", filter.expectedDate); params.append("expected_to", filter.expectedDate); }
  if (filter.deliveredDate) { params.append("delivered_from", filter.deliveredDate); params.append("delivered_to", filter.deliveredDate); }
  if (filter.sortBy != "" && filter.sortBy != undefined) { params.append("sort_by", filter.sortBy); }
  if (filter.id != "" && filter.id != undefined) { params.append("id", filter.id); }
  if (filter.status != "" && filter.status != undefined) { params.append("status", filter.status); }
  if (filter.project != "" && filter.project != undefined) { params.append("project", filter.project); }
  if (filter.machine != "" && filter.machine != undefined) { params.append("machine", filter.machine); }
  if (filter.quantity != "" && filter.quantity != undefined) { params.append("quantity", filter.quantity); }
  if (filter.unit != "" && filter.unit != undefined) { params.append("unit", filter.unit); }
  if (filter.partnumber != "" && filter.partnumber != undefined) { params.append("partnumber", filter.partnumber); }
  if (filter.definition != "" && filter.definition != undefined) { params.append("definition", filter.definition); }
  if (filter.manufacturer != "" && filter.manufacturer != undefined) { params.append("manufacturer", filter.manufacturer); }
  if (filter.supplier != "" && filter.supplier != undefined) { params.append("supplier", filter.supplier); }
  if (filter.group1 != "" && filter.group1 != undefined) { params.append("group_1", filter.group1); }
  if (filter.noteGeneral != "" && filter.noteGeneral != undefined) { params.append("note_general", filter.noteGeneral); }
  if (filter.noteSupplier != "" && filter.noteSupplier != undefined) { params.append("note_supplier", filter.noteSupplier); }
  if (filter.storagePlace != "" && filter.storagePlace != undefined) { params.append("storage_place", filter.storagePlace); }
  if (filter.takeOverId != "" && filter.takeOverId != undefined) { params.append("taken_over_id", filter.takeOverId); }

  return params
}