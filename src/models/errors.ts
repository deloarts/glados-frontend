export interface ErrorDetails {
  type: string;
  loc: [number | string, any];
  msg: string;
  input: any;
  ctx: object;
}
