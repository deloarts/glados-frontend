import type { RawAxiosRequestConfig } from 'axios'

/**
 * Generates a configuration object for making HTTP requests.
 *
 * @param urlSearchParams - The URL search parameters to be included in the request.
 *                          Can be null if no parameters are needed.
 * @returns {RawAxiosRequestConfig} An object containing the request parameters and headers.
 *                                    The headers include CORS settings and an authorization token.
 *
 * @remarks
 * The authorization token is retrieved from the local storage using the keys
 * 'gladosTokenType' and 'gladosTokenValue'. Ensure these values are set in the
 * local storage before making a request.
 */
export function requestConfig(urlSearchParams: URLSearchParams | null): RawAxiosRequestConfig {
  const tokenType = localStorage.getItem('gladosTokenType')
  const tokenValue = localStorage.getItem('gladosTokenValue')
  return {
    params: urlSearchParams,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': '*',
      'Access-Control-Allow-Private-Network': true,
      Authorization: `${tokenType} ${tokenValue}`,
    },
  }
}

/**
 * Generates a configuration object for a file upload request.
 *
 * @param {URLSearchParams | null} urlSearchParams - The URL search parameters to be included in the request.
 * @returns {RawAxiosRequestConfig} The configuration object containing headers and parameters for the request.
 *
 * The configuration object includes:
 * - `params`: The URL search parameters.
 * - `headers`: An object containing the following headers:
 *   - `Access-Control-Allow-Origin`: Allows all origins.
 *   - `Access-Control-Allow-Credentials`: Allows credentials.
 *   - `Access-Control-Allow-Private-Network`: Allows private network access.
 *   - `Authorization`: The authorization token retrieved from local storage.
 *   - `Content-Type`: Set to 'multipart/form-data' for file uploads.
 */
export function requestConfigFileUpload(
  urlSearchParams: URLSearchParams | null,
): RawAxiosRequestConfig {
  const tokenType = localStorage.getItem('gladosTokenType')
  const tokenValue = localStorage.getItem('gladosTokenValue')
  return {
    params: urlSearchParams,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': '*',
      'Access-Control-Allow-Private-Network': true,
      Authorization: `${tokenType} ${tokenValue}`,
      'Content-Type': 'multipart/form-data',
    },
  }
}

/**
 * Generates a configuration object for downloading a PDF file.
 *
 * @param urlSearchParams - The URL search parameters to be included in the request. Can be null.
 * @returns {RawAxiosRequestConfig} An object containing the request configuration, including parameters, response type, and headers.
 *
 * The headers include:
 * - `Access-Control-Allow-Origin`: Allows all origins.
 * - `Access-Control-Allow-Credentials`: Allows credentials.
 * - `Access-Control-Allow-Private-Network`: Allows private network access.
 * - `Authorization`: The authorization token retrieved from local storage.
 * - `Content-Disposition`: Specifies the filename for the downloaded PDF.
 * - `Accept`: Specifies that the response should be in PDF format.
 */
export function requestConfigPdfDownload(
  urlSearchParams: URLSearchParams | null,
): RawAxiosRequestConfig {
  const tokenType = localStorage.getItem('gladosTokenType')
  const tokenValue = localStorage.getItem('gladosTokenValue')
  return {
    params: urlSearchParams,
    responseType: 'blob',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': '*',
      'Access-Control-Allow-Private-Network': true,
      Authorization: `${tokenType} ${tokenValue}`,
      'Content-Disposition': 'attachment; filename=cut_solution.pdf',
      Accept: 'application/pdf',
    },
  }
}

/**
 * Generates a configuration object for downloading an XLSX file.
 *
 * @param urlSearchParams - The URL search parameters to be included in the request. Can be null.
 * @returns {RawAxiosRequestConfig} An object containing the request configuration, including parameters, response type, and headers.
 *
 * The headers include:
 * - `Access-Control-Allow-Origin`: Allows all origins.
 * - `Access-Control-Allow-Credentials`: Allows credentials.
 * - `Access-Control-Allow-Private-Network`: Allows private network access.
 * - `Authorization`: The authorization token retrieved from local storage.
 * - `Content-Disposition`: Specifies the attachment filename as "glados.xlsx".
 * - `Content-Type`: Specifies the MIME type for an XLSX file.
 */
export function requestConfigXlsxDownload(
  urlSearchParams: URLSearchParams | null,
): RawAxiosRequestConfig {
  const tokenType = localStorage.getItem('gladosTokenType')
  const tokenValue = localStorage.getItem('gladosTokenValue')
  return {
    params: urlSearchParams,
    responseType: 'arraybuffer',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': '*',
      'Access-Control-Allow-Private-Network': true,
      Authorization: `${tokenType} ${tokenValue}`,
      'Content-Disposition': 'attachment; filename=glados.xlsx',
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
  }
}
