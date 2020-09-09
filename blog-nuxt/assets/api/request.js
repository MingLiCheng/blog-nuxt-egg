/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-04-26 10:36:21
 */
import axios from 'axios'
const CancelToken = axios.CancelToken;
let source = {};
import GlobalConfig from './global.config'
// import {Message} from 'element-ui'

//  timeout 10min
const GLOBAL_DELAY = 10 * 60 * 1000

const BASE_URL = GlobalConfig.apiConfig.reqBaseUrl
const SSO_URL = GlobalConfig.apiConfig.ssoUrl

// 创建axios实例
const axiosInstance = (instanceKey) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: GLOBAL_DELAY,
    cancelToken: new CancelToken(function executor(c) { // 给所有的请求生成一个 取消标识 用去取消请求
      source[instanceKey] = c
    })
  })
  return instance
}

/**
 * 请求拦截器
 * axios 请求的中间件,可根据需求，修改header
 * @param {Object} instance axios实例
 */
const reqMiddleware = (instance) => {
  instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  instance.defaults.withCredentials = true;
  instance.interceptors.request.use(
    config => {
      config.headers['X-Requested-With'] = 'XMLHttpRequest'
      return config
    },
    err => {
      throw new Error(err)
    }
  )
}

const authError = debounce((message) => {
  // Message({
  //   message,
  //   type: 'error'
  // })
}, 1000)

/**
 * 响应拦截器
 * axios 请求成功后响应的中间件
 * @param {Object} instance axios实例
 */

const resMinddleware = instance => {
  instance.interceptors.response.use(
    res => {
      // console.log('axios相应拦截res-成功的请求',res);
      delete source[res.config.url.replace(res.config.baseURL, "/") + res.config.method]
      // console.log('请求取消标识', source);
      if (res) {
        // window.hasErrorMessage = null
        if (res.status === 200) {
          return res.data
        }
        console.log('统一错误处理', res);
        const data = res.data
        switch (data.code) {
          case 401: // 权限不足
            // Message.warning('权限不足')
            break
          case 403: // token 过期 失效
            localStorage.removeItem('token')
            break
          default:
            return res.data
        }
      }
    },
    err => {
      console.log('请求发生错误error', err);;
      if (axios.isCancel(err)) { // 手动停止
        console.log('Request canceled', err, err.message);
        return false
      }
      if (err.response.status === 4004 || err.response.status === 3999) {
        authError('当前登录状态已过期，请重新登录')
        // 将用户重定向到登录页面
        location.href = SSO_URL + location.href
        console.log('当前href', location.href);
        return false
      }
      return Promise.reject(err)
    }
  )
}

// 请求的 实例
const publicReq = async (params) => {
  const {
    url,
    method,
    param
  } = params

  // param['csrftoken'] = window.sessionStorage.getItem('csrftoken')
  let instanceKey = url + method
  const instance = axiosInstance(instanceKey)
  reqMiddleware(instance)
  resMinddleware(instance)

  return await instance({
    url,
    method,
    [method === 'post' ? 'data' : 'params']: param || {},
    transformRequest: [function (data) { // 修改请求数据 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
      let ret = ''
      let index = 0
      // console.log('data', data)

      for (let key in data) {
        if (data[key] === null) {
          ret += `${index === 0 ? '' : '&'}key=&` //
        } else {
          ret += `${index === 0 ? '' : '&'}${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        }
        index += 1
      }
      return ret
    }],
  }).then(res => {
    return res
  })
}

// 请求超时函数
const timeoutfn = (delay, url) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('请求超时')
    }, delay)
  })
}

// 单个请求 存在请求超时
 async function req(params, delay = GLOBAL_DELAY) {
  // console.log('params', params)
  try {
    const response = await Promise.race([
      timeoutfn(delay, params.url),
      publicReq(params) // 放入 取消标记
    ])
    return response
  } catch (error) {
    throw new Error(error)
  }
}

// 多请求 async loop
 async function multiRequest(reqArr) {
  let res = []
  if (typeof reqArr !== 'object' && !(reqArr instanceof Array)) {
    throw new Error(`please set ${reqArr} to Array`)
  }
  try {
    const proms = reqArr.map(ele =>
      publicReq({
        url: ele.url,
        method: ele.method || '',
        param: ele.param || {}
      })
    )

    for (let promise of proms) {
      const response = await promise
      if (response.status !== 200) {
        throw new Error(response.statusText)
      }
      res.push(response)
    }
    return Promise.resolve(res)
  } catch (error) {
    throw new Error(error)
  }
}

// 多请求 promise
 async function multiRequestWithPromise(reqArr) {
  if (typeof reqArr !== 'object' && !(reqArr instanceof Array)) {
    throw new Error(`please set ${reqArr} to Array`)
  }
  try {
    const proms = reqArr.map(ele =>
      publicReq({
        url: ele.url,
        method: ele.method || '',
        param: ele.param || {}
      })
    )
    const res = await Promise.all(proms)
    return res
  } catch (error) {
    console.log(error)
  }
}

// GET request
export async function getRequest(url, param = {}) {
  try {
    const response = await req({
      url,
      method: "get",
      param
    });
    return response;
  } catch (err) {
    // 这里走本地模拟数据
    console.log(typeof err, "err", Object.keys(err));
    // Message.error('服务器错误')
    throw new Error(err);
  }
}

// POST request
export async function postRequest(url, param = {}) {
  try {
    const response = await req({
      url,
      method: "post",
      param
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}

// multi get request method, return Array of request;
 async function getMultiRequest(url, reqArr) {
  const reqParams = []
  reqArr.forEach(item => {
    reqParams.push({
      url,
      param: item,
      method: 'get'
    })
  })
  try {
    const response = await multiRequestWithPromise(reqParams)
    return response
  } catch (err) {
    console.log(err)
  }
}

// multi post request method, return Array of request;
 async function postMultiRequest(url, reqArr) {
  const reqParams = []
  const {
    param
  } = reqArr
  reqArr.forEach(item => {
    reqParams.push({
      url,
      param: item,
      method: 'post'
    })
  })
  try {
    const response = await multiRequestWithPromise(reqParams)
    return response
  } catch (err) {
    console.log(err)
  }
}

/**
 * uploadfile request
 * do not request with 'promise.race'
 * only execute single promise request and set 24h timeout -> \/f/\**\/k/\
 *
 * @param {*} url
 * @param {*} param
 */
 async function UploadePostRequest(url, param) {
  try {
    const response = await publicReq({
      url,
      method: 'post',
      param
    })
    return response
  } catch (err) {
    console.log(err)
  }
}
export function cancelReq() { // 用去取消当前没有成功的所有的请求
  console.log('取消padding的请求', 'source', source);
  if (Object.keys(source).length > 0) {
    Object.keys(source).forEach(key => {
      source[key]('cancel request');
    })
  }
  source = {}
}
// 节流
function debounce(fn, wait) {
  let timerId = null
  let flag = true
  return function () {
    clearTimeout(timerId)
    if (flag) {
      fn.apply(this, arguments)
      flag = false
    }
    timerId = setTimeout(() => {
      flag = true
    }, wait)
  }
}
