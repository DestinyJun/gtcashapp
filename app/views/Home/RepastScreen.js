/**
 * desc：  餐饮收银
 * author：DestinyJun
 * date：  2020/3/27 14:52
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StatusBar, ScrollView} from 'react-native';
import SettlementUI from '../bases/SettlementUI'
import {RepastScreenStyles} from "./RepastScreenStyles";
import {Icon} from 'react-native-elements';
import {GoodsInfoCard} from "../bases/GoodsInfoCard";

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
        amount: 12.5,
        goods: [
            {title: '红烧牛肉面', price: '15.00', numbers: 3, code: null, unit: '500ml'},
            {title: '泡脚牛肉面', price: '15.00', numbers: 10, code: null, unit: '500ml'},
            {title: '杂酱面', price: '15.00', numbers: 5, code: null, unit: '500ml'},
            {title: '打卤面', price: '15.00', numbers: 5, code: null, unit: '500ml'},
        ],
    };
    this.props.navigation.setOptions({
       title: '餐饮收银',
    });
  }

  render() {
    return (
      <View>
        <View style={RepastScreenStyles.leftTab}>
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
          <View style={RepastScreenStyles.rightContent}>
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
                              />
                          );
                      })
                  }
              </ScrollView>
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
  settlementClick(){
      console.log(123);
  }
  // 展示模态框
   showListModal(){
      console.log('显示模态框');
   }
    totalPriceOperate(item){
        // let goods = {...item};
        console.log(item);
    }
}
