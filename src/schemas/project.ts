export interface ProjectSchema {
  id: number;
  created: Date;
  number: string;
  machine: string;
  customer: string;
  description: string;
  designated_user_id: number;
  is_active: boolean;
}

export interface ProjectCreateSchema {
  number: string;
  machine?: string;
  customer: string;
  description: string;
  designated_user_id: number;
  is_active: boolean;
}

export interface ProjectUpdateSchema {
  number: string;
  machine?: string;
  customer: string;
  description: string;
  designated_user_id: number;
  is_active: boolean;
}
