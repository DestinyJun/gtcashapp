/**
 * desc：  超市收银
 * author：DestinyJun
 * date：  2020/3/23 22:08
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Slider,
  TouchableWithoutFeedback,
  Dimensions, StatusBar,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {supermarketScreenStyles} from './supermarketScreenStyles';
import GoodsInfoCard from '../bases/GoodsInfoCard';

// 变量定义
const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};
const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};
const landmarkSize = 2;

export default class supermarketScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 12,
      goods: [
        {title: '小辣狗',price: 1.5,numbers: 3,code: 154245184,unit: '500ml'},
        {title: '卤鸡爪',price: 8,numbers: 10,code: 154245184,unit: '500ml'},
        {title: '泡脚竹笋',price: 12,numbers: 5,code: 154245184,unit: '500ml'},
      ]
    };
  }

  render() {
    return (
      <View style={supermarketScreenStyles.container}>
        <StatusBar backgroundColor={'transparent'} animated={true} barStyle={'light-content'} translucent={true}/>
        <View style={[supermarketScreenStyles.camera]}>
          {/*<RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={supermarketScreenStyles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            onGoogleVisionBarcodesDetected={({barcodes}) => {
              console.log(barcodes);
            }}
          />*/}
        </View>
        <View style={[supermarketScreenStyles.shop]}>
          <View style={[supermarketScreenStyles.shop_content]}>
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
          <View style={[supermarketScreenStyles.shop_bottom]}>
            <View style={supermarketScreenStyles.shop_bottom_price}>
              <Text style={[c_styles.h5,c_styles.ml_5]}>
                合计金额：<Text style={c_styles.text_danger}>￥{this.state.totalPrice}</Text>
              </Text>
            </View>
            <View style={supermarketScreenStyles.shop_bottom_settle}>
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
  }
}
