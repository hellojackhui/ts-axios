import { RejectFn, ResolveFn } from '../types'

interface Interceptor<T> {
  resolve: ResolveFn<T>
  reject?: RejectFn
}

export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  use(resolve: ResolveFn<T>, reject?: RejectFn): number {
    this.interceptors.push({
      resolve,
      reject
    })
    return this.interceptors.length - 1
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }

  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
