import axios from '../../src/index'

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: {
//       bar: 'baz'
//     }
//   }
// })

// const date = new Date()

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     date
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: '@:$, '
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: 'bar',
//     baz: null
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     bar: 'baz'
//   }
// })

axios({
  method:'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2,
  }
})

const arr = new Int32Array([32, 21])

axios({
  method:'post',
  url: '/base/buffer',
  data: arr,
  params: {
    foo: [1,2,3],
    bar: 'fdfd'
  }
}).then( res => {
  console.log(res)
})

axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  headers: {
    'content-type': 'application/json;charset=utf-8',
    'Accept': 'application/json, text/plain, */*'
  },
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log(res)
})

const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString )

// 传入URLSearchParams对象，浏览器会自动添加请求头，为其设置正确的格式
axios({
  method: 'post',
  url: '/base/post',
  data: searchParams 
}).then(res => {
  console.log(res)
})