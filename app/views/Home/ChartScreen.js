/**
 * desc：  图表统计
 * author：DestinyJun
 * date：  2020/4/3 14:06
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {ChartScreenStyles as styles} from './ChartScreenStyles';
import {Icon} from 'react-native-elements';
import {WebView} from 'react-native-webview';
import {HTML,renderChart} from '../../util/Constant';
export default class ChartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.colorScale = ['tomato', 'orange', 'gold', 'navy'];
    this.HTML = {
      html: HTML,
    };
    this.option = {
      grid: {
        top: '11%',
        left: '1%',
        right: '4%',
        bottom: '8%',
        containLabel: true,
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            opacity: 0.3
          },
        },
        formatter: (params) => {
          return '<div>' +
            '<p style="padding: 0 5px 0 5px;margin: 0">' + params[0].name + ':00</p>' +
            '<p style="padding: 0 5px 0 5px;margin: 0">' +
            '<span style="display: inline-block;width: 10px;height: 10px;border-radius: 50%;background-color: #468F80"></span>' +
            '<span style="margin-left:5px">' + params[0].seriesName + params[0].value + '</span>' +
            '</p>' +
            '</div>';
        },
        backgroundColor: '#FFFFFF',
        textStyle: {
          color: '#6A6A6A'
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18','20','22'],
        axisLabel: {
          // margin: 30,
          color: '#575757'
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#DDEAE7',
            opacity: 0.2
          },
        },
      },
      yAxis: [{
        type: 'value',
        position: 'left',
        axisLabel: {
          color: '#575757'
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#DDEAE7',
            opacity: 0.2,
          }
        },
        axisLine: {
          lineStyle: {
            color: '#fff',
            width: 2
          }
        }
      }],
      series: [
        {
          name: '销售金额：',
          type: 'line',
          showSymbol: false,
          smooth: true, //是否平滑曲线显示
          showAllSymbol: true,
          symbol: 'circle',
          symbolSize: 2,
          lineStyle: {
            color: "#609E91", // 线条颜色
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#434343',
            }
          },
          itemStyle: {
            color: "#468F80",
          },
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#eb64fb' // 0% 处的颜色
                }, {
                  offset: 1, color: '#3fbbff' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              },
            }
          },
          data: [393, 438, 485, 631, 689, 824, 987, 1000, 1100, 1200,800,600]
        }]
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={c_styles.flex_center}>
            <Text style={c_styles.h5}>今日销售额统计</Text>
          </View>
          <TouchableOpacity style={styles.header_right}>
            <Text style={[c_styles.h5, c_styles.pr_3]}>今日统计</Text>
            <Icon type={'font-awesome'} name={'sort-desc'} size={20} color={'#272727'} containerStyle={[{paddingBottom: 12}]}/>
          </TouchableOpacity>
        </View>
        <View style={styles.chart}>
          <View style={styles.chart_title}>
            <Text style={c_styles.h5}>中译超市</Text>
            <View style={styles.chart_title_right}>
              <Icon type={'font-awesome'} name={'square'} size={18} color={'#468F80'}/>
              <Text style={[c_styles.h6, c_styles.text_secondary, c_styles.ml_4]}>销售金额</Text>
            </View>
          </View>
          <View style={styles.chart_content}>
            <WebView
              ref={(ref) => this.webView = ref}
              originWhitelist={['*']}
              source={this.HTML}
              useWebKit={true}
              geolocationEnabled={true}
              mixedContentMode={'always'}
              scrollEnabled={false}
              allowUniversalAccessFromFileURLs={true}
              javaScriptEnabled={true}
              injectedJavaScript={renderChart(this.props,this.option)}
              startInLoadingState={true}
              automaticallyAdjustContentInsets={false}
              onMessage={(event) => {
                console.log(event.nativeEvent.data);
              }}
            />
          </View>
        </View>
        <View style={styles.count}>
          <View style={styles.count_order}>
            <Text style={[c_styles.h6, c_styles.text_secondary]}>订单统计</Text>
            <Text style={[c_styles.h4, c_styles.text_darkinfo]}>84</Text>
          </View>
          <View style={styles.count_sale}>
            <Text style={[c_styles.h6, c_styles.text_secondary]}>订单统计</Text>
            <Text style={[c_styles.h4, {color: '#FFA330'}]}>2,590</Text>
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
