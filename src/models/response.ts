import type { ErrorValidationSchema } from "@/schemas/common";

export interface ResponseWarning {
  row: number
  errors: ErrorValidationSchema
}
