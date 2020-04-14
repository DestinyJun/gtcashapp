/**
 * desc：  新增无条码商品页
 * author：DestinyJun
 * date：  2020/4/8 17:19
 */
import React, {Component} from 'react';
import {View, TextInput, TouchableOpacity, Text, ToastAndroid, ScrollView} from 'react-native';
// 工具
import {AddCodeGoodsScreenStyles as styles} from './AddCodeGoodsScreenStyles';
import AsyncStorage from '@react-native-community/async-storage';
import {post} from '../../service/Interceptor';
import Api from '../../service/Api';
// 第三方组件
import {SelectInput} from '../bases/SelectInput';
import {CheckBox} from 'react-native-elements';

export class AddCodeGoodsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: null,
      goodsTypes: null,
      checked: false,
    };
    this.inputList = [
      {name: '商品条码', key: 'goodsCode', placeholder: '请输入商品条码'},
      {name: '商品名称', key: 'goodsName', placeholder: '请输入商品名称'},
      {name: '单位', key: 'company', placeholder: '请输入单位'},
      {name: '单价', key: 'unitPrice', placeholder: '请输入单价'},
      {name: '进价', key: 'purchasePrice', placeholder: '请输入进价'},
    ];
    this.inputListPro = [
      {name: '包含商品码', key: 'containGoodsCode', placeholder: '请输入商品码'},
      {name: '容量', key: 'capacity', placeholder: '请输入容量'},
      {name: '容量单位', key: 'capacityCompany', placeholder: '请输入容量单位'},
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
      haveCapacity: 0,
      containGoodsCode: null,
      capacity: null,
      capacityCompany: null,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          <ScrollView style={[{flex: 1}, c_styles.bg_white, c_styles.pl_3, c_styles.pr_3]}>
            {
              this.inputList.map((item, index) => {
                return (
                  <View style={styles.list_content} key={index}>
                    <Text style={styles.list_content_text}>{item.name}</Text>
                    <View style={[{flex: 1}]}>
                      <TextInput
                        keyboardType={item.key === 'unitPrice' || item.key === 'purchasePrice' || item.key === 'goodsCode' ? 'numeric' : 'default'}
                        style={styles.list_content_input}
                        onChangeText={(text) => {
                          this.addGood[item.key] = text;
                        }}
                        placeholderTextColor={'#C5C5C5'}
                        placeholder={item.placeholder}
                      />
                    </View>
                  </View>
                );
              })
            }
            <View style={styles.list_content}>
              <Text style={styles.list_content_text}>商品种类</Text>
              <View style={[{flex: 1, marginRight: -10}]}>
                <SelectInput
                  btnTitle={'请选择商品种类'}
                  btnTitleSize={20}
                  btnTitleColor={'#CBCBCB'}
                  activeOptionBgColor={'#468F80'}
                  selectOptionTextColor={'#001629'}
                  activeSelectOptionTextColor={'white'}
                  selectOptionStyles={styles.selectOptionStyles}
                  containerStyles={styles.selectContainerStyles}
                  selectContainerHeight={150}
                  options={this.state.goodsTypes}
                  selectChange={(res) => {
                    this.addGood.goodsType = res.value;
                  }}
                />
              </View>
            </View>
            <View style={styles.list_content}>
              <Text style={styles.list_content_text}>是否拥有容量</Text>
              <View style={[{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}]}>
                <CheckBox
                  center
                  title={'是'}
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  checked={this.state.checked}
                  onPress={() => {
                    this.setState({checked: !this.state.checked});
                  }}
                />
                <CheckBox
                  center
                  title={'否'}
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  checked={!this.state.checked}
                  onPress={() => {
                    this.setState({checked: !this.state.checked});
                  }}
                />
              </View>
            </View>
            {
              this.inputListPro.map((item, index) => {
                return (
                  <View style={styles.list_content} key={index}>
                    <Text style={styles.list_content_text}>{item.name}</Text>
                    <View style={[{flex: 1}]}>
                      <TextInput
                        keyboardType={item.key === 'capacity' || item.key === 'containGoodsCode'? 'numeric' : 'default'}
                        style={styles.list_content_input}
                        editable={this.state.checked}
                        onChangeText={(text) => {
                          this.addGood[item.key] = text;
                        }}
                        placeholderTextColor={'#C5C5C5'}
                        placeholder={item.placeholder}
                      />
                    </View>
                  </View>
                );
              })
            }
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.bottom} onPress={this.onSubmit}>
          <Text style={[c_styles.h4, c_styles.text_white]}>确认新增</Text>
        </TouchableOpacity>
      </View>
    );
  }

  componentDidMount(): void {
    AsyncStorage.getItem('merchatCode')
      .then((res) => {
        this.addGood.merchatCode = res;
      })
      .catch();
    post(Api.STORE_GOODS_TYPE, {})
      .then((res) => {
        const type = [];
        if (res.data.length > 0) {
          res.data.forEach((item) => {
            type.push(Object.assign({}, {value: item.sysCode, name: item.sysName}));
          });
        }
        this.setState({
          goodsTypes: type,
        });
      })
      .catch((err) => {
        ToastAndroid.show(err.msg, 1000);
      });
  }

  onSubmit = () => {
    this.state.checked ? this.addGood.haveCapacity = 1 : this.addGood.haveCapacity = 0;
    console.log(this.addGood);
    post(Api.STORE_ADD_NO_CODE, this.addGood)
      .then((res) => {
        ToastAndroid.show(res.msg, 1000);
        this.props.navigation.goBack();
      })
      .catch((err) => {
        ToastAndroid.show(err.msg, 1000);
      });
  };
}
