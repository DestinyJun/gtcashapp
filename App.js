import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View, StatusBar} from 'react-native';
// 自定义组件
import {Icons} from './app/views/bases/Icons';
import LoginScreen from './app/views/Login/LoginScreen';
import HomeScreen from './app/views/Home/HomeScreen';
import ProFileScreen from './app/views/ProFile/ProFileScreen';
import MarketScreen from './app/views/Home/MarketScreen';
import RepastScreen from './app/views/Home/RepastScreen';
// 工具
import store from './app/Redux/store.js';
import {startUpPageAtion} from './app/Redux/actionCreators';
import ChartScreen from './app/views/Home/ChartScreen';
import {LocalStorage} from './app/util';
import {MarketStoreScreen} from './app/views/Home/MarketStoreScreen';
// 路由
const Stack = createStackNavigator();
const LoginStack = createStackNavigator();
const TabHome = createBottomTabNavigator();
const TabHomeStack = createStackNavigator();
/********路由配置**************/
// 共有路由配置
const DefaultScreenOptions = {
  cardStyle: {
    backgroundColor: '#FAFFFE',
  },
  headerTransparent: true,
  headerTitleStyle: {
    color: '#FFFFFF',
  },
  headerTitleAlign: 'center',
  headerBackImage: () => (<Icons iconName={'angle-left'} size={30} color={'#FFFFFF'}/>),
};
const WhiteThemeScreenOptions = {
  headerTitleAlign: 'center',
  headerTintColor: '#000',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerBackImage: () => (<Icons iconName={'angle-left'} size={30} color={'black'}/>),
};

// TabStackScreen路由配置
const TabStackScreenOptions = {
  headerShown: false,
};
const TabStackHomeOptions = {
  activeTintColor: '#468F80',
  inactiveTintColor: '#C0C0C0',
  style: {
    height: 60,
    paddingBottom: 0,
  },
  labelStyle: {
    fontSize: 16,
  },
  tabStyle: {
    paddingBottom: 5,
    paddingTop: 5,
    paddingRight: 0,
    paddingLeft: 0,
  },
  allowFontScaling: true,
  adaptive: true,
};
const TabStackHomeScreenOption = {
  title: '主页',
};
const TabStackProFileScreenOption = {
  title: '我的',
};
const TabHomeStackHomeScreenOptions = {
  headerTransparent: false,
  headerStyle: {
    backgroundColor: '#468F80',
  },
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: '#fff',
  },
};
const TabHomeStackProFileScreenOptions = {
  headerTransparent: false,
  headerStyle: {
    backgroundColor: '#468F80',
  },
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: '#fff',
  },
};

// LoginScreen路由配置
const LoginScreenOptions = {
  headerShown: false,
};
// RepastScreen路由配置
const RepastScreenOptions = {
  title: 'My home',
  ...WhiteThemeScreenOptions
};
// ChartScreen路由配置
const ChartScreenOptions = {
  title: '查看报表',
  ...WhiteThemeScreenOptions
};

// 路由分级
function TabStackScreen() {
  return (
    <TabHome.Navigator
      initialRouteName={'Home'}
      backBehavior={'none'}
      tabBarOptions={TabStackHomeOptions}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'ProFile') {
            iconName = focused ? 'user-o' : 'user-o';
          }
          return <Icons iconName={iconName} badgeCount={5} size={26} color={color}/>;
        },
      })}
    >
      <TabHome.Screen name="Home" options={TabStackHomeScreenOption}>
        {() => (
          <TabHomeStack.Navigator initialRouteName={'HomeScreen'}>
            <TabHomeStack.Screen name="HomeScreen" component={HomeScreen} options={TabHomeStackHomeScreenOptions}/>
          </TabHomeStack.Navigator>
        )}
      </TabHome.Screen>
      <TabHome.Screen name="ProFile" options={TabStackProFileScreenOption}>
        {() => (
          <TabHomeStack.Navigator>
            <TabHomeStack.Screen name="ProFileScreen" component={ProFileScreen} options={TabHomeStackProFileScreenOptions}/>
          </TabHomeStack.Navigator>
        )}
      </TabHome.Screen>
    </TabHome.Navigator>
  );
}

function LoginStackScreen() {
  return (
    <LoginStack.Navigator initialRouteName={'LoginScreen'} headerMode={'none'} screenOptions={DefaultScreenOptions}>
      <LoginStack.Screen name="LoginScreen" component={LoginScreen}/>
    </LoginStack.Navigator>
  );
}

// 加载页
function LoadingScreen() {
  return (
    <View style={[c_styles.cell, c_styles.flex_center]}>
      <Text style={[c_styles.h3, c_styles.text_danger]}>欢迎来到收银APP</Text>
    </View>
  );
}

// 导出入口模块
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: store.getState().isLoading,
      userToken: store.getState().userToken,
    };
    const action = startUpPageAtion();
    store.dispatch(action);
    store.subscribe(() => {
      this.setState({
        isLoading: store.getState().isLoading,
        userToken: store.getState().userToken,
      });
    });
    // LocalStorage.clear();
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingScreen/>;
    }
    return (
      <NavigationContainer
        onStateChange={(newState) => {
          StatusBar.setBackgroundColor('transparent', true);
          StatusBar.setTranslucent(true);
          StatusBar.setBarStyle('light-content', true);
          const state = newState.routes[newState.index].state;
          const name = newState.routes[newState.index].name;
          if (name === 'TabStackScreen') {
            const tabName = state.routeNames[state.index];
            switch (tabName) {
              case 'Home':
                // StatusBar.setBarStyle('light-content',true);
                break;
              case 'ProFile':
                // StatusBar.setBarStyle('dark-content',false);
                break;
            }
            // return;
          } else if (name === 'RepastScreen' || name === 'ChartScreen') {
            StatusBar.setBarStyle('dark-content', true);
          }
        }}
      >
        <Stack.Navigator>
          {
            this.state.userToken ? (
              <>
                <Stack.Screen name="TabStackScreen" component={TabStackScreen} options={TabStackScreenOptions}/>
                <Stack.Screen name="RepastScreen" component={RepastScreen} options={RepastScreenOptions}/>
                <Stack.Screen name="MarketScreen" component={MarketScreen} options={DefaultScreenOptions}/>
                <Stack.Screen name="MarketStoreScreen" component={MarketStoreScreen} options={DefaultScreenOptions}/>
                <Stack.Screen name="ChartScreen" component={ChartScreen} options={ChartScreenOptions}/>
              </>
            ) : (
              <>
                <Stack.Screen name="LoginStackScreen" component={LoginStackScreen} options={LoginScreenOptions}/>
              </>
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
