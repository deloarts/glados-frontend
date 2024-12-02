export interface UserSchema {
  id: number
  created: Date
  username: string
  full_name: string
  email: string
  language: 'enGB' | 'deAT'
  theme: null | 'dark' | 'light'
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
  is_active?: boolean
  is_adminuser?: boolean
  is_superuser?: boolean
  is_guestuser?: boolean
  password?: string
  rfid?: string | null
}
