let attempts = 0
const MAX_ATTEMPTS = 5
const ATTEMPT_DELAY_FACTOR = 5

export function getAjaxRequest(): Promise<JasmineAjaxRequest> {
  return new Promise(function(resolve, reject) {
    attempts = 0
    attemptGettingAjaxRequest(resolve, reject)
  })
}

function attemptGettingAjaxRequest(resolve: Function, reject: Function) {
  const delay = attempts * attempts * ATTEMPT_DELAY_FACTOR

  if (attempts++ > MAX_ATTEMPTS) {
    reject(new Error('No request was found'))
    return
  }

  setTimeout(function() {
    const request = jasmine.Ajax.requests.mostRecent()
    if (request) {
      resolve(request)
    } else {
      attemptGettingAjaxRequest(resolve, reject)
    }
  }, delay)
}