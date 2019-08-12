export type Method = 'get' | 'GET'
| 'delete' | 'DELETE'
| 'head' | 'HEAD'
| 'options' | 'OPTIONS'
| 'post' | 'POST'
| 'put' | 'PUT'
| 'patch' | 'PATCH'

export interface AxiosRequestConfig {
  url?: string,
  method?: Method,
  data?: any,
  params?: any,
  headers?: any,
  responseType?: XMLHttpRequestResponseType,
  timeout?: number
}

export interface AxiosResponse {
  data: any,
  status: number,
  statusText: string,
  headers: any,
  config: AxiosRequestConfig
  request: any
}

export interface AxioPromise extends Promise<AxiosResponse> {

}


export interface AxiosError extends Error{
  isAxiosError: boolean,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
}


export interface Axios {
  request(config: AxiosRequestConfig): AxioPromise

  get(url: string, config: AxiosRequestConfig): AxioPromise

  delete(url: string, config: AxiosRequestConfig): AxioPromise

  options(url: string, config: AxiosRequestConfig): AxioPromise

  head(url: string, config: AxiosRequestConfig): AxioPromise

  post(url: string, data: any, config: AxiosRequestConfig): AxioPromise

  put(url: string, data: any, config: AxiosRequestConfig): AxioPromise

  patch(url: string, data: any, config: AxiosRequestConfig): AxioPromise

}


export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxioPromise
}
