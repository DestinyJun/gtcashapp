/*
 * 想要更新state中的数据，就要发起一个动作，这就用到action了。Action内部必须使用一个字符串类型的
 * type来表示要执行的动作。一般type都定义成字符串常量。Action只能描述有事情发生了，不能搞其他的。
 */
import * as types from './actionsTypes';

// 登陆数据
let user = {
  name: '小明',
  age: 25
};

// 计数器数据
let nextTodoId = 0;

// 发起登陆Action
export function login() {
  return dispatch => {
    dispatch(isLogining());
    let result = fetch('https://www.baidu.com')
      .then((res) => {
        dispatch(loginSuccess(true, user))
      }).catch((err) => {
        dispatch(loginError(false))
      })

  }
}

// 这个Action标识正在登录
function isLogining () {
  return {
    type: types.LOGIN_IN_DOING
  }
}

// 这个Action标识登录成功
function loginSuccess(isSuccess, user)  {
  console.log('loginSuccess');
  return {
    type: types.LOGIN_IN_DONE,
    user: user.name
  }
}

// 这个Action标识登录失败
function loginError(isSuccess){
  console.log('error');
  return {
    type: types.LOGIN_IN_ERROR

  }
}

// 发起计数器加法action
export function addTodo(text) {
  return {
    type: types.ADD_TODO,
    id: nextTodoId++,
    text
  }
}

// 发起计数器过滤器action
export function setVisibilityFilter (filter) {
  return {
    type: types.SET_VISIBILITY_FILTER,
    filter
  }
}

// 发起一个切换的action
export function toggleTodo  (id) {
  return {
    type: types.TOGGLE_TODO,
    id
  }
}

