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

export interface AxiosResponse<T=any> {
  data: T,
  status: number,
  statusText: string,
  headers: any,
  config: AxiosRequestConfig
  request: any
}

export interface AxioPromise<T=any> extends Promise<AxiosResponse<T>> {

}


export interface AxiosError extends Error{
  isAxiosError: boolean,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
}


export interface Axios {
  interceptors: {
    request: AxiosIntercepterManager<AxiosRequestConfig>,
    response: AxiosIntercepterManager<AxiosResponse>
  }

  request<T=any>(config: AxiosRequestConfig): AxioPromise<T>

  get<T=any>(url: string, config: AxiosRequestConfig): AxioPromise<T>

  delete<T=any>(url: string, config: AxiosRequestConfig): AxioPromise<T>

  options<T=any>(url: string, config: AxiosRequestConfig): AxioPromise<T>

  head<T=any>(url: string, config: AxiosRequestConfig): AxioPromise<T>

  post<T=any>(url: string, data: any, config: AxiosRequestConfig): AxioPromise<T>

  put<T=any>(url: string, data: any, config: AxiosRequestConfig): AxioPromise<T>

  patch<T=any>(url: string, data: any, config: AxiosRequestConfig): AxioPromise<T>

}


export interface AxiosInstance extends Axios {
  <T=any>(config: AxiosRequestConfig): AxioPromise<T>

  <T=any>(url: string, config?: AxiosRequestConfig): AxioPromise<T>
}


export interface AxiosIntercepterManager<T> {
  use(resolve: ResolveFn<T>, reject?: RejectFn): number
  eject(id: number) : void
}

export interface ResolveFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectFn {
  (val: any): any
}
