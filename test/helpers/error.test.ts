import { createError } from '../../src/helpers/error'
import { AxiosRequestConfig, AxiosResponse } from '../../src/types'

describe('helpers: error', () => {
  it('should create an Error with message, config, code, request, response and isAxiosError', () => {
    let request = new XMLHttpRequest()
    let config: AxiosRequestConfig = { method: 'post' }
    let response: AxiosResponse = {
      status: 200,
      statusText: 'OK',
      headers: null,
      request,
      config,
      data: { foo: 'bar' }
    }
    let error = createError('Boom!', config, 'something', request, response)
    expect(error instanceof Error).toBeTruthy()
    expect(error.message).toBe('Boom!')
    expect(error.config).toBe(config)
    expect(error.code).toBe('something')
    expect(error.request).toBe(request)
    expect(error.response).toBe(response)
    expect(error.isAxiosError).toBeTruthy()
  })
})
