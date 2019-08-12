import { AxiosRequestConfig, AxioPromise } from "../types";
import dispatchRequest from './dispatchRequest'

export default class Axios {
  request(config: AxiosRequestConfig): AxioPromise {
    return dispatchRequest(config)
  }

  get(url: string, config: AxiosRequestConfig): AxioPromise {
    return this.request(Object.assign(config, {
      method: 'get',
      url: url
    }))
  }

  delete(url: string, config: AxiosRequestConfig): AxioPromise {
    return this.request(Object.assign(config, {
      method: 'delete',
      url: url
    }))
  }

  options(url: string, config: AxiosRequestConfig): AxioPromise {
    return this.request(Object.assign(config, {
      method: 'options',
      url: url
    }))
  }

  head(url: string, config: AxiosRequestConfig): AxioPromise {
    return this.request(Object.assign(config, {
      method: 'head',
      url: url
    }))
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxioPromise {
    return this.request(Object.assign(config, {
      method: 'post',
      url: url,
      data
    }))
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxioPromise {
    return this.request(Object.assign(config, {
      method: 'put',
      url: url,
      data
    }))
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxioPromise {
    return this.request(Object.assign(config, {
      method: 'patch',
      url: url,
      data?
    }))
  }

}
