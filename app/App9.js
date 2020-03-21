/**
 * desc：  根据不同路由更换状态栏颜色（抽屉导航方式）
 * author：DestinyJun
 * date：  2020/3/21 11:23
 */
import React, {Component} from 'react';
import { Text, StatusBar, Button, StyleSheet,Platform} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import SafeAreaViewColor from 'react-native-safe-area-view';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

/**
 * 在Tab切换模式下渲染状态栏颜色分两步走：
 * （1）如果是tab切换，页面在一开始就渲染了，并且保存了渲染状态，那么那个组件先设置状态栏的
 * 颜色，颜色就会是那一个，因此为了避免覆盖渲染的情况，设置初始化显示组件的状态栏颜色
 * 即可。
 * （2）监控当前处于那个路由的事件，然后动态改变状态栏颜色
 */

class Screen1 extends Component{
  constructor(props) {
    super(props);
    // 监控页面获得焦点事件
    this.props.navigation.addListener('state',e => {
      // console.log(e.data.state.routeNames[e.data.state.index]);
      // console.debug('Screen1',(`${new Date().getMinutes()}:${new Date().getSeconds()}`));
      if (e.data.state.routeNames[e.data.state.index] === 'Screen1') {
        StatusBar.setBarStyle('light-content');
        Platform.OS === 'android' && StatusBar.setBackgroundColor('#6a51ae');
      }
    });
  }
  render() {
    return (
      <SafeAreaViewColor style={[styles.container, { backgroundColor: '#6a51ae' }]}>
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
        <Text style={{ color: '#fff' }}>Light Screen</Text>
        <Button
          title="Next screen"
          onPress={() => this.props.navigation.navigate('Screen2')}
          color="#000"
        />
      </SafeAreaViewColor>
    );
  }
}

class Screen2 extends Component{
  constructor(props) {
    super(props);
    // 监控页面获得焦点事件
    this.props.navigation.addListener( 'state',
      (e)=>{
        if (e.data.state.routeNames[e.data.state.index] === 'Screen2') {
          StatusBar.setBarStyle('dark-content');
          Platform.OS === 'android' && StatusBar.setBackgroundColor('#ecf0f1');
        }
      })
  }
  render() {
    return (
      <SafeAreaViewColor style={[styles.container, { backgroundColor: '#ecf0f1' }]}>
        {/*修改状态栏颜色*/}
        {/*<StatusBar barStyle="dark-content" backgroundColor="red" />*/}
        <Text>Dark Screen</Text>
        <Button
          title="Next screen"
          onPress={() => this.props.navigation.navigate('Screen1')}
        />
      </SafeAreaViewColor>
    );
  }
}

export default class App8 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator headerMode="none">
            <Drawer.Screen name="Screen1" component={Screen1} />
            <Drawer.Screen name="Screen2" component={Screen2} />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
