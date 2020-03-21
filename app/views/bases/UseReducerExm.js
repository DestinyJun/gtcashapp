/**
 * desc：
 * author：DestinyJun
 * date：  2020/3/20 10:41
 */
import React, {useReducer} from 'react';
import {Button, Text, View} from 'react-native';
export const initialState = {count: 0};
export function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {...state, count: state.count + 1};
    case 'decrement':
      return {...state,count: state.count - 1};
    default:
      throw new Error();
  }
}
/*export default function Counter() {
  // 返回值：最新的state和dispatch函数
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      {/!*useReducer会根据dispatch的action，返回最终的state，并触发rerender*!/}
      <Text>
        Count: {state.count}
      </Text>
      {/!*!// dispatch 用来接收一个 action参数「reducer中的action」，用来触发reducer函数，更新最新的状态*!/}
      <Button onPress={() => dispatch({type: 'increment'})} title={'+'} color={'red'}/>
      <Button onPress={() => dispatch({type: 'decrement'})} title={'-'}/>
    </>
  );
}*/
