/**
 * desc：  超市收银
 * author：DestinyJun
 * date：  2020/3/23 22:08
 */
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity, Button, TextInput,
  StatusBar, Animated, Easing, ScrollView, Dimensions, Keyboard, KeyboardAvoidingView
} from 'react-native';
import {MarketScreenStyles} from './MarketScreenStyles';
// 自定义组件
import {Icons} from '../bases/Icons';
import {NumberKeyboard} from '../bases/NumberKeyboard';
import {GoodsInfoCard} from '../bases/GoodsInfoCard';
// 第三方组件
import {RNCamera} from 'react-native-camera';
import { Input } from 'react-native-elements';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import {event} from 'react-native-reanimated';



export default class MarketScreen extends Component {
  constructor(props) {
    super(props);
    this.isScan = true;
    this.state = {
      totalPrice: 12,
      isModalVisible: true,
      goods: [
        {title: '小辣狗', price: 1.5, numbers: 3, code: 154245184, unit: '500ml'},
        {title: '卤鸡爪', price: 8, numbers: 10, code: 154245184, unit: '500ml'},
        {title: '泡脚竹笋', price: 12, numbers: 5, code: 154245184, unit: '500ml'},
        {title: '泡脚竹笋', price: 12, numbers: 5, code: 154245184, unit: '500ml'},
        {title: '泡脚竹笋', price: 12, numbers: 5, code: 154245184, unit: '500ml'},
        {title: '泡脚竹笋', price: 12, numbers: 5, code: 154245184, unit: '500ml'},
        {title: '泡脚竹笋', price: 12, numbers: 5, code: 154245184, unit: '500ml'},
        {title: '泡脚竹笋', price: 12, numbers: 5, code: 154245184, unit: '500ml'},
        {title: '泡脚竹笋', price: 12, numbers: 5, code: 154245184, unit: '500ml'},
      ],
      moveAnim: new Animated.Value(0), // 扫动条动画
    };
    this.props.navigation.setOptions({
      title: '超市收银',
      headerRightContainerStyle: {},
      headerRight: () => {
        return (
          <TouchableOpacity
            style={[c_styles.pl_3, {width: 100}]}
            onPress={this.searchModalToggle}
          >
            <Text style={[c_styles.text_light, c_styles.h5]}>手动查询</Text>
          </TouchableOpacity>
        );
      },
    });
  }

  render() {
    return (
      <View style={MarketScreenStyles.container}>
        <View style={[MarketScreenStyles.camera]}>
          {/*  <RNCamera
            ref={ref => {this.camera = ref}}
            style={MarketScreenStyles.camera_preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            onBarCodeRead={this.onBarCodeRead}
          >
            <View style={MarketScreenStyles.camera_preview_mask}>
              <View style={MarketScreenStyles.box_top} />
              <View style={MarketScreenStyles.box_center}>
                <View style={MarketScreenStyles.box_center_left} />
                <Animated.View style={[MarketScreenStyles.box_center_line,{transform: [{translateY: this.state.moveAnim}]}]}/>
                <View style={MarketScreenStyles.box_center_right} />
              </View>
              <View style={MarketScreenStyles.box_bottom} />
            </View>
          </RNCamera>*/}
        </View>
        <View style={[MarketScreenStyles.shop]}>
          <View style={[MarketScreenStyles.shop_content]}>
            <ScrollView
              style={[{flex: 1}]}
              alwaysBounceVertical={true}
            >
              {
                this.state.goods.map((item, index) => {
                  return (
                    <GoodsInfoCard
                      key={index}
                      queue={index + 1} title={item.title}
                      price={item.price} code={item.code}
                      unit={item.unit} numbers={item.numbers}
                      change={this.totalPriceOperate}
                    />
                  );
                })
              }
            </ScrollView>
          </View>
          <View style={[MarketScreenStyles.shop_bottom]}>
            <View style={MarketScreenStyles.shop_bottom_price}>
              <Text style={[c_styles.h5, c_styles.ml_5]}>
                合计金额：<Text style={c_styles.text_danger}>￥{this.state.totalPrice}</Text>
              </Text>
            </View>
            <View style={MarketScreenStyles.shop_bottom_settle}>
              <TouchableOpacity
                onPress={this.takePicture.bind(this)}
                style={[{flex: 1}, c_styles.w_100, c_styles.flex_center]}>
                <Text style={[c_styles.h5, c_styles.text_light]}>结算</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* 查询商品模态框*/}
        <Modal
          isVisible={this.state.isModalVisible}
          backdropOpacity={0.5}
          style={[c_styles.justify_end, c_styles.m_clear]}
        >
          <View style={[c_styles.h_50, c_styles.bg_white]}>
            <View style={MarketScreenStyles.search_modal_header}>
              <TouchableOpacity style={[MarketScreenStyles.search_modal_header_left]} onPress={this.searchModalToggle}>
                <Icon name={'angle-left'} size={35} color={'#1A1A1A'}/>
              </TouchableOpacity>
              <Text style={[c_styles.h4,c_styles.cell,c_styles.text_center]}>手动查询商品</Text>
            </View>
            <View style={MarketScreenStyles.search_modal_keyboard}>
              <NumberKeyboard enterChange={this.searchModalInputChange}/>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };
  totalPriceOperate = (item) => {
    let goods = {...item};
    console.debug(goods);
  };
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
  //  识别二维码
  onBarCodeRead = (result) => {
    if (this.isScan) {
      this.isScan = false;
      console.log(result.data);
      this.timer = setTimeout(() => {
        this.isScan = true;
      }, 1000);
    }
  };
  // 搜索商品弹窗切换
  searchModalToggle = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  // 根据商品编号搜索商品编号
  searchModalInputChange = (value) => {
    console.log(value);
  };
  // 生命周期钩子
  componentDidMount() {
    this.startAnimation();
  }
  componentWillUnmount() {
    // this.deEmiter.remove();
    clearInterval(this.timer);
    // this.keyboardDidShowListener.remove();
  }
}
