export interface StockCut2DItem {
  id: string;
  width: number;
  height: number;
  can_rotate: boolean;
}

export interface StockCut2DPanel {
  id: string;
  width: number;
  height: number;
}

export interface StockCut2DParams {
  items: Array<StockCut2DItem>;
  panels: Array<StockCut2DPanel>;
  cut_width: number;
  min_initial_usage: boolean;
}

export interface StockCut2DUsed {
  panel: StockCut2DPanel;
  item: StockCut2DItem;
  x: number;
  y: number;
  rotate: boolean;
}

export interface StockCut2DUnused {
  panel: StockCut2DPanel;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface StockCut2DJobSchema {
  params: StockCut2DParams;
  method: string;
}

export interface StockCut2DResultSchema {
  params: StockCut2DParams;
  used: Array<StockCut2DUsed>;
  unused: Array<StockCut2DUnused>;
  cuts: Array<string>;
}
