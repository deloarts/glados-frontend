export interface StockCut1DTargetSizes {
  length: number;
  quantity: number;
}

export interface StockCut1DJobSchema {
  max_length: number;
  cut_width: number;
  target_sizes: Array<StockCut1DTargetSizes>;
}

export interface StockCut1DResultSchema {
  job: StockCut1DJobSchema;
  solver_type: string;
  time_us: number;
  lengths: Array<Array<number>>;
}
