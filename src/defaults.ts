import {AxiosRequestConfig} from './types'
import { processHeaders } from './helpers/header';
import { transformRequest, transformResponse } from './helpers/data';
const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    commmon: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data: any, headers: any): any {
      return transformResponse(data)
    }
  ]
}

const methodsNoData = ['options', 'head', 'delete', 'get']

methodsNoData.forEach((method) => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach((method) => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
