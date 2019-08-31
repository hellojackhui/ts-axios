import { AxiosRequestConfig, AxiosResponse, AxioPromise, RejectFn, ResolveFn } from '../types'
import dispatchRequest, { transfromURL } from './dispatchRequest'
import InterceptorManager from './InterceptorManager'
import mergeConfig from './mergeConfig'
interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolve: ResolveFn<T> | ((config: AxiosRequestConfig) => AxioPromise)
  reject?: RejectFn
}

export default class Axios {
  defaults: AxiosRequestConfig
  interceptors: Interceptors

  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  request(url: any, config?: any): AxioPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)
    config.method = config.method.toLowerCase()

    const chain: PromiseChain<any>[] = [
      {
        resolve: dispatchRequest,
        reject: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolve, reject } = chain.shift()!
      promise = promise.then(resolve, reject)
    }

    return dispatchRequest(config)
  }

  get(url: string, config: AxiosRequestConfig): AxioPromise {
    return this.request(
      Object.assign(config, {
        method: 'get',
        url: url
      })
    )
  }

  delete(url: string, config: AxiosRequestConfig): AxioPromise {
    return this.request(
      Object.assign(config, {
        method: 'delete',
        url: url
      })
    )
  }

  options(url: string, config: AxiosRequestConfig): AxioPromise {
    return this.request(
      Object.assign(config, {
        method: 'options',
        url: url
      })
    )
  }

  head(url: string, config: AxiosRequestConfig): AxioPromise {
    return this.request(
      Object.assign(config, {
        method: 'head',
        url: url
      })
    )
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxioPromise {
    return this.request(
      Object.assign(config, {
        method: 'post',
        url: url,
        data
      })
    )
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxioPromise {
    return this.request(
      Object.assign(config, {
        method: 'put',
        url: url,
        data
      })
    )
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxioPromise {
    return this.request(
      Object.assign(config, {
        method: 'patch',
        url: url,
        data
      })
    )
  }

  getUrl(config: AxiosRequestConfig): string {
    config = mergeConfig(this.defaults, config)
    return transfromURL(config)
  }
}
