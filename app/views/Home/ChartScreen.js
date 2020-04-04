/**
 * desc：  图表统计
 * author：DestinyJun
 * date：  2020/4/3 14:06
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {ChartScreenStyles as styles} from './ChartScreenStyles';
import {Icon} from 'react-native-elements';
import { VictoryArea, VictoryChart, VictoryAxis} from "victory-native";
const data = [
  { x: 1, y: 2, y0: 0 },
  { x: 2, y: 3, y0: 1 },
  { x: 3, y: 5, y0: 1 },
  { x: 4, y: 4, y0: 2 },
  { x: 5, y: 6, y0: 2 }
];
export default class ChartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={c_styles.flex_center}>
            <Text style={c_styles.h5}>今日销售额统计</Text>
          </View>
          <TouchableOpacity style={styles.header_right}>
            <Text style={[c_styles.h5,c_styles.pr_3]}>今日统计</Text>
            <Icon type={'font-awesome'} name={'sort-desc'} size={20} color={'#272727'} containerStyle={[{paddingBottom: 12}]}/>
          </TouchableOpacity>
        </View>
        <View style={styles.chart}>
          <View style={styles.chart_title}>
            <Text style={c_styles.h5}>中译超市</Text>
            <View style={styles.chart_title_right}>
              <Icon type={'font-awesome'} name={'square'} size={18} color={'#468F80'}/>
              <Text style={[c_styles.h6,c_styles.text_secondary,c_styles.ml_4]}>销售金额</Text>
            </View>
          </View>
          <View style={styles.chart_content}>
            <VictoryChart height={180}>
              <VictoryAxis tickFormat={(y) => {return y}}/>
              <VictoryAxis dependentAxis={true} tickFormat={(x) => {return (`${x}k`)}}/>
              <VictoryArea data={data}/>
            </VictoryChart>
          </View>
        </View>
        <View style={styles.count}>
          <View style={styles.count_order}>
            <Text style={[c_styles.h6,c_styles.text_secondary]}>订单统计</Text>
            <Text style={[c_styles.h4,c_styles.text_darkinfo]}>84</Text>
          </View>
          <View style={styles.count_sale}>
            <Text style={[c_styles.h6,c_styles.text_secondary]}>订单统计</Text>
            <Text style={[c_styles.h4,{color: '#FFA330'}]}>2,590</Text>
          </View>
        </View>
        <View style={styles.rank}>
          <View style={styles.rank_title}>
            <Text style={[c_styles.h5]}>商品销售额排名top20</Text>
          </View>
          <ScrollView style={styles.rank_content}>

          </ScrollView>
        </View>
      </View>
    );
  }
}
