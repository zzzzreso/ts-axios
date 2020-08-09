import { isDate, isObject, isURLSearchParams } from './util'

interface URLOrigin {
  protocol: string
  host: string
}

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(
  url: string,
  params?: any,
  paramsSerializer?: (params: any) => string
): string {
  if (!params) {
    return url
  }
  let serializedParams

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params
  } else {
    const parts: string[] = []
    Object.keys(params).forEach(key => {
      let val = params[key]
      if (val === null || typeof val === 'undefined') {
        return
      }
      let values = []
      // 参数为数组时,属性后要多加一个[]
      if (Array.isArray(val)) {
        values = val
        key += '[]'
      } else {
        values = [val]
      }

      values.forEach(val => {
        if (isDate(val)) {
          val = val.toISOString()
        } else if (isObject(val)) {
          val = JSON.stringify(val)
        }
        parts.push(`${encode(key)}=${encode(val)}`)
      })
    })
    serializedParams = parts.join('&')
  }

  if (serializedParams) {
    let markIndex = url.indexOf('#')
    // 去除哈希符号后面的部分
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // 如果有?说明原本就携带了参数，直接在后面继续拼接
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}

export function isAbsoluteURL(url: string): boolean {
  return /(^[a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export function combineURL(baseURL: string, combineURL?: string): string {
  return combineURL ? baseURL.replace(/\/+&/, '') + '/' + combineURL.replace(/^\/+/, '') : baseURL
}

export function isURLSameOrigin(requestURL: string): boolean {
  const requestOrigin = resolveURL(requestURL)
  return (
    currentOrigin.protocol === requestOrigin.protocol && currentOrigin.host === requestOrigin.host
  )
}

const urlNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
  urlNode.setAttribute('href', url)
  const { protocol, host } = urlNode

  return {
    protocol,
    host
  }
}
