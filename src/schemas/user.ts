export interface UserSchema {
  id: number
  created: Date
  username: string
  full_name: string
  email: string

  language: 'enGB' | 'deAT'
  theme: null | 'dark' | 'light'

  work_hours_per_week?: number | null
  auto_break_from?: string | null
  auto_break_to?: string | null
  auto_logout?: boolean
  auto_break_mon?: boolean
  auto_break_tue?: boolean
  auto_break_wed?: boolean
  auto_break_thu?: boolean
  auto_break_fri?: boolean
  auto_break_sat?: boolean
  auto_break_sun?: boolean

  is_active: boolean
  is_adminuser: boolean
  is_superuser: boolean
  is_systemuser: boolean
  is_guestuser: boolean

  hashed_rfid?: string
}

export interface UserCreateSchema {
  username: string
  full_name: string
  email: string

  work_hours_per_week?: number | null
  auto_logout?: boolean
  auto_break_from?: string | null
  auto_break_to?: string | null

  is_active?: boolean
  is_adminuser?: boolean
  is_superuser?: boolean
  is_guestuser?: boolean

  password: string
  rfid?: string | null
}

export interface UserUpdateSchema {
  username: string
  full_name: string
  email: string

  language: 'enGB' | 'deAT'
  theme: 'dark' | 'light'

  work_hours_per_week?: number | null
  auto_logout?: boolean
  auto_break_from?: string | null
  auto_break_to?: string | null
  auto_break_mon?: boolean
  auto_break_tue?: boolean
  auto_break_wed?: boolean
  auto_break_thu?: boolean
  auto_break_fri?: boolean
  auto_break_sat?: boolean
  auto_break_sun?: boolean

  is_active?: boolean
  is_adminuser?: boolean
  is_superuser?: boolean
  is_guestuser?: boolean

  password?: string
  rfid?: string | null
}
