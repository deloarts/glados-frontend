/* eslint-disable @typescript-eslint/no-explicit-any */

import type { PageSchema } from '@/schemas/page'

export interface ItemStoreProtocol {
  loading: boolean
  paused: boolean
  items: Array<any>
  page: PageSchema<any>
  clear(): void
  pause(state: boolean): void
  getItems(): Array<any>
  clearItems(): void
  getSelection(): Array<number>
  setSelection(itemIDs: Array<number>): void
  clearSelection(): void
}
