import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {MarketScreenStyles} from "../Home/MarketScreenStyles";
import {Icon, Badge} from 'react-native-elements';
import {StyleSheet} from 'react-native';
const SettlementStyles = StyleSheet.create({
    shop_bottom_content: {
        // width: '100%',
        // height: '100%',
        flex: 1,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#ECEFEE',
        borderStyle: 'solid',
        paddingLeft: '2%'
        // backgroundColor: 'red',
    },
    shop_bottom_price: {
        flex: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    shop_bottom_settle: {
        flex: 2,
        // height: '10%',
        backgroundColor: '#468F80',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
export class SettlementUI extends Component{
      render(){
          return (
              <View style={SettlementStyles.shop_bottom_content}>
                  <View style={SettlementStyles.shop_bottom_price}>
                      <Icon type={'font-awesome'} name={'shopping-cart'} size={30} color={'#E6E6E6'} onPress={this.props.showListModal}/>
                      {
                        this.props.num !== 0?
                          <Badge
                            status="error"
                            value={this.props.num}
                            textStyle={{fontSize: 10}}
                            containerStyle={{top: '-4%', left: '-20%'}}
                        />: <View style={[{width: '5%'}]} />
                      }
                      <Text  style={[c_styles.h5, c_styles.ml_1, {flex: 4}]}>
                        合计金额：<Text style={[c_styles.text_danger, c_styles.h5]}>￥{this.props.amount.toFixed(2)}</Text>
                      </Text>
                  </View>
                  {/*<View style={{flex: 1}}>*/}
                  {/*</View>*/}
                  <View style={SettlementStyles.shop_bottom_settle}>
                      <TouchableOpacity
                          onPress={this.props.Settlement}
                          style={[{flex: 1}, c_styles.w_100, c_styles.flex_center]}>
                          <Text style={[c_styles.h5, c_styles.text_light]}>结   算</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          )
      }
}
