/**
 * desc：  餐饮收银
 * author：DestinyJun
 * date：  2020/3/27 14:52
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StatusBar, ScrollView, Button} from 'react-native';
import {SettlementUI} from '../bases/SettlementUI'
import Modal from 'react-native-modal';
import {RepastScreenStyles} from "./RepastScreenStyles";
import {Icon} from 'react-native-elements';
import {GoodsInfoCard} from "../bases/GoodsInfoCard";
import {CollectionUI} from "../bases/CollectionUI";
import {PrintTicketUI} from "../bases/PrintTicketUI";
import {Icons} from "../bases/Icons";

export default class RepastScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tabData: [
            {label: '面食', bgColor: '#408B7C', bdColor: '#468F80', active: 1, tColor: '#fff'},
            {label: '盖饭', bgColor: '#FFFFFF', bdColor: '#EDEDED', active: 0, tColor: '#000'},
            {label: '炒饭', bgColor: '#FFFFFF', bdColor: '#EDEDED', active: 1, tColor: '#000'},
            {label: '饮料', bgColor: '#FFFFFF', bdColor: '#EDEDED', active: 0, tColor: '#000'},
        ],
        num: 2,
        amount: 222022999,
        isModalVisible: false,
        // 显示商品的模态款
        showShopModel: false,
        // 显示
        showpaymentModel: false,
        modalHeight: 0,
        goods: [
            {title: '红烧牛肉面', price: '15.00', numbers: 3, code: null, unit: ''},
            {title: '泡脚牛肉面', price: '15.00', numbers: 10, code: null, unit: ''},
            {title: '杂酱面', price: '15.00', numbers: 5, code: null, unit: ''},
            {title: '打卤面', price: '15.00', numbers: 5, code: null, unit: ''},
            {title: '打卤面', price: '15.00', numbers: 5, code: null, unit: ''},
            {title: '打卤面', price: '15.00', numbers: 5, code: null, unit: ''},
            {title: '打卤面', price: '15.00', numbers: 5, code: null, unit: ''},
        ],
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
            <ScrollView  alwaysBounceVertical={true}>
                {
                    this.state.tabData.map((value, index) => {
                        return (
                            <TouchableOpacity
                                style={[RepastScreenStyles.selectTab,
                                    {borderColor: value.bdColor , backgroundColor: value.bgColor}]}
                                onPress={() => this.TabChooseTogClick(index)}
                                key={index}>
                                {
                                    value.active === 1 ? <Icon type={'font-awesome'} name={'circle'} size={4} color={'red'} iconStyle={{marginLeft: '65%'}} /> : null

                                }
                                <Text style={[RepastScreenStyles.selectTabText, {color: value.tColor}]}>{value.label}</Text>
                            </TouchableOpacity>
                        )
                    })

                }
            </ScrollView>

        </View>
        <View style={RepastScreenStyles.right_content}>
              <Text style={RepastScreenStyles.title}>面食</Text>
              <ScrollView
                  style={[{flex: 1, backgroundColor: '#fff'}]}
                  alwaysBounceVertical={true}
              >
                  {
                      this.state.goods.map((item, index) => {
                          return (
                              <GoodsInfoCard
                                  key={index}
                                  queue={-1} title={item.title}
                                  price={item.price} code={item.code}
                                  unit={item.unit} numbers={item.numbers}
                                  change={this.totalPriceOperate}
                                  isClear={false}
                              />
                          );
                      })
                  }
              </ScrollView>
          </View>
          {
              // 判断是否显示商品
              this.state.showShopModel === true ?
                  <View style={[RepastScreenStyles.modal_contnet, {bottom: '8%'}]}>
                      <Modal
                          coverScreen={false}
                          deviceHeight={400}
                          isVisible={this.state.isModalVisible}
                          onBackButtonPress={() => {
                              this.setState({
                                  isModalVisible: false
                              })
                          }}
                          style={[c_styles.justify_end, c_styles.m_clear]}
                      >
                          <View style={{height: '50%', backgroundColor: '#fff'}}>
                              <View style={RepastScreenStyles.model_title}>
                                  <View style={{flex: 1}}>
                                      <Icons iconName={'angle-left'} size={30} color={'black'}/>
                                  </View>
                                  <Text style={{flex: 1.5, fontSize: 18}}>已选菜品</Text>
                              </View>
                              <ScrollView>
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
                      </Modal>
                  </View>
                  : null
          }
          {
              //  结算模态框
              this.state.showpaymentModel === true?
               <View style={RepastScreenStyles.modal_contnet}>
                  <Modal
                      coverScreen={false}
                      // deviceHeight={400}
                      isVisible={this.state.isModalVisible}
                      onBackButtonPress={()=>{
                          this.setState({
                              isModalVisible: false
                          })
                      }}
                      style={[c_styles.justify_end, c_styles.m_clear]}
                  >
                      <CollectionUI
                          amount={this.state.amount}
                          pay_type={this.state.btnData}
                          sure_text ={'确认收款成功'}
                          payTypeClick={this.payTypeClick}
                          closeModel={this.payTypeClick}
                          sureColletion={this.sureColletion}/>
                      <PrintTicketUI
                          closeModel={this.closeModel}
                          text ={'订单支付成功！是否打印小票？'}
                          printTicket={this.printTicket}/>
                  </Modal>
              </View> : null
          }
        <View style={RepastScreenStyles.bottom_price}>
              {/*<Text style={RepastScreenStyles.title}>123</Text>*/}
            <SettlementUI num={this.state.num} amount={this.state.amount} Settlement={this.settlementClick} showListModal={this.showListModal}/>
          </View>
      </View>
    );
  }


  componentDidMount(): void {
      console.log(this.props.navigation);
  }
  // 切换选项卡
  TabChooseTogClick(index){
      let tabdata = this.state.tabData;
      console.log(tabdata);
      tabdata.forEach(v => {
          v.bgColor = '#FFFFFF';
          v.bdColor = '#EDEDED';
          v.tColor = '#000';
          // v.active = 0
      });
      tabdata[index].bdColor = '#468F80';
      tabdata[index].bgColor = '#408B7C';
      tabdata[index].tColor = '#fff';
      this.setState(
          {
              tabData: tabdata
          }
      )
  }
  // 结算
  settlementClick = () => {
      this.setState({
          showShopModel: true
      })
  };
  // 展示模态框
  showListModal = () => {
      console.log(1234);
      // if (!this.state.showShopModel){
      //     this.setState({
      //         showShopModel: false
      //     })
      //
      // }else {
      //
      // }
      this.setState({
          showShopModel: true
      })
   };
  payTypeClick = (index) => {
      let data = this.state.btnData;
       data.forEach(v=>{
           v.bgcolor = '#fff';
           v.tColor = '#56988B'
       });
       data[index].bgcolor = '#56988B';
       data[index].tColor = '#fff';
       this.setState({
           btnData: data
       });
  };
    closeModel= () =>{
      console.log('123')
    };
  sureColletion = () => {
    console.log('收款');
  };
    printTicket = () => {
        console.log('打印');
    };
  totalPriceOperate(item){
        // let goods = {...item};
        console.log(item);
    }
}
