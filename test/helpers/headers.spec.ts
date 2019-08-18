import { parseHeaders, processHeaders, flattenHeader } from '../../src/helpers/header'

describe('helper::header', () => {
  describe('parseHeaders', () => {
    test('should parse header', () => {
      const parsed = parseHeaders(
        'Content-type: application/json\r\n' +
          'Connection: keep-alive\r\n' +
          'Date: Tue, 21 May 2019 09:23:44 GMT\r\n' +
          ':aa\r\n' +
          'key:'
      )

      expect(parsed['content-type']).toBe('application/json')
      expect(parsed['connection']).toBe('keep-alive')
      expect(parsed['date']).toBe('Tue, 21 May 2019 09:23:44 GMT')
      expect(parsed['key']).toBe('')
    })
    test('should return empty object if empty string', () => {
      expect(parseHeaders('')).toEqual({})
    })
  })
  describe('processHeaders', () => {
    test('should normalize Content-type header name', () => {
      const headers: any = {
        'conTenT-Type': 'foo/bar',
        'Content-length': 1024
      }
      processHeaders(headers, {})
      expect(headers['Content-Type']).toBe('foo/bar')
      expect(headers['content-Type']).toBeUndefined()
      expect(headers['Content-length']).toBe(1024)
    })
    test('should set Content-Type if not set and data is PlainObject', () => {
      const headers: any = {}
      processHeaders(headers, { a: 1 })
      expect(headers['Content-Type']).toBe('application/json;charset=utf-8')
    })
    test('should not set Content-Type if not set and data is PlainObject', () => {
      const headers: any = {}
      processHeaders(headers, new URLSearchParams('a=b'))
      expect(headers['Content-Type']).toBeUndefined()
    })
    test('should do nothing if header is undefined or null', () => {
      expect(processHeaders(undefined, {})).toBeUndefined()
      expect(processHeaders(null, {})).toBeNull()
    })
  })
  describe('flattenHeader', () => {
    test('should flatten the headers and include common headers', () => {
      const headers = {
        Accept: 'application/json',
        common: {
          'X-COMMON-HEADER': 'commonHeaderValue'
        },
        get: {
          'X-GET-HEADER': 'getHeaderValue'
        },
        post: {
          'X-POST-HEADER': 'postHeaderValue'
        }
      }
      expect(flattenHeader(headers, 'get')).toEqual({
        Accept: 'application/json',
        'X-COMMON-HEADER': 'commonHeaderValue',
        'X-GET-HEADER': 'getHeaderValue'
      })
    })
    test('should do nothing if header is undefined or null', () => {
      expect(flattenHeader(undefined, 'get')).toBeUndefined()
      expect(flattenHeader(null, 'get')).toBeNull()
    })
  })
})
