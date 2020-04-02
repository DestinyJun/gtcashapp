/**
 * desc：  餐饮收银
 * author：DestinyJun
 * date：  2020/3/27 14:52
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StatusBar, ScrollView, Button} from 'react-native';
import SettlementUI from '../bases/SettlementUI'
import Modal from 'react-native-modal';
import {RepastScreenStyles} from "./RepastScreenStyles";
import {Icon} from 'react-native-elements';
import {GoodsInfoCard} from "../bases/GoodsInfoCard";
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
        isModalVisible: true,
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
          {/*s商品模态框*/}
          <View style={[RepastScreenStyles.modal_contnet , {bottom:'8%'}]}>
              {/*/!*遮罩层*!/*/}
              {/*<View  style={{height: 50 + '%', backgroundColor: 'rgba(75,75,75, 0.7)'}} />*/}
              {/*/!*内 容*!/*/}
              {/*<View  style={{height: 50 + '%', backgroundColor: '#fff'}}>*/}

              {/*</View>*/}
              {/*{*/}
              {/*    isModalVisible ? */}
              {/*}*/}

              {/*<Modal*/}
              {/*    coverScreen={false}*/}
              {/*    deviceHeight={400}*/}
              {/*    isVisible={this.state.isModalVisible}*/}
              {/*    onBackButtonPress={()=>{*/}
              {/*        this.setState({*/}
              {/*            isModalVisible: false*/}
              {/*        })*/}
              {/*    }}*/}
              {/*    style={[c_styles.justify_end, c_styles.m_clear]}*/}
              {/*>*/}
              {/*    <View style={{height: '50%', backgroundColor: '#fff'}}>*/}
              {/*      <View style={RepastScreenStyles.model_title}>*/}
              {/*          <View style={{flex: 1}}>*/}
              {/*              <Icons iconName={'angle-left'} size={30} color={'black'}/>*/}
              {/*          </View>*/}
              {/*          <Text style={{flex: 1.5, fontSize: 18}}>已选菜品</Text>*/}
              {/*      </View>*/}
              {/*      <ScrollView>*/}
              {/*          {*/}
              {/*              this.state.goods.map((item, index) => {*/}
              {/*                  return (*/}
              {/*                      <GoodsInfoCard*/}
              {/*                          key={index}*/}
              {/*                          queue={index+1} title={item.title}*/}
              {/*                          price={item.price} code={item.code}*/}
              {/*                          unit={item.unit} numbers={item.numbers}*/}
              {/*                          change={this.totalPriceOperate}*/}
              {/*                      />*/}
              {/*                  );*/}
              {/*              })*/}
              {/*          }*/}
              {/*      </ScrollView>*/}
              {/*    </View>*/}
              {/*</Modal>*/}

          </View>
          {/*结算模态框*/}
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
                  <View style={{height: '56%', backgroundColor: '#fff'}}>
                      <View style={RepastScreenStyles.model_title}>
                          <TouchableOpacity style={{position:'absolute',left:'2%'}} onPress={this.showListModal}>
                              <Icons iconName={'angle-left'} size={30} color={'black'} />
                          </TouchableOpacity>
                          <Text style={{fontSize: 18}}>结算</Text>
                      </View>
                      <View style={RepastScreenStyles.model_amount}>
                          <Text style={{color: 'red', fontSize: 38,marginRight: '4%'}}>￥{this.state.amount.toFixed(2)}</Text>
                      </View>
                      <View style={{  flexDirection: 'row',alignItems: 'center',paddingLeft: '2%', paddingRight: '2%',marginTop:'2%'}}>
                          <Text style={{width: '40%',backgroundColor:'#D3D3D3',height: 1,marginRight: '2%'}}></Text>
                          <Text>支付方式</Text>
                          <Text style={{width: '40%',backgroundColor:'#D3D3D3',height: 1,marginLeft: '2%'}}></Text>
                      </View>
                      <View  style={{alignItems: 'center',marginTop:'4%',justifyContent: 'center', height: '36%'}}>
                          <Text style={RepastScreenStyles.model_btn}>现金支付</Text>
                          <Text style={RepastScreenStyles.model_btn}>网上支付</Text>
                      </View>
                      <View  style={{alignItems: 'center',justifyContent: 'center', height: '14%',marginTop:'2%',backgroundColor: '#468F80'}}>
                          <Text style={{color:'#fff',fontSize: 18}}>确认收款成功</Text>
                      </View>
                  </View>
              </Modal>
          </View>
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
          isModalVisible: true
      })
  };
  // 展示模态框
   showListModal = () => {
      console.log(231);
      console.log(this.state.isModalVisible);
      if (!this.state.isModalVisible){
          this.setState({
              isModalVisible: true
          })

      }else {
          this.setState({
              isModalVisible: false
          })
      }

      // this.setState({
      //     isModalVisible: true,
      //     modalHeight: 40
      //
      // })
   };
    totalPriceOperate(item){
        // let goods = {...item};
        console.log(item);
    }
}
