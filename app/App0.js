/**
 * desc：程序根路由测试
 */
import React, {Component} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderHeightContext  } from '@react-navigation/stack';
import {BlurView} from 'expo-blur';
// 路由
const Stack = createStackNavigator();
// 组件
class HomeScreen extends Component{
  constructor(props) {
    super(props);
    this.props.navigation.addListener('transitionStart',e => {
      console.debug(e);
    })
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center'}}>
        <Button
          title="Go to Profile"
          onPress={() => this.props.navigation.navigate('Profile')}
        />
      </View>
    );
  }
}
class ProfileScreen extends Component{
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Go to Notifications"
          onPress={() => this.props.navigation.navigate('Notifications')}
        />
        <Button title="Go back" onPress={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}
class NotificationsScreen extends Component{
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Go to Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
        <Button title="Go back" onPress={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}
class SettingsScreen extends Component{
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Go back" onPress={() => this.props.navigation.popToTop()} />
      </View>
    );
  }
}
const DefaultScreenOptions = {
  headerTitleAlign: 'center',
  // headerStatusBarHeight: 20,
  headerTitleAllowFontScaling: true,
  cardShadowEnabled: true,
  headerStyle: {
    backgroundColor: 'red',
  },
  headerTitleStyle: {
    color: 'white',
    fontSize: 40,
    fontWeight: '500'
  },
  headerLeftContainerStyle: {
    backgroundColor: 'yellow',
  },
  headerTitleContainerStyle: {
    backgroundColor: 'blue',
  },
  headerBackTitleStyle: {
    color: '#2A2A2A'
  },
  headerPressColorAndroid: true,
  headerBackground: () => (
    <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
  ),
  cardOverlayEnabled: true,
  cardOverlay: () => (<View><Text>啥的</Text></View>),
  animationEnabled: true,
  // animationTypeForReplace: 'pop'
  // headerTransparent: true
  gestureEnabled: true,
  gestureResponseDistance: 'horizontal',
  gestureVelocityImpact: 0.2,
  safeAreaInsets: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
  }
 /* headerBackImage: () => {
    return (
      <Text>返回</Text>
    )
  }*/
  // headerShown: false,
  /*header: ({scene,previous,navigation}) => {
    const { options } = scene.descriptor;
    const title = options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
        ? options.title
        : scene.route.name;
    return (
      <View style={[{height: 50,backgroundColor: '#468F80',justifyContent: 'center', alignItems:'center'},c_styles.w_100]}>
        <Text style={[{color: 'white',fontWeight: '700'}]}>{title}</Text>
      </View>
    )
  }*/
};
const ScreenOptions = {
  headerRightContainerStyle: {
    width: 50,
    backgroundColor: 'blue',
  },
  headerTintColor: {
    color: 'green',
  },
 /* header: ({scene,previous,navigation}) => {
    const { options } = scene.descriptor;
    const title = options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
        ? options.title
        : scene.route.name;
    return (
      <View style={[{height: 50,backgroundColor: 'red',justifyContent: 'center', alignItems:'center'},c_styles.w_100]}>
        <Text style={[{color: 'white',fontWeight: '700'}]}>{title}</Text>
      </View>
    )
  }*/
};
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode={'card'} headerMode={'screen'} screenOptions={DefaultScreenOptions}>
        <Stack.Screen name="Home" component={HomeScreen} options={ScreenOptions}/>
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
