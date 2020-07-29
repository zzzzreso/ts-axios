import Axios from './core/Axios'
import { AxiosInstance } from './types/index'
import { extend } from './helpers/util'

//axios实例化对象是一个函数，同时具有多种发送请求的方法
//调用构造函数创建的只是普通对象,因此需要用bind构造一个函数，并绑定this
//再用extend将普通对象原型链上的方法拷贝到绑定函数上
function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)
  return instance as AxiosInstance
}

const axios = createInstance()

console.dir(axios)
export default axios
