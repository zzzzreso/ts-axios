import axios, { AxiosResponse, AxiosTransformer } from '../src/index'
import { getAjaxRequest } from './helper'

describe('transform', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  it('should transform string to JSON', () => {
    const data = {
      foo: 'bar'
    }

    axios.post('/foo', data)
    return getAjaxRequest().then(request => {
      expect(request.params).toBe('{"foo":"bar"}')
    })
  })

  it('should transform JSON to string', done => {
    let response: AxiosResponse

    axios('/foo').then(res => {
      response = res
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: '{"foo": "bar"}'
      })

      setTimeout(() => {
        expect(typeof response.data).toBe('object')
        expect(response.data.foo).toBe('bar')
        done()
      }, 100)
    })
  })

  it('should override default transform', () => {
    const data = {
      foo: 'bar'
    }

    axios.post('/foo', data, {
      transformRequest(data) {
        return data
      }
    })

    return getAjaxRequest().then(request => {
      expect(request.params).toEqual({ foo: 'bar' })
    })
  })

  it('should allow an Array of transformers', () => {
    const data = {
      foo: 'bar'
    }

    axios.post('/foo', data, {
      transformRequest: (axios.defaults.transformRequest as AxiosTransformer[]).concat(function(
        data
      ) {
        return data.replace('bar', 'baz')
      })
    })

    return getAjaxRequest().then(request => {
      expect(request.params).toBe('{"foo":"baz"}')
    })
  })

  it('should allowing mutating headers', () => {
    const token = Math.floor(Math.random() * Math.pow(2, 64)).toString(36)

    axios('/foo', {
      transformRequest: (data, headers) => {
        headers['X-Authorization'] = token
        return data
      }
    })

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['X-Authorization']).toEqual(token)
    })
  })
})
