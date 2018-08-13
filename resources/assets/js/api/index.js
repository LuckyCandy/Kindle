import router from '../router.js'
var baseURL = 'http://share.kindle.cn'
var axios = require('axios')

axios.interceptors.response.use((res) => {
    return res.data;
}, (error) => {
    return Promise.reject(error);
});

/*返回参数类型并转为小写*/
function toType (obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

/*参数过滤器*/
function filterNull (o) {
    for (var key in o) {
      if (o[key] === null) {
          delete o[key]
      }
      if (toType(o[key]) === 'string') {
          o[key] = o[key].trim()
      } else if (toType(o[key]) === 'object') {
          o[key] = filterNull(o[key])
      } else if (toType(o[key]) === 'array') {
          o[key] = filterNull(o[key])
      }
    }
    return o
}

/*接口处理函数*/
function apiAxios (method, url, params, success, failure) {
    if (params) {
      params = filterNull(params)
    }
    axios({
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' ? params : null,
      params: method === 'GET' || method === 'DELETE' ? params : null,
      baseURL: baseURL,
      withCredentials: false
    }).then(function (res) {
      if (res.code === 200) {
        if (success) {
          success(res.data)
        }
      } else if (res.code === 401) {
          router.push({path: '/login'})
      } else {
        if (failure) {
          failure(res)
        } else {
          window.alert('error: ' + JSON.stringify(res.message))
        }
      }
    }).catch(function (err) {
        console.log('----'+JSON.stringify(err));
      if (err) {
        window.alert('api error, HTTP CODE: ' + err.code)
      }
    })
}

export default {
    get: function (url, params, success, failure) {
        return apiAxios('GET', url, params, success, failure)
    },
    post: function (url, params, success, failure) {
        return apiAxios('POST', url, params, success, failure)
    },
    put: function (url, params, success, failure) {
        apiAxios('PUT', url, params, success, failure)
    },
    delete: function (url, params, success, failure) {
        return apiAxios('DELETE', url, params, success, failure)
    }
}