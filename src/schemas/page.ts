export interface PageSchema<Type> {
  items: Type[]
  total: number
  limit: number
  skip: number
  pages: number
  current: number
}