export interface UserTimeSchema {
  id: number
  user_id: number
  login: string
  logout: string
  duration_minutes: number
  note: string
}

export interface UserTimeCreateSchema {
  login: string
  logout: string
  note: string | null
}

export interface UserTimeUpdateSchema {
  login: string
  logout: string | null
  note: string | null
}
