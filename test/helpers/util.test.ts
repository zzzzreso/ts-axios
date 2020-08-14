import {
  isDate,
  isObject,
  isFormData,
  isURLSearchParams,
  extend,
  deepMerge
} from '../../src/helpers/util'

describe('helpers: util', () => {
  describe('isXX', () => {
    it('should validate Date', () => {
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now())).toBeFalsy()
    })
    it('should validate Object', () => {
      expect(isObject({})).toBeTruthy()
      expect(isObject(Date.now())).toBeFalsy()
    })
    it('should validate FormData', () => {
      expect(isFormData(new FormData())).toBeTruthy()
      expect(isFormData({})).toBeFalsy()
    })
    it('should validate URLSearchParams', () => {
      expect(isURLSearchParams(new URLSearchParams())).toBeTruthy()
      expect(isURLSearchParams('a=b&b=c')).toBeFalsy()
    })
  })
  describe('extend', () => {
    it('should be mutable', () => {
      let a = Object.create(null)
      let b = { x: 1 }
      extend(a, b)
      expect(a.x).toBe(1)
    })
    it('should extend properties', () => {
      let a = { x: 123, y: 456 }
      let b = { x: '123', z: 789 }
      let c = extend(a, b)
      expect(c.x).toBe('123')
      expect(c.z).toBe(789)
    })
  })
  describe('deepMerge', () => {
    it('should be immutable', () => {
      let a = Object.create(null)
      let b: any = { foo: 123 }
      let c: any = { bar: 456 }
      deepMerge(a, b, c)
      expect(a.foo).toBe(undefined)
      expect(a.bar).toBe(undefined)
      expect(b.bar).toBe(undefined)
      expect(b.foo).toBe(123)
      expect(c.foo).toBe(undefined)
      expect(c.bar).toBe(456)
    })

    it('should deepMerge properties', () => {
      let a = { foo: 123 }
      let b = { bar: 456 }
      let c = { foo: 789 }
      let d = deepMerge(a, b, c)

      expect(d.foo).toBe(789)
      expect(d.bar).toBe(456)
    })

    it('should deepMerge recursively', () => {
      let a = { foo: { bar: 123 } }
      let b = { foo: { baz: 456 }, bar: { abc: 789 } }
      let c = deepMerge(a, b)

      expect(c).toEqual({
        foo: {
          bar: 123,
          baz: 456
        },
        bar: {
          abc: 789
        }
      })
    })

    it('should remove all references from nested objects', () => {
      let a = { foo: { bar: 123 } }
      let b = {}
      let c = deepMerge(a, b)

      expect(c).toEqual({
        foo: {
          bar: 123
        }
      })
      expect(c.foo).not.toBe(a.foo)
    })

    it('should handle arguments which is not object', () => {
      expect(deepMerge(undefined, undefined)).toEqual({})
      expect(deepMerge('123', { foo: 123 })).toEqual({ foo: 123 })
      expect(deepMerge({ foo: 123 }, null)).toEqual({ foo: 123 })

      expect(deepMerge(null, null)).toEqual({})
      expect(deepMerge(null, { foo: 123 })).toEqual({ foo: 123 })
      expect(deepMerge({ foo: 123 }, 123)).toEqual({ foo: 123 })
    })
  })
})
