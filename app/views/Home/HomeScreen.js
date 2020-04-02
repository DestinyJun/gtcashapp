/**
 * desc：  TabHome
 * author：DestinyJun
 * date：  2020/3/16 20:25
 */
import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Image, StatusBar, BackHandler, ToastAndroid,NativeModules} from 'react-native';
import {Constant, MENU_IMG_LIST} from '../../util';
import {HomeScreenStyle} from './HomeScreenStyle';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.navigation.setOptions({
      title: '中驿超市',
    });
  }

  render() {
    const a = '../../assets/images/餐饮入口04_1080.png';
    return (
      <View style={[HomeScreenStyle.home, c_styles.pr_3, c_styles.pl_3]}>
        <StatusBar backgroundColor={'transparent'} translucent={true} animated={false} />
        {
          Constant.MENU_LIST.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => this.props.navigation.navigate(
                item.router,
                {
                  itemId: 86,
                  otherParam: 'anything you want here',
                },
              )}
            >
              <View elevation={5} style={[HomeScreenStyle.home_card, c_styles.mt_3, c_styles.p_1]}>
                <View style={[HomeScreenStyle.home_card_view, c_styles]}>
                  <View style={[HomeScreenStyle.home_card_view_list, c_styles.p_2]}>
                    <Image resizeMode='center' source={MENU_IMG_LIST[index]}/>
                  </View>
                  <View style={[HomeScreenStyle.home_card_view_list]}>
                    <Text style={[{color: item.color}, c_styles.h3, {
                      borderColor: item.color,
                      borderBottomWidth: 1,
                      paddingBottom: 5,
                      borderStyle: 'dotted',
                    }]}>{item.title}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        }
      </View>
    );
  }
  componentDidMount() {
    if (Platform.OS === 'android'){
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  onBackAndroid = () => {
    //判断该页面是否处于聚焦状态
    if(this.props.navigation.isFocused()) {
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //最近2秒内按过back键，可以退出应用。
        // return true;
        BackHandler.exitApp();//直接退出APP
      }else{
        this.lastBackPressed = Date.now();
        //退出提示
        ToastAndroid.show('再按一次退出应用', 1000);
        return true;
      }
    }
  }
}
