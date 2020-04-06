/**
 * desc：  超市商品入库
 * author：DestinyJun
 * date：  2020/4/6 14:19
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Animated, Easing, ScrollView} from 'react-native';
import {MarketStoreScreenStyles as styles} from './MarketStoreScreenStyles'
// 第三方组件库
import {Icon} from 'react-native-elements';
import {RNCamera} from 'react-native-camera';
import {GoodsInfoCard} from '../bases/GoodsInfoCard';
import AsyncStorage from '@react-native-community/async-storage';


export class MarketStoreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goods: [1],
      moveAnim: new Animated.Value(0), // 扫动条动画
    };
    this.isScan = true;
    this.props.navigation.setOptions({
      title: '超市收银',
      headerRightContainerStyle: {},
      headerRight: () => {
        return (
          <TouchableOpacity style={[c_styles.pl_3, {width: 100}]} onPress={this.searchModalToggle}>
            <Icon name='dehaze' type='material' color='#FFFFFF' size={30}/>
          </TouchableOpacity>
        );
      },
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.camera]}>
           {/*<RNCamera
            ref={ref => {this.camera = ref}}
            style={styles.camera_preview}
            type={'back'}
            flashMode={RNCamera.Constants.FlashMode.on}
            onBarCodeRead={this.onBarCodeRead}
          >
            <View style={styles.camera_preview_mask}>
              <View style={styles.box_top} />
              <View style={styles.box_center}>
                <View style={styles.box_center_left} />
                <Animated.View style={[styles.box_center_line,{transform: [{translateY: this.state.moveAnim}]}]}/>
                <View style={styles.box_center_right} />
              </View>
              <View style={styles.box_bottom} />
            </View>
          </RNCamera>*/}
        </View>
        <View style={styles.goods}>
          {
            this.state.goods.length === 0?
            (<View style={[c_styles.cell,c_styles.flex_center]}>
              <Text style={[c_styles.h4,c_styles.text_darkinfo]}>请扫码或手动添加商品！</Text>
            </View>) :
            (<View style={c_styles.cell}>
              <View style={[styles.goods_content]}>
                <ScrollView style={[{flex: 1}]} alwaysBounceVertical={true}>

                </ScrollView>
              </View>
              <View style={[styles.goods_bottom]}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({contentState: 3,isModalVisible: true});
                  }}
                  style={[{flex: 1}, c_styles.w_100, c_styles.flex_center]}>
                  <Text style={[c_styles.h4, c_styles.text_light]}>提交入库</Text>
                </TouchableOpacity>
              </View>
            </View>)
          }
        </View>
      </View>
    );
  }
  // 二维码动画
  startAnimation = () => {
    this.state.moveAnim.setValue(0);
    Animated.timing(
      this.state.moveAnim,
      {
        toValue: 120,
        duration: 5000,
        easing: Easing.linear,
      },
    ).start(() => this.startAnimation());
  };
  // 生命周期钩子
  componentDidMount() {
    this.startAnimation();
    // 初始化本地参数
    AsyncStorage.getItem('merchatCode').then((res) => {
      this.merchatCode = res ;
    });
    AsyncStorage.getItem('userCode').then((res) => {
      this.userId = res ;
    });
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
}
