/**
 * desc：路由验证流程
 * author：DestinyJun
 * date：  2020/3/19 11:35
 */

/**
 * （1）希望达到的效果：当用户登录成功时，我们希望放弃身份验证流程的状态并卸载与身份验证相关的所有屏幕，并且当我们按下
 * 硬件后退按钮时，我们希望不要能够返回到身份验证流程
 */
import React,{Component} from 'react'
import {View,Text, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {localStorage} from './util'

// 用户登陆前显示的屏幕
class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
        <Text>我是SplashScreen（进入APP时显示的页面）</Text>
      </View>
    );
  }
}

// 用户登陆的屏幕
class SignInScreen  extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
        <Text>我是SignInScreen（登录页）</Text>
      </View>
    );
  }
}

// 用户登陆后可访问的主页
class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
        <Text>我是HomeScreen（登录成功后显示的页面）</Text>
      </View>
    );
  }
}

// 用户注册页面
class SignUpScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
        <Text>我是SignUpScreen（用户注册的页面）</Text>
      </View>
    );
  }
}

// 密码重置界面
class ResetPassword extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
        <Text>我是ResetPassword（我是密码重置界面）</Text>
      </View>
    );
  }
}

// 程序入口app
const Stack = createStackNavigator();
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true, // 进入app时检查是否登陆过
      userToken: null, // 检查是否有登陆令牌或者令牌是否过期
      isSignout: true // 用户是都做了注销操作
    };
  }
  /**
   * 初始化了状态之后，在第一次绘制 render() 之前
   * （能够使用setState()来改变属性 有且只有一次）
   */
  UNSAFE_componentWillMount() {
    setTimeout(() => {
      localStorage.get('APPKEY')
        .then(res=> {
          this.setState({
            isLoading: false,
            userToken: null
          });
          console.log(res);
        })
        .catch(err => {

        });
    },50)

  }
  render() {
    if (this.state.isLoading) {
      // We haven't finished checking for the token yet
      return <SplashScreen />;
    }
    return (
      <NavigationContainer>
        <Stack.Navigator mode='modal' headerMode='none'>
          {this.state.userToken == null ? (
            // 这里定义用户没有登陆时可访问的界面
            // When logging out, a pop animation feels intuitive
            // You can remove this if you want the default 'push' animation
            // animationTypeForReplace：配置路由切换动画
            <>
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{title: 'Sign in', animationTypeForReplace: this.state.isSignout ? 'pop' : 'push'}}
              />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
            </>
          ) : (
            // User is signed in
            <Stack.Screen name="Home" component={HomeScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
