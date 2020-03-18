/**
 * desc：程序根路由测试
 */
import React, {Component} from 'react';
import HomeScreen from './views/Home/HomeScreen';
import DetailsScreen from './views/Home/DetailsScreen';
import Header from './components/Header/Header';
import {Text, View, Button} from 'react-native';

// 路由相关
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const screenStyles = {
  headerStyle: {
    // flex:1, // 设置无效
    // width: '100%', // 设置无效
    backgroundColor: '#f4511e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    textAlign: 'center', //用于android 机型标题居中显示
    flex: 1,
    alignSelf: 'center',
  },
  headerModel: 'screen',
};
const screenOptions = {
  headerRight: () => (
    <Button
      onPress={() => alert('This is a button!')}
      title="Info"
      color="red"
    />
  ),
};

export default class App0 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={screenStyles}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: '主页',
            }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={screenOptions}
            initialParams={{itemId: 42}}
          />
          {/*<Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={({ route }) => ({ title: route.params.name })}
            initialParams={{itemId: 42}}
          />*/}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
