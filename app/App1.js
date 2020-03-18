/**
 * 嵌套路由
 */
import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const SettingsStack = createStackNavigator();
const HomeStack = createStackNavigator();

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

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigation.addListener('focus',() => {
      console.log('我得到焦点了');
    });
    this.props.navigation.addListener('blur',() => {
      console.log('我失去焦点了');
    })
  }
  /**
   * 初始化了状态之后，在第一次绘制 render() 之前
   * （能够使用setState()来改变属性 有且只有一次）
   */
  UNSAFE_componentWillMount() {
    console.log('123');
  }
  render() {
    return (
      <View>
        <Text>我是设置页</Text>
        <Button
          title="去个人信息页"
          onPress={() => this.props.navigation.navigate('Profile')}
        />
      </View>
    );
  }
}

class ProfileScreen extends Component {
  render() {
    return (
      <View>
        <Text>我是个人信息页</Text>
        <Button
          title="去设置页"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
      </View>
    );
  }
}

class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Text>我是主页</Text>
        <Button
          title="去详情页"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen extends Component {
  render() {
    return (
      <View>
        <Text>我是详情页</Text>
        <Button
          title="再去一次详情页"
          onPress={() => this.props.navigation.push('Details')}
        />
      </View>
    );
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="First">
          {() => (
            <SettingsStack.Navigator screenOptions={screenStyles}>
              <SettingsStack.Screen name="Settings" component={SettingsScreen}/>
              <SettingsStack.Screen name="Profile" component={ProfileScreen}/>
            </SettingsStack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name="Second">
          {() => (
            <HomeStack.Navigator>
              <HomeStack.Screen name="Home" component={HomeScreen}/>
              <HomeStack.Screen name="Details" component={DetailsScreen}/>
            </HomeStack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
