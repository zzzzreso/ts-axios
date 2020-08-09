import axios from '../../src/index'

axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hello'
  }
})

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hello axios'
  }
})

axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'axios post'
  }
})

interface ResponseData<T = any> {
  code: number
  message: string
  result: T
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user')
    .then(result => result.data)
    .catch(err => {
      console.log(err)
    })
}

async function test() {
  let user = await getUser<User>()
  if(user) {
    console.log(user.result)
  }
}

test()
axios.get('/extend/get')

axios.options('/extend/options')

axios.delete('/extend/delete')

axios.head('/extend/head')

axios.post('/extend/post', {
  msg: 'post'
})

axios.put('/extend/put', {
  msg: 'put'
})

axios.patch('/extend/patch', {
  msg: 'patch'
})
