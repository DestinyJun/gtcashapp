// 定义一个参数
import {IS_LOADING} from "./actionTypes";

const defaultState = {
    isLoading: true,
    userToken: false,
};

export default (state = defaultState, action) => {
    if (action.type === IS_LOADING){
        let newState = JSON.parse(JSON.stringify(state));
        newState.isLoading = action.value.isLoading;
        newState.userToken = action.value.userToken;
        return newState;
    }
    return state
}
