/**
 * （1）reducer是干啥用的呢，个人理解其实就是MVC中的Model模型。举个例子吧，我们页面要展示用户名、性别、年
 * 龄、住址等信息，这时我们服务端接口里给返回的格式如下，这时我们需要对这些字段做处理、存数据、发送
 * 给store做页面展示用。reducer就干这个用的。
 * （2）一个程序中不会只有登陆的reducer，还会有很多其他reducer，那么我们需要把不同的reducer关联到一起
 * 提供给store
 */
import { combineReducers } from 'redux'
import * as types from './actionsTypes'

// 登陆的初始化的状态
const loginInitialState = {
  status: '点击登录',
  isSuccess: false,
  user: null
};
const initState = { data: [] };

// 请求的reducer
function listReducer (state = initState,action) {
  // 判断 action 类型
  switch (action.type) {
    case types.ACTION_LIST_GET_LIST:
      return {
        ...state,
        data: state.data.concat(action.preload)
      };
    default:
      return state;
  }
}

// 登陆reducer
function longinIn(state = loginInitialState, action) {
  switch (action.type) {
    case types.LOGIN_IN_DOING:
      return {
        ...state,
        status: '正在登录',
        isSuccess: false,
        user: null
      };
      // break;
    case types.LOGIN_IN_DONE:
      return {
        ...state,
        status: '登录成功',
        isSuccess: true,
        user: action.user
      };
      // break;
    case types.LOGIN_IN_ERROR:
      return {
        ...state,
        status: '登录失败',
        isSuccess: false,
        user: null
      };
    default:
      return state;

  }
}

// todu的reduce
function todos (state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
      );
    default:
      return state
  }
}

// visibilityFilter的reduce
function visibilityFilter (state = 'SHOW_ALL',action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state
  }
}

// 一个程序中不会只有登陆的reducer，还会有很多其他reducer，那么我们需要把不同的reducer关联到一起提供给store
export default combineReducers({
  loginIn: longinIn,
  todos: todos,
  listReducer: listReducer,
  visibilityFilter: visibilityFilter,
});
