/**
 * Drawer navigation导航稍微高级点使用（2）
 * author：DestinyJun
 * date：  2020/3/18 11:34
 */
import React, {Component} from 'react';
import {View,Text, Button} from 'react-native';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  useIsDrawerOpen
} from '@react-navigation/drawer';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>我是Feed</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Notifications')}
          title="去notifications页"
        />
        <Button
          onPress={() => this.props.navigation.openDrawer()}
          title="打开抽屉"
        />
        <Button
          onPress={() => this.props.navigation.closeDrawer()}
          title="关闭抽屉"
        />
        <Button title="切换抽屉" onPress={() => this.props.navigation.toggleDrawer()} />
        <Button
          title="调度打开动作"
          onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
        />
        <Button
          title="调度切换动作"
          onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}
        />
      </View>
    );
  }
}
class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>我是Notifications</Text>
        <Button onPress={() => this.props.navigation.goBack()} title="点击去home" />
      </View>
    );
  }
}



const Drawer  = createDrawerNavigator();
function CustomDrawerContent(props) {
  console.log(props);
  return (
    <DrawerContentScrollView {...props}>
      <View style={[{flexDirection: 'row',backgroundColor: 'red'}]}>
        <Text>哈啊哈</Text>
      </View>
      <View>
        <Text>{props.state.routeNames[0]}</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        style={[{backgroundColor: 'red',alignItems: 'flex-start'}]}
        label={() => (<View><Text>关闭</Text></View>)}
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="切换"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}
function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Notifications" component={Notifications} />
    </Drawer.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
