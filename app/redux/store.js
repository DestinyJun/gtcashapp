/**
 * store：store是把action、reducer联系到一起的对象。它负责以下职责
 * （1）维持应用的 state；
 * （2）提供 getState() 方法获取 state；
 * （3）提供 dispatch(action) 方法更新 state；
 * （4）通过 subscribe(listener) 注册监听器；
 * （5）通过 subscribe(listener) 返回的函数注销监听器；
 * Redux 应用只有一个单一的store。当需要拆分数据处理逻辑时，你应该使用 reducer 组合 而不是创建多个 store。
 */
import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from "redux-thunk";
import rootReducer from './reducer'
import test from '../views/ReduxHome/Test'
const stores = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, test)
);

export default stores
