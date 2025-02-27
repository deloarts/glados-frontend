/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios'
import router from '@/router/index'
import config from '@/config'
import constants from '@/constants'

import type { AxiosResponse, RawAxiosRequestConfig } from 'axios'
import type { LoginSchema } from '@/schemas/login'

export class Request {
  /**
   * Logs in a user with the provided username and password.
   *
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<AxiosResponse<LoginSchema> | AxiosResponse<any>>} - The response from the login request.
   * @throws {Error} - Throws an error if the request fails for reasons other than an Axios error.
   */
  async login(
    username: string,
    password: string,
  ): Promise<AxiosResponse<LoginSchema> | AxiosResponse<any>> {
    const url = config.url.backend + constants.apiAccessToken
    const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)

    try {
      const response = await axios.post<LoginSchema>(url, params)
      localStorage.setItem('gladosTokenValue', response.data.access_token)
      localStorage.setItem('gladosTokenType', response.data.token_type)
      return response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response as AxiosResponse<any>
      }
      throw error
    }
  }

  /**
   * Logs in a user using their RFID and an API key.
   *
   * @param {string} rfid - The RFID of the user.
   * @param {string} apiKey - The API key for authentication.
   * @returns {Promise<AxiosResponse<LoginSchema> | AxiosResponse<any>>} - The response from the login request.
   * @throws {Error} - Throws an error if the request fails and it is not an Axios error.
   */
  async loginByRFID(
    rfid: string,
    apiKey: string,
  ): Promise<AxiosResponse<LoginSchema> | AxiosResponse<any>> {
    const url = `${config.url.backend}/api/key/v1/login/rfid/${rfid}`
    const requestConfig = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': '*',
        api_key_header: apiKey,
      },
    }
    try {
      const response = await axios.post<LoginSchema>(url, null, requestConfig)
      localStorage.setItem('gladosTokenValue', response.data.access_token)
      localStorage.setItem('gladosTokenType', response.data.token_type)
      return response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response as AxiosResponse<any>
      }
      throw error
    }
  }

  /**
   * Sends a GET request to the specified API endpoint with the given parameters.
   *
   * @param {string} api - The API endpoint to send the GET request to.
   * @param {RawAxiosRequestConfig} params - The parameters to include in the GET request.
   * @returns {Promise<AxiosResponse>} - The response from the GET request.
   * @throws {Error} - Throws an error if the request fails for reasons other than an Axios error.
   */
  async get(api: string, params: RawAxiosRequestConfig): Promise<AxiosResponse> {
    const url = config.url.backend + api
    // console.log(`Sending get request to ${url} with params`, params)
    try {
      const response = await axios.get(url, params)
      console.log(`Response from get request to ${url}`, response)
      return response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response != undefined && error.response.status == 401) {
          console.debug('User not authenticated')
          router.push({ name: 'Login' })
        }
        return error.response as AxiosResponse<any>
      }
      throw error
    }
  }

  /**
   * Sends a POST request to the specified API endpoint with the given parameters and data.
   *
   * @param {string} api - The API endpoint to send the POST request to.
   * @param {RawAxiosRequestConfig} params - The parameters to include in the POST request.
   * @param {any} data - The data to include in the POST request body.
   * @returns {Promise<AxiosResponse>} - The response from the POST request.
   * @throws {Error} - Throws an error if the request fails and it is not an Axios error.
   */
  async post(api: string, params: RawAxiosRequestConfig, data: any): Promise<AxiosResponse> {
    const url = config.url.backend + api
    console.log(`Sending post request to ${url} with params ${String(params)} and data${data}`)
    try {
      const response = await axios.post(url, data, params)
      // console.log(`Response from post request to ${url}`, response)
      return response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response != undefined && error.response.status == 401) {
          console.debug('User not authenticated')
          router.push({ name: 'Login' })
        }
        return error.response as AxiosResponse<any>
      }
      throw error
    }
  }

  /**
   * Sends a PUT request to the specified API endpoint with the given parameters and data.
   *
   * @param {string} api - The API endpoint to send the PUT request to.
   * @param {RawAxiosRequestConfig} params - The parameters to include in the PUT request.
   * @param {any} data - The data to include in the PUT request.
   * @returns {Promise<AxiosResponse>} - The response from the PUT request.
   * @throws {Error} - Throws an error if the request fails and is not an Axios error.
   */
  async put(api: string, params: RawAxiosRequestConfig, data: any): Promise<AxiosResponse> {
    const url = config.url.backend + api
    console.log(`Sending put request to ${url} with params ${String(params)} and data${data}`)
    try {
      const response = await axios.put(url, data, params)
      // console.log(`Response from put request to ${url}`, response)
      return response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response != undefined && error.response.status == 401) {
          console.debug('User not authenticated')
          router.push({ name: 'Login' })
        }
        return error.response as AxiosResponse<any>
      }
      throw error
    }
  }

  /**
   * Sends a DELETE request to the specified API endpoint with the given parameters.
   *
   * @param {string} api - The API endpoint to send the DELETE request to.
   * @param {RawAxiosRequestConfig} params - The parameters to include in the DELETE request.
   * @returns {Promise<AxiosResponse>} - The response from the DELETE request.
   * @throws {Error} - Throws an error if the request fails and it is not an Axios error.
   */
  async delete(api: string, params: RawAxiosRequestConfig): Promise<AxiosResponse> {
    const url = config.url.backend + api
    console.log(`Sending delete request to ${url} with params ${String(params)}`)
    try {
      const response = await axios.delete(url, params)
      console.log(`Response from delete request to ${url}`, response)
      return response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response != undefined && error.response.status == 401) {
          console.debug('User not authenticated')
          router.push({ name: 'Login' })
        }
        return error.response as AxiosResponse<any>
      }
      throw error
    }
  }
}

export const request = new Request()
