import { transformRequest, transformResponse } from '../../src/helpers/data'

describe('helpers: data', () => {
  describe('transformRequest', () => {
    it('should transform request data to string if data is a object', () => {
      let a = { a: 1 }
      expect(transformRequest(a)).toBe('{"a":1}')
    })
    it('should do nothing if data is not a object', () => {
      let a = new URLSearchParams('a=b')
      expect(transformRequest(a)).toBe(a)
    })
  })

  describe('transformResponse', () => {
    it('should transform response data to Object if data is a JSON string', () => {
      let a = '{"a":2}'
      expect(transformResponse(a)).toEqual({ a: 2 })
    })

    it('should do nothing if data is a string but not a JSON string', () => {
      let a = '{a:2}'
      expect(transformResponse(a)).toBe('{a:2}')
    })

    it('should do nothing if data is not a string', () => {
      let a = { a: 2 }
      expect(transformResponse(a)).toBe(a)
    })
  })
})
