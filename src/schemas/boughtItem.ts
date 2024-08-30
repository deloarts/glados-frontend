export interface BoughtItemSchema {
  id: number;
  status: string;
  created: Date;
  creator_id: number;
  high_priority: boolean;
  notify_on_delivery: boolean;
  project: string;
  machine: string | null;
  quantity: number;
  unit: string;
  partnumber: string;
  definition: string;
  manufacturer: string;
  supplier: string | null;
  weblink: string | null;
  group_1: string | null;
  note_general: string | null;
  note_supplier: string | null;
  desired_delivery_date: Date | null;
  requester_id: number | null;
  requested_date: Date | null;
  orderer_id: number | null;
  ordered_date: Date | null;
  expected_delivery_date: Date | null;
  taken_over_id: number | null;
  delivery_date: Date | null;
  storage_place: string | null;
}

export interface BoughtItemCreateSchema {
  project: string;
  partnumber: string;
  definition: string;
  manufacturer: string;
  quantity: number;
  unit: string;
  machine?: string;
  supplier?: string;
  group_1?: string;
  weblink?: string;
  note_general?: string;
  note_supplier?: string;
  desired_delivery_date: Date | null;
  high_priority?: boolean;
  notify_on_delivery?: boolean;
}

export interface BoughtItemUpdateSchema {
  project: string;
  partnumber: string;
  definition: string;
  manufacturer: string;
  quantity: number;
  unit: string;
  machine?: string;
  supplier?: string;
  group_1?: string;
  weblink?: string;
  note_general?: string;
  note_supplier?: string;
  desired_delivery_date?: Date | null;
  high_priority?: boolean;
  notify_on_delivery?: boolean;
}
