import { isObject } from './util'

export function transformRequest(data: any): any {
  // console.log('request data', data)
  if (isObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // console.log(e)
    }
  }

  return data
}
