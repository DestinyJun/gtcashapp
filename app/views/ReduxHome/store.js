import {createStore, applyMiddleware, compose} from 'redux'
import reducer from "./reducer";
import thunk from 'redux-thunk'

// 配置工具
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
// 配置 thunk
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(reducer, enhancer);

export default store;
