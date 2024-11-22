import { ErrorDetails } from "@/models/errors";

export interface ResponseWarning {
  row: number;
  errors: Array<ErrorDetails>;
}
