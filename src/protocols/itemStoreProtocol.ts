import type { PageSchema } from '@/schemas/page'

export interface ItemStoreProtocol {
  // @ts-ignore
  loading: T<boolean>
  // @ts-ignore
  paused: T<boolean>
  // @ts-ignore
  items: T<Array>
  // @ts-ignore
  page: T<PageSchema>
  clear(): void
  pause(state: boolean): void
  getItems(): Array<any>
  clearItems(): void
  getSelection(): Array<number>
  setSelection(itemIDs: Array<number>): void
  clearSelection(): void
}
