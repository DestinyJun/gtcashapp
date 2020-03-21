/**
 * desc：  根据不同路由更换状态栏颜色（普通得导航方式）
 * author：DestinyJun
 * date：  2020/3/21 11:23
 */
import React, {Component} from 'react';
import { Text, StatusBar, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import SafeAreaViewColor from 'react-native-safe-area-view';
const Stack = createStackNavigator();

class Screen1 extends Component{
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
  render() {
    return (
      <SafeAreaViewColor style={[styles.container, { backgroundColor: '#ecf0f1' }]}>
        {/*修改状态栏颜色*/}
        <StatusBar barStyle="dark-content" backgroundColor="red" />
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
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Screen1" component={Screen1} />
            <Stack.Screen name="Screen2" component={Screen2} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
