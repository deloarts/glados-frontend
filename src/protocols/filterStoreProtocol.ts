export interface FilterStoreProtocol {
  // @ts-ignore
  state: T<any>;
  set(key: string, value: string | number | Date | null): void;
  reset(): void;
}
