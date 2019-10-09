export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  cancelToken?: CancelToken
  withCredentials?: boolean
  addCookieName?: string
  addHeaderName?: string
  xsrfCookieName?: string
  xsrfHeaderName?: string
  onDownLoadProgress?: (e: ProgressEvent) => void
  onUpLoadProgress?: (e: ProgressEvent) => void
  auth?: AxiosBasicCredentials
  validateStatus?: (status: number) => boolean
  paramsSerializer?: (params: any) => string
  baseURL?: string
  [propName: string]: any
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxioPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosIntercepterManager<AxiosRequestConfig>
    response: AxiosIntercepterManager<AxiosResponse>
  }

  request<T = any>(config: AxiosRequestConfig): AxioPromise<T>

  get<T = any>(url: string, config: AxiosRequestConfig): AxioPromise<T>

  delete<T = any>(url: string, config: AxiosRequestConfig): AxioPromise<T>

  options<T = any>(url: string, config: AxiosRequestConfig): AxioPromise<T>

  head<T = any>(url: string, config: AxiosRequestConfig): AxioPromise<T>

  post<T = any>(url: string, data: any, config?: AxiosRequestConfig): AxioPromise<T>

  put<T = any>(url: string, data: any, config: AxiosRequestConfig): AxioPromise<T>

  patch<T = any>(url: string, data: any, config: AxiosRequestConfig): AxioPromise<T>

  getUrl(config: AxiosRequestConfig): string
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxioPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxioPromise<T>
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean

  all<T>(promises: Array<T | Promise<T>>): Promise<T[]>

  spread<T, R>(callback: (...args: T[]) => R): (arr: T[]) => R

  Axios: AxiosClassStatic
}

export interface AxiosClassStatic {
  new (config: AxiosRequestConfig): Axios
}

export interface AxiosIntercepterManager<T> {
  use(resolve: ResolveFn<T>, reject?: RejectFn): number
  eject(id: number): void
}

export interface ResolveFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectFn {
  (val: any): any
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}

export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  throwIfRequested(): void
}

export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken
  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new (message?: string): Cancel
}

export interface AxiosBasicCredentials {
  username: string
  password: string
}
