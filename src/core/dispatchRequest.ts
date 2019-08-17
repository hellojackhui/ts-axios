import {AxiosRequestConfig, AxioPromise, AxiosResponse} from '../types'
import {buildURL} from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import {processHeaders, flattenHeader} from '../helpers/header'
import xhr from './xhr'
import transfrom from './transfrom';

export default function dispatchRequest(config: AxiosRequestConfig) : AxioPromise {
  processConfig(config)
  return xhr(config).then((res) => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transfromURL(config)
  config.data = transfrom(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeader(config.headers, config.method!)
}

function transfromURL(config: AxiosRequestConfig): string {
  const {url, params} = config
  return buildURL(url!, params)
}

// function tranfromRequestData(config: AxiosRequestConfig): any {
//   return transformRequest(config.data)
// }

// function transformHeaders (config: AxiosRequestConfig) {
//   const { headers = {}, data } = config
//   return processHeaders(headers, data)
// }

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transfrom(res.data, res.headers, res.config.transformResponse )
  return res
}
