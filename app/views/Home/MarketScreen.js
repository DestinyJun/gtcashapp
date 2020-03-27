/**
 * desc：  超市收银
 * author：DestinyJun
 * date：  2020/3/23 22:08
 */
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar, Animated, Easing,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {MarketScreenStyles} from './MarketScreenStyles';
import GoodsInfoCard from '../bases/GoodsInfoCard';
export default class MarketScreen extends Component {
  constructor(props) {
    super(props);
    this.isScan = true;
    this.state = {
      totalPrice: 12,
      goods: [
        {title: '小辣狗',price: 1.5,numbers: 3,code: 154245184,unit: '500ml'},
        {title: '卤鸡爪',price: 8,numbers: 10,code: 154245184,unit: '500ml'},
        {title: '泡脚竹笋',price: 12,numbers: 5,code: 154245184,unit: '500ml'},
      ],
      moveAnim: new Animated.Value(0),
    };
  }

  render() {
    return (
      <View style={MarketScreenStyles.container}>
        <StatusBar backgroundColor={'transparent'} animated={true} barStyle={'light-content'} translucent={true}/>
        <View style={[MarketScreenStyles.camera]}>
          <RNCamera
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
          </RNCamera>
        </View>
        <View style={[MarketScreenStyles.shop]}>
          <View style={[MarketScreenStyles.shop_content]}>
            {
              this.state.goods.map((item,index) => {
                return (
                  <GoodsInfoCard
                    key={index}
                    queue={index+1} title={item.title}
                    price={item.price} code={item.code}
                    unit={item.unit} numbers={item.numbers}
                    change={this.totalPriceOperate}
                  />
                )
              })
            }

          </View>
          <View style={[MarketScreenStyles.shop_bottom]}>
            <View style={MarketScreenStyles.shop_bottom_price}>
              <Text style={[c_styles.h5,c_styles.ml_5]}>
                合计金额：<Text style={c_styles.text_danger}>￥{this.state.totalPrice}</Text>
              </Text>
            </View>
            <View style={MarketScreenStyles.shop_bottom_settle}>
              <TouchableOpacity
                onPress={this.takePicture.bind(this)}
                style={[{flex: 1},c_styles.w_100,c_styles.flex_center]}>
                <Text style={[c_styles.h5,c_styles.text_light]}>结算</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
  componentDidMount() {
    this.startAnimation();
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
        easing: Easing.linear
      }
    ).start(() => this.startAnimation());
  };
  //  识别二维码
  onBarCodeRead = (result) => {
    if (this.isScan) {
      this.isScan = false;
      console.log(result.data);
      this.timer = setTimeout(() => {
        this.isScan = true;
      },1000)
    }
  };
  componentWillUnmount() {
    // this.deEmiter.remove();
    clearInterval(this.timer);
  }
}
