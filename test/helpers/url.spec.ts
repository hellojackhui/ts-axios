import { buildURL, isAbsoluteURL, combineURL, isUrlSameOrigin } from '../../src/helpers/url'
describe('helper:url', () => {
  describe('buildURL', () => {
    test('should support null params', () => {
      expect(buildURL('/foo')).toBe('/foo')
    })
    test('should support params', () => {
      expect(
        buildURL('/foo', {
          foo: 'bar'
        })
      ).toBe('/foo?foo=bar')
    })
    test('should ignore if same params value is null', () => {
      expect(
        buildURL('/foo', {
          foo: 'bar',
          baz: null
        })
      ).toBe('/foo?foo=bar')
    })
    test('should ignore if only params value is null', () => {
      expect(
        buildURL('/foo', {
          baz: null
        })
      ).toBe('/foo')
    })
    // test('should support object params', () => {
    //   expect(
    //     buildURL('/foo', {
    //       foo: {
    //         bar: 'baz'
    //       }
    //     })
    //   ).toBe('/foo?foo=' + encodeURI('{"bar": "baz"}'))
    // })
    test('should support existing params', () => {
      expect(
        buildURL('/foo?foo=baz', {
          bar: 'baz'
        })
      ).toBe('/foo?foo=baz&bar=baz')
    })
    test('should use serializer if provided', () => {
      const serializer = jest.fn(() => {
        return 'foo=bar'
      })
      const params = { foo: 'bar' }
      expect(buildURL('/foo', params, serializer)).toBe('/foo?foo=bar')
      expect(serializer).toHaveBeenCalled()
      expect(serializer).toHaveBeenCalledWith(params)
    })
  })
  describe('isAbsoluteURL', () => {
    test('should return true if URL begins with valid', () => {
      expect(isAbsoluteURL('https://api.github.com/users')).toBeTruthy()
      expect(isAbsoluteURL('custom-scheme-v1.0://example.com')).toBeTruthy()
    })
    test('should return false if URL begins with invalid', () => {
      expect(isAbsoluteURL('123://api.github.com/users')).toBeFalsy()
      expect(isAbsoluteURL('!valid://example.com')).toBeFalsy()
    })
    test('should return true if URL begins with protocol-relative', () => {
      expect(isAbsoluteURL('//api.github.com/')).toBeTruthy()
    })
  })
  describe('combineURL', () => {
    test('should combine url', () => {
      expect(combineURL('https://www.baidu.com', '/users')).toBe('https://www.baidu.com/users')
    })
    test('should remove duplicate slushes', () => {
      expect(combineURL('https://www.baidu.com/', '/users')).toBe('https://www.baidu.com/users')
    })
    test('should insert missing slushes', () => {
      expect(combineURL('https://www.baidu.com', 'users')).toBe('https://www.baidu.com/users')
    })
  })
  describe('isURLSameOrigin', () => {
    test('should url same origin', () => {
      expect(isUrlSameOrigin(window.location.href)).toBeTruthy()
    })
    test('should url different origin', () => {
      expect(isUrlSameOrigin('https://www.github.com/axios/axios')).toBeFalsy()
    })
  })
})
