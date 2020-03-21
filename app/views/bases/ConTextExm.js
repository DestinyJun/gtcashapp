/**
 * desc：
 * author：DestinyJun
 * date：  2020/3/20 11:03
 */
import React, {useReducer} from 'react';
import {ThemeContext} from './ContextStore';
import {ContextCom} from './ContextCom';
import {initialState, reducer} from './UseReducerExm';

export default function app() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ThemeContext.Provider value={{state: state,dispatch: dispatch}}>
      <ContextCom />
    </ThemeContext.Provider>
  )
}
