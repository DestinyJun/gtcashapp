/**
 * desc：  新增无条码商品页
 * author：DestinyJun
 * date：  2020/4/8 17:19
 */
import React, {Component} from 'react';
import {View, TextInput, TouchableOpacity, Text, ToastAndroid} from 'react-native';
import {AddNoCodeGoodsScreenStyles as styles} from './AddNoCodeGoodsScreenStyles';
import AsyncStorage from '@react-native-community/async-storage';

export class AddNoCodeGoodsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: null
    };
    this.inputList = [
      {name: '商品条码',key: 'goodsCode',placeholder: '请输入商品条码'},
      {name: '商品名称',key: 'goodsName',placeholder: '请输入商品名称'},
      {name: '单位',key: 'company',placeholder: '请输入单位'},
      {name: '单价',key: 'unitPrice',placeholder: '请输入单价'},
      {name: '进价',key: 'purchasePrice',placeholder: '请输入进价'},
      {name: '商品种类',key: 'goodsType',placeholder: '请选择商品种类'},
    ];
    this.addGood = {
      id: -1,
      goodsCode: null,
      goodsName: null,
      merchatCode: null,
      company: null,
      unitPrice: null,
      purchasePrice: null,
      goodsType: null,
    };

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          {
            this.inputList.map((item,index) => {
              return (
                <View  style={styles.list_content} key={index}>
                  <Text style={styles.list_content_text}>{item.name}</Text>
                  <TextInput
                    keyboardType={item.key === 'unitPrice' || item.key === 'purchasePrice'?'numeric':'default'}
                    style={styles.list_content_input}
                    onChangeText={(text)=>{this.addGood[item.key] = text}}
                    placeholderTextColor={'#C5C5C5'}
                    placeholder={item.placeholder}
                  />
                </View>
              )
            })
          }
        </View>
        <TouchableOpacity style={styles.bottom} onPress={() => {console.log(this.addGood)}}>
          <Text style={[c_styles.h4,c_styles.text_white]}>确认新增</Text>
        </TouchableOpacity>
      </View>
    );
  }
  componentDidMount(): void {
    AsyncStorage.getItem('merchatCode')
      .then((res) => {
        this.addGood.merchatCode = res;
      })
      .catch()
  }
}
