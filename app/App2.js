/**
 * 全屏路由模特框
 */
import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
const initialState = {
  log: '开始了'
};

class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Text>我是主页</Text>
        <Button
          onPress={() => this.props.navigation.navigate('MyModal')}
          title="Open Modal"
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
      </View>
    );
  }
}

class ModalScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text>我是模态框</Text>
        <Button onPress={() => this.props.navigation.goBack()} title="Dismiss" />
      </View>
    );
  }
}

class MainStackScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <MainStack.Navigator>
        <MainStack.Screen name="Home" component={HomeScreen} />
        {/*<MainStack.Screen name="Details" component={DetailsScreen} />*/}
      </MainStack.Navigator>
    );
  }
}

export default function App() {
  return (
    <NavigationContainer
      onStateChange={state => console.log('New state is', state.routeNames[state.index])}
    >
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name="Main" component={MainStackScreen} />
        <RootStack.Screen name="MyModal" component={ModalScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
