export interface BoughtItemSchema {
  id: number
  status: string
  created: Date
  creator_id: number
  high_priority: boolean
  notify_on_delivery: boolean
  project_id: number
  project_number: string
  project_customer: string
  project_description: string
  project_is_active: boolean
  product_number: string | null
  quantity: number
  unit: string
  partnumber: string
  order_number: string
  manufacturer: string
  supplier: string | null
  weblink: string | null
  group_1: string | null
  note_general: string | null
  note_supplier: string | null
  desired_delivery_date: Date | null
  requester_id: number | null
  requested_date: Date | null
  orderer_id: number | null
  ordered_date: Date | null
  expected_delivery_date: Date | null
  receiver_id: number | null
  delivery_date: Date | null
  storage_place: string | null
}

export interface BoughtItemCreateSchema {
  project_id: number
  partnumber: string
  order_number: string
  manufacturer: string
  quantity: number
  unit: string
  supplier?: string | null
  group_1?: string | null
  weblink?: string | null
  note_general?: string | null
  note_supplier?: string | null
  desired_delivery_date: Date | null
  high_priority?: boolean | null
  notify_on_delivery?: boolean | null
}

export interface BoughtItemBatchImportSchema {
  project_id: number
  project_id_error?: string
  partnumber: string
  partnumber_error?: string
  order_number: string
  order_number_error?: string
  manufacturer: string
  manufacturer_error?: string
  quantity: number
  quantity_error?: string
  unit: string
  unit_error?: string
  supplier: string
  supplier_error?: string
  group_1: string
  group1_error?: string
  weblink: string
  weblink_error?: string
  note_general: string
  note_general_error?: string
  note_supplier: string
  note_supplier_error?: string
  desired_delivery_date: Date | null
  desired_delivery_date_error?: string
  high_priority?: boolean | null
  notify_on_delivery?: boolean | null
}

export interface BoughtItemUpdateSchema {
  project_id: number
  partnumber: string
  order_number: string
  manufacturer: string
  quantity: number
  unit: string
  supplier?: string | null
  group_1?: string | null
  weblink?: string | null
  note_general?: string | null
  note_supplier?: string | null
  desired_delivery_date?: Date | null
  high_priority?: boolean | null
  notify_on_delivery?: boolean | null
}
