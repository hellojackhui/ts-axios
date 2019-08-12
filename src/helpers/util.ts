const toString = Object.prototype.toString

export function isDate(val: any) : val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any) : val is Object {
  return typeof val === 'object' && val != null
}


export function isPlainObject(val: any) :val is Object {
  return toString.call(val) === '[object object]'
}

export function extend<T, U>(from: T, to: U): T & U {
  for (let key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
