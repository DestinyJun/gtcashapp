import {IS_LOADING} from "./actionTypes";
import {LocalStorage} from "../../util";
import store from "./store";

export const  setStartUpPageAtion = (data) => (
    {
        type: IS_LOADING,
        value: data
    }
);
export const  startUpPageAtion = (data) => {
    return (dispatch) =>{
        LocalStorage.get('APPKEY')
            .then((res) => {
                if (res) {
                    const  action = setStartUpPageAtion({
                        isLoading: false,
                        userToken: true
                    });
                    dispatch(action);
                } else {
                    const  action = setStartUpPageAtion({
                        isLoading: false,
                        userToken: false
                    });
                    dispatch(action);
                }
            })
            .catch(((err) => {
                const action = setStartUpPageAtion({
                    isLoading: false,
                    userToken: false
                });
                dispatch(action);
            }));
    }
};

