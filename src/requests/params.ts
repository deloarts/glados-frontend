
export function getFilterParams(filter: any) {
  const params = new URLSearchParams();
  if (filter.limit != "" && filter.limit != undefined) { params.append("limit", filter.limit); }
  if (filter.ignoreDelivered) { params.append("ignore_delivered", filter.ignoreDelivered); }
  if (filter.ignoreCanceled) { params.append("ignore_canceled", filter.ignoreCanceled); }
  if (filter.ignoreLost) { params.append("ignore_lost", filter.ignoreLost); }
  if (filter.highPriority) { params.append("high_priority", filter.highPriority); }
  if (filter.createdDate) { params.append("created_from", filter.createdDate); params.append("created_to", filter.createdDate); }
  if (filter.changedDateFrom) { params.append("changed_from", filter.changedDateFrom); }
  if (filter.sortBy != "" && filter.sortBy != undefined) { params.append("sort_by", filter.sortBy); }
  if (filter.id != "" && filter.id != undefined) { params.append("id", filter.id); }
  if (filter.status != "" && filter.status != undefined) { params.append("status", filter.status); }
  if (filter.group1 != "" && filter.group1 != undefined) { params.append("group_1", filter.group1); }
  if (filter.project != "" && filter.project != undefined) { params.append("project", filter.project); }
  if (filter.machine != "" && filter.machine != undefined) { params.append("machine", filter.machine); }
  if (filter.partnumber != "" && filter.partnumber != undefined) { params.append("partnumber", filter.partnumber); }
  if (filter.definition != "" && filter.definition != undefined) { params.append("definition", filter.definition); }
  if (filter.manufacturer != "" && filter.manufacturer != undefined) { params.append("manufacturer", filter.manufacturer); }
  if (filter.supplier != "" && filter.supplier != undefined) { params.append("supplier", filter.supplier); }
  return params
}