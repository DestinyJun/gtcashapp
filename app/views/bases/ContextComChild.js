/**
 * desc：
 * author：DestinyJun
 * date：  2020/3/20 11:11
 */
import React, {useContext} from 'react';
import {Text,Button} from 'react-native';
import {ThemeContext} from './ContextStore';
export function ContextComChild() {
  const theme = useContext(ThemeContext);
  return (
    <>
      <Text>我是ContextComChild</Text>
      <Text>{theme.state.count}</Text>
      <Button color={'red'} title={'加法按钮'} onPress={() => theme.dispatch({type: 'increment'})}/>
      <Button color={'blue'} title={'减法按钮'} onPress={() => theme.dispatch({type: 'decrement'})}/>
    </>
  )
}
