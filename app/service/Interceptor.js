/**
 * axios拦截器
 */
import axios from 'axios'

// 设置全局请求的地址
axios.defaults.baseURL = 'http://139.9.225.98:8999';

//设置的请求次数，请求的间隙
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

// 全局设置超时时间
axios.defaults.timeout = 3000;

// 请求拦截
axios.interceptors.request.use(
  function (config) {
    // console.log(config);
    // 判断那些接口需要添加token，那些接口需要添加请求类型，判断token是否存在
    if (!(config.url.includes('/login'))) {
      // config.headers.post['APPKEY'] = localStorage.getItem('APPKEY');
      // config.headers.post['userId'] = localStorage.getItem('userCode');
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  function (response){
    // 处理200响应数据错误
    switch(response.status) {
      case 200:
        if (response.data.data.length === 0) {
          return Promise.reject(response);
        }
        switch (response.data.code) {
          case '1000':
            return Promise.resolve(response);
          case '1005':
            return Promise.reject(response);
          default:
            return Promise.reject(response);
        }
      default:
        window.alert('链接服务器失败，请稍后重试！');
        return Promise.reject(response);
    }
  },
  function (error){
    // 请求超时处理
    if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
      const confirm = window.confirm('网络请求超时，请重试！');
      if (confirm) {
        location.reload();
        return Promise.resolve(error);
      } else {
        return Promise.reject(error); // 错误信息
      }
    }
    // 处理响应失败
    return Promise.reject(error);
  }
);

// 封装get请求
export function get(url, params){
  return new Promise((resolve, reject) =>{
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data);
    }).catch(err =>{
      reject(err.data)
    })
  });
}

// 封装post请求
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err =>{
        // console.log(err);
        // 抛出异常以后，拦截器哪里已经做了提醒处理，所以无需再处理
        // console.log(err.data);
        // reject(EMPTY)
        reject(err)
      })
  });
}
