/**
 * desc：  餐饮收银
 * author：DestinyJun
 * date：  2020/3/27 14:52
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StatusBar, ScrollView, ToastAndroid } from 'react-native';
import Modal from 'react-native-modal';
import {RepastScreenStyles} from "./RepastScreenStyles";
import {Icon} from 'react-native-elements';
import {Icons} from "../bases/Icons";
// 自定义组件
import {GoodsInfoCard} from "../bases/GoodsInfoCard";
import {CollectionUI} from "../bases/CollectionUI";
import {PrintTicketUI} from "../bases/PrintTicketUI";
import {SettlementUI} from '../bases/SettlementUI'

// 自定义工具 请求
import {post} from "../../service/Interceptor";
import api from '../../service/Api';
import AsyncStorage from "@react-native-community/async-storage";
import {LocalStorage} from "../../util";

export default class RepastScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabMenuData: [],
      // 菜品个数
      num: 0,
      // 菜品总金额
      amount: 0,
      // 菜品类型的名字
      disheName: '全部',
      // 显示商品的模态款
      showShopModel: false,
      // 显示支付
      showPaymentModel: false,
      // 结算类型
      showPayModel: true,
      // 菜品数据
      dishesList: [],
      // 已选菜品
      selectedDishesList: [],

      payMentType: '',
      btnData: [
        {label: '现金支付', tcolor: '#56988B', bgcolor: '#fff', value: '1'},
        {label: '网上支付', tcolor: '#56988B', bgcolor: '#fff', value: '2'}
      ]
    };
    this.props.navigation.setOptions({
      title: '餐饮收银',
    });
  }

  render() {
    return (
      <View>
        <View style={RepastScreenStyles.left_tab}>
          <ScrollView alwaysBounceVertical={true}>
            {
              this.state.tabMenuData.map((value, index) => {
                return (
                  <TouchableOpacity
                    style={[RepastScreenStyles.selectTab,
                      {borderColor: value.bdColor, backgroundColor: value.bgColor}]}
                    onPress={() => this.TabChooseTogClick(index)}
                    key={index}>
                    {
                      value.active === 1 ? <Icon type={'font-awesome'} name={'circle'} size={4} color={'red'}
                                                 iconStyle={{marginLeft: '65%'}}/> : null

                    }
                    <Text style={[RepastScreenStyles.selectTabText, {color: value.tColor}]}>{value.label}</Text>
                  </TouchableOpacity>
                )
              })

            }
          </ScrollView>

        </View>
        <View style={RepastScreenStyles.right_content}>
          <Text style={RepastScreenStyles.title}>{this.state.disheName}</Text>
          <ScrollView
            style={[{flex: 1, backgroundColor: '#fff'}]}
            alwaysBounceVertical={true}
          >
            {
              this.state.dishesList.map((item, index) => {
                return (
                  <GoodsInfoCard
                    key={index}
                    queue={index + 1} title={item.title}
                    price={item.price} code={item.code}
                    unit={item.unit} numbers={item.numbers}
                    change={this.totalPriceOperate}
                    isClear={false} isqueue={false}
                    symbol={'original'}
                  />
                );
              })
            }
          </ScrollView>
        </View>
        {
          // 判断是否显示商品
          this.state.showShopModel ?
            <View style={[RepastScreenStyles.modal_contnet, {bottom: '8%'}]}>
              <Modal
                coverScreen={false}
                deviceHeight={400}
                isVisible={true}
                style={[c_styles.justify_end, c_styles.m_clear]}
              >
                <View style={{height: '50%', backgroundColor: '#fff'}}>
                  <View style={RepastScreenStyles.model_title}>
                    <TouchableOpacity style={{flex: 1}} onPress={this.hiddenShopModel}>
                      <Icons iconName={'angle-left'} size={30} color={'black'}/>
                    </TouchableOpacity>
                    <Text style={{flex: 1.5, fontSize: 18}}>已选菜品</Text>
                  </View>
                  <ScrollView>
                    {
                      this.state.selectedDishesList.map((item, index) => {
                        return (
                          <GoodsInfoCard
                            key={index}
                            queue={index + 1} title={item.title}
                            price={item.price} code={item.code}
                            unit={item.unit} numbers={item.numbers}
                            change={this.totalPriceOperate}
                            isClear={true} symbol={'select'}
                          />
                        );
                      })
                    }
                  </ScrollView>
                </View>
              </Modal>
            </View>
            : null
        }
        {
          //  结算模态框
          this.state.showPaymentModel ?
            <View style={RepastScreenStyles.modal_contnet}>
              <Modal
                coverScreen={false}
                // deviceHeight={400}
                isVisible={true}
                style={[c_styles.justify_end, c_styles.m_clear]}
              >
                {
                  this.state.showPayModel ?
                    <CollectionUI
                      amount={this.state.amount}
                      pay_type={this.state.btnData}
                      sure_text={'确认收款成功'}
                      payTypeClick={this.payTypeClick}
                      closeModel={this.closeModel}
                      sureColletion={this.sureColletion}/> :
                    <PrintTicketUI
                      closeModel={this.closeModel}
                      text={'订单支付成功！是否打印小票？'}
                      printTicket={this.printTicket}/>
                }
              </Modal>
            </View> : null
        }
        <View style={RepastScreenStyles.bottom_price}>
          {/*<Text style={RepastScreenStyles.title}>123</Text>*/}
          <SettlementUI
            num={this.state.num}
            amount={this.state.amount}
            Settlement={this.settlementClick}
            showListModal={this.showListModal}
          />
        </View>
      </View>
    );
  }


  componentDidMount(): void {
    // console.log(32);
    this.getAllDishData();
    return post(api.GET_MENU_TYPE, {}).then(val => {
      let list = [];
      val.forEach((res) => {
        list.push({
          label: res.goodsTypeName,
          bgColor: '#FFFFFF',
          bdColor: '#EDEDED',
          active: 0,
          tColor: '#000',
          code: res.goodsTypeCode
        })
        // }
      });
      this.setState({
        tabMenuData: list
      });
    });
  }
  // 获取所有的菜品
  getAllDishData() {
    AsyncStorage.getItem('merchatCode').then(val => {
      return post(api.GET_DISHES_ALL_LIST, {merchatCode: val, pageNum: 1, pageSize: 100}).then(val => {
        let diesList = [];
        console.log(val);

        if (val !== null){
          val.forEach(v => {
            diesList.push({id: v.id, title: v.goodsName, price: v.unitPrice, numbers: 0, code: null, unit: ''})
          });
        }
        this.setState({
          dishesList: diesList
        });
      });
    });

  }
  //  根据菜品；类型获取菜品
  getDishListForMenuType(typeName){
    AsyncStorage.getItem('merchatCode').then(val => {
      return post(api.GET_DISHES_LIST, {restaurantType: typeName, merchatCode: val, pageNum: 1, pageSize: 100}).then(val => {
        let diesList = [];
        if (val !== null){
          val.forEach(v => {
            diesList.push({id: v.id, title: v.goodsName, price: v.unitPrice, numbers: 0, code: null, unit: ''})
          });
        }
        this.setState({
          dishesList: diesList
        });
      });
    });
  }
  // 确认的收款
  sureDateAndSubmit(diesList){
    let merchatCode = '';
    // 获取 数据
    AsyncStorage.getItem('merchatCode').then(val =>{
      merchatCode = val;
      return AsyncStorage.getItem('userId')
    }).then(res => {
      // 请求收款
      return post(api.PAY_MONEY, {
          payType: this.state.payMentType,
          merchatCode: merchatCode,
          date: diesList,
          userId: res
      }).then(val => {
        // 重置数据
        let data = this.state.dishesList;
        data.forEach(v => {
          v.numbers = 0;
        });
        this.setState({
          showPayModel: false,
          selectedDishesList: [], // 置空选择的菜品数据
          num: 0, // 置空选择数量
          amount: 0, // 置空金额
          dishesList: data // 置空菜品的数量
        });
      })
    });
  }
  // 切换选项卡
  TabChooseTogClick(index) {
    let tabMenuData = this.state.tabMenuData;
    console.log(tabMenuData);
    tabMenuData.forEach(v => {
      v.bgColor = '#FFFFFF';
      v.bdColor = '#EDEDED';
      v.tColor = '#000';
      // v.active = 0
    });
    tabMenuData[index].bdColor = '#468F80';
    tabMenuData[index].bgColor = '#408B7C';
    tabMenuData[index].tColor = '#fff';
    this.getDishListForMenuType(tabMenuData[index].code);
    this.setState(
      {
        tabMenuData: tabMenuData,
        disheName: tabMenuData[index].label
      }
    )
  }

  // 结算
  settlementClick = () => {
    //显示结算的模态窗
    if (this.state.selectedDishesList.length !== 0){
      this.setState({
        showShopModel: false,
        showPaymentModel: true
      })
    }else {
      ToastAndroid.showWithGravity('您还未选择菜品', ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
  };
  // 隐藏商品弹窗
  hiddenShopModel = () => {
    this.setState({
      showShopModel: false,
    })
  };
  // 展示模态框
  showListModal = () => {
    // 切换展示模态框
    if (this.state.showShopModel) {
      this.setState({
        showShopModel: false,
      })
    } else {
      this.setState({
        showShopModel: true,
      })
    }

  };
  // 支付类型切换
  payTypeClick = (index) => {
    let data = this.state.btnData;
    data.forEach(v => {
      v.bgcolor = '#fff';
      v.tColor = '#56988B'
    });
    data[index].bgcolor = '#56988B';
    data[index].tColor = '#fff';
    this.setState({
      btnData: data,
      payMentType: data[index].label
    });
  };
  // 关闭窗口重置数据
  closeModel = () => {
    // 重置选择的数据
    let data = this.state.btnData;
    data.forEach(v => {
      v.bgcolor = '#fff';
      v.tColor = '#56988B'
    });
    this.setState({
      showPayModel: true, //重置显示框
      showPaymentModel: false,
      btnData: data  //重置数据
    })
  };
  //  确认收款
  sureColletion = () => {
    if (this.state.payMentType !== '') {
       let diesList = [];
       this.state.selectedDishesList.forEach(value => {
          diesList.push({id: value.id, num: value.numbers})
      });
      this.sureDateAndSubmit(diesList);
    }else {
      ToastAndroid.showWithGravity('请选择支付方式', ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
  };

  printTicket() {
    ToastAndroid.showWithGravity('您好，您当前在移动端，无法打印单据', ToastAndroid.SHORT, ToastAndroid.CENTER);
  }
  // 选择需要添加的菜品
  totalPriceOperate = (item) => {
    console.log(item);
    // 获取菜品个数
    let num = 0;
    let amount = 0;
    // 获取已经选择的菜品
    let selList = this.state.selectedDishesList;
    // 获取刚选择的菜品
    let diesList = this.state.dishesList;

    // 判断在魔板里面修改
    if (item.symbol === 'original'){
      if (item.type === 'add'){
        diesList[item.index].numbers = item.numbers;
        // 判断该菜品是否存在
        if (!selList.some(val => {
          return val.title === diesList[item.index].title;
        })) {
          selList.push(diesList[item.index]);
        }
      }else {
        // 判断为减的时候
        diesList[item.index].numbers = item.numbers;
        // 判断该菜品是否存在
        if (item.numbers === 0){
          selList.forEach((v, index1) => {
             if(diesList[item.index].title === v.title){
                selList.splice(index1 , 1)
             }
          });
        }else {
          diesList[item.index].numbers = item.numbers;
        }

      }

    }else {
      // 判断在模态框里面修改
      if (item.type === 'add'){
        selList[item.index].numbers = item.numbers;
        // selList.forEach(v =>)
        diesList.forEach( (v, dies_index)=> {
          if (v.title === selList[item.index].title){
            diesList[dies_index].numbers =   selList[item.index].numbers;
          }
        })
      }else {
        // 判断为减的时候
        selList[item.index].numbers = item.numbers;
        // selList.forEach(v =>)
        diesList.forEach( (v, dies_index)=> {
          if (v.title === selList[item.index].title){
            diesList[dies_index].numbers = selList[item.index].numbers;
          }
        });
        // 减为0后置空
        if (item.numbers === 0){
          selList.splice(item.index, 1)
        }
      }
    }
    // 重新计算复制
    selList.forEach(v => {
      num = num + v.numbers;
      amount = amount + (v.numbers * v.price);
    });
    // 存在就直接赋值
    this.setState({
      selectedDishesList: selList,
      num: num,
      amount: amount
    });

  }
}
