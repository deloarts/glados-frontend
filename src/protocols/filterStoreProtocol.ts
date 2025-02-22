/* eslint-disable @typescript-eslint/no-explicit-any */

export interface FilterStoreProtocol {
  state: any
  set(key: string, value: string | number | Date | null): void
  reset(): void
}
