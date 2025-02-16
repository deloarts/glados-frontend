export interface UserTimeSchema {
  id: number
  user_id: number
  login: Date
  logout: Date
  duration_minutes: number
  note: string
}

export interface UserTimeCreateSchema {
  login: Date
  logout: Date | null
  note: string | null
}

export interface UserTimeUpdateSchema {
  login: Date
  logout: Date | null
  note: string | null
}
