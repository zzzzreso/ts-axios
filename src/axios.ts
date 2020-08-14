import Axios from './core/Axios'
import { AxiosRequestConfig, AxiosStatic } from './types/index'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

// axios实例化对象是一个函数，同时具有多种发送请求的方法
// 调用构造函数创建的只是普通对象,因此需要用bind构造一个函数，并绑定this
// 再用extend将普通对象原型链上的方法拷贝到绑定函数上
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)
  return instance as AxiosStatic
}
// 传入基本配置
const axios = createInstance(defaults)
axios.create = function(config) {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

axios.Axios = Axios

export default axios
