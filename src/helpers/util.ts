const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return typeof val === 'object' && val != null
}

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function extend<T, U>(from: T, to: U): T & U {
  for (let key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export function deepMerge(...args: any[]): any {
  const result = Object.create(null)

  args.forEach(arg => {
    if (arg) {
      Object.keys(arg).forEach(key => {
        const val = arg[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}

export function isFormData(val: any): val is FormData {
  return typeof val !== undefined && val instanceof FormData
}

export function isUrlSearchParams(val: any): val is URLSearchParams {
  return typeof val !== undefined && val instanceof URLSearchParams
}
