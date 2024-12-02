export interface ApiKeysSchema {
  id: number
  name: string
  api_key: string
  created: Date
  expiration_date: Date
}

export interface ApiKeysCreateSchema {
  name: string
  expiration_date: Date
}
