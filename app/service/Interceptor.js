/**
 * axios拦截器
 */
import axios from 'axios'
import {Alert, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// 设置全局请求的地址
// axios.defaults.baseURL = 'http://192.168.28.28:8999';
axios.defaults.baseURL = 'http://139.9.225.98:8999';

//设置的请求次数，请求的间隙
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

// 全局设置超时时间
axios.defaults.timeout = 3000;

// 请求拦截
axios.interceptors.request.use(
  async function (config) {
    const str = config.url;
    // 判断那些接口需要添加token，那些接口需要添加请求类型，判断APPKEY是否存在
    if (!(str.includes('/user'))) {
      config.headers.post['APPKEY'] = await AsyncStorage.getItem('APPKEY');
      config.headers.post['userId'] = await AsyncStorage.getItem('userId');
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
    if (response.status === 200) {
      switch (response.data.code) {
        case '1000':
          return Promise.resolve(response.data);
          break;
        case '1005':
          ToastAndroid.show(response.data.msg, 1000);
          return Promise.reject(response.data);
          break;
        default:
          ToastAndroid.show(response.data.msg, 1000);
          return Promise.reject(response.data);
          break;
      }
    } else {
      ToastAndroid.show('连接网络失败，请检查网络！', 1000);
      return Promise.reject(response.data);
    }
  },
  function (error){
    // 请求超时处理,判断请求异常信息中是否含有超时timeout字符串
    const str = error.message;
    if(str.includes('timeout')){
      Alert.alert('','网络请求超时，是否重试？',[
        {
          text: '确定',onPress: () => {
            location.reload();
            return Promise.resolve(error);
          }},
        {
          text: '取消',onPress: () => {
            location.reload();
            return Promise.reject(error);
          }},
      ]);
    }
    // 处理响应失败
    return Promise.reject(error);
  }
);

// 封装get请求
export function get(url, params){
  return new Promise((resolve, reject) =>{
    axios.get(url, {params: params})
      .then(res => {
        resolve(res);
      })
      .catch(err =>{
        reject(err)
    })
  });
}

// 封装post请求
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  });
}
