/**
 * desc：  餐饮收银
 * author：DestinyJun
 * date：  2020/3/27 14:52
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import SettlementUI from '../bases/SettlementUI'
import {RepastScreenStyles} from "./RepastScreenStyles";
import {Icon} from 'react-native-elements';

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
        amount: 12.5
    };
    this.props.navigation.setOptions({
       title: '餐饮收银',
    });
  }

  render() {
    return (
      <View>
        <StatusBar translucent={false} backgroundColor='#fff' barStyle="dark-content" />
        <View style={RepastScreenStyles.leftTab}>
            {
               this.state.tabData.map((value, index) => {
                    return (
                        <TouchableOpacity
                            style={[RepastScreenStyles.selectTab,
                                {borderColor: value.bdColor , backgroundColor: value.bgColor}]}
                            onPress={() => this.TabChooseTogClick('CePing')}
                            key={index}>
                            {
                                value.active === 1 ? <Icon type={'font-awesome'} name={'circle'} size={4} color={'red'} iconStyle={{marginLeft: '65%'}} /> : null

                            }
                            <Text style={[RepastScreenStyles.selectTabText, {color: value.tColor}]}>{value.label}</Text>
                        </TouchableOpacity>
                    )
                })

            }
        </View>
          <View style={RepastScreenStyles.rightContent}>
              <Text style={RepastScreenStyles.title}>面食</Text>
          </View>
          <View style={RepastScreenStyles.bottom_price}>
              {/*<Text style={RepastScreenStyles.title}>123</Text>*/}
            <SettlementUI num={this.state.num} amount={this.state.amount} Settlement={this.Settlement}/>
          </View>
      </View>
    );
  }
  componentDidMount(): void {
      console.log(this.props.navigation);
  }
  TabChooseTogClick(){

  }
  Settlement(){
      console.log(123);
  }
}
