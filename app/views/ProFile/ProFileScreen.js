/**
 * desc：  测试组件
 * author：DestinyJun
 * date：  2020/3/16 20:25
 */
import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, ToastAndroid} from 'react-native';
import {ProFileScreenStyles as styles} from './ProFileScreenStyles'
import {HEADER_IMAGE} from '../../util/Constant';
import { Icon } from 'react-native-elements'
import {LocalStorage} from '../../util/LocalStorage';
import {startUpPageAtion} from '../../Redux/actionCreators';
import store from '../../Redux/store';
export default class ProFileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.navigation.setOptions({
      title: '个人中心',
    });
  }

  render() {
    return (
      <View style={[c_styles.pt_3,c_styles.cell]}>
        <View style={[styles.header]}>
          <Image source={HEADER_IMAGE.img} style={styles.header_img}/>
          <View style={[{flexDirection: 'row'}, c_styles.pt_5]}>
            <Text style={c_styles.h4}>裴</Text>
            <Text style={[c_styles.h4,c_styles.ml_2,c_styles.mr_2]}>秀</Text>
            <Text style={c_styles.h4}>智</Text>
          </View>
          <View style={[{flexDirection: 'row'}, c_styles.pt_3]}>
            <Text style={c_styles.h5}>工号：</Text>
            <Text style={c_styles.h5}>955801</Text>
          </View>
        </View>
        <View style={[styles.list]}>
          <View style={styles.list_box}>
            <View style={styles.list_item}>
              <TouchableOpacity style={styles.list_common} onPress={() => {ToastAndroid.show('待开发中...',2000)}}>
                <Text style={c_styles.h5}>修改密码</Text>
                <Icon name='angle-right' type='font-awesome' color='#B5B5B5'/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  LocalStorage.clear();
                  const action = startUpPageAtion({
                    isLoading: true,
                    userToken: false,
                  });
                  store.dispatch(action);
                }}
                style={styles.list_common}>
                <Text style={c_styles.h5}>退出登陆</Text>
                <Icon name='angle-right' type='font-awesome' color='#B5B5B5'/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.list_common}>
                <Text style={c_styles.h5}>版本更新</Text>
                <Icon name='angle-right' type='font-awesome' color='#B5B5B5'/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
