import { isObject, deepMerge } from './util'
import { Method } from '../types'

function normalizeName(headers:any, normalizedName: string):void {
  if(!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if(name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeName(headers, 'Content-Type')
  if(isObject(data)) {
    if(headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  let arr = headers.split('\r\n').map(it => it.split(': '))
  arr.forEach(item => {
    let [key, val] = item
    key = key.trim().toLowerCase()
    if(!key) {
      return
    }
    if(val) {
      parsed[key] = val.trim()
    }
  })
  return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
  if(!headers) {
    return headers
  }
  // 提取可能存在的common，method对象中的属性
  headers = deepMerge(headers.common, headers[method], headers)
  
  const methodsToDelete = ['get', 'post', 'put', 'delete', 'options', 
  'patch', 'head', 'common']

  methodsToDelete.forEach( key => {
    delete headers[key]
  })

  return headers
}