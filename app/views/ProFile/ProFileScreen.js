/**
 * desc：  测试组件
 * author：DestinyJun
 * date：  2020/3/16 20:25
 */
import React, {Component} from 'react';
import {Text, View,Image} from 'react-native';
import {ProFileScreenStyles as styles} from './ProFileScreenStyles'
import {HEADER_IMAGE} from '../../util/Constant';
import { Icon } from 'react-native-elements'
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
              <View style={styles.list_password}>
                <Text style={c_styles.h5}>修改密码</Text>
                <Icon name='angle-right' type='font-awesome' color='#B5B5B5'/>
              </View>
              <View style={styles.list_update}>
                <Text style={c_styles.h5}>版本更新</Text>
                <Icon name='angle-right' type='font-awesome' color='#B5B5B5'/>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
