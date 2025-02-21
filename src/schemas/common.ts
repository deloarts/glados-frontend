export interface ErrorDetailSchema {
  detail: string
}

export interface ErrorValidationDetail {
  loc: Array<number | string>
  msg: string
  type: string
}

export interface ErrorValidationSchema {
  detail: Array<ErrorValidationDetail>
}