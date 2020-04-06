/**
 * desc：  确认价格组件
 * author：DestinyJun
 * date：  2020/4/1 15:54
 */
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-elements';

export class Pricing extends Component {
  static defaultProps = {
    amount: 200, // 金额
    sure_text: '确认收款成功', // 底部按钮文字
    onPress: null, // 点击事件
    pay_type: ['现金支付','网上支付'], // 方式文字
  };
  constructor(props) {
    super(props);
    this.state = {
      bgState: 0
    };
    this.payType = '现金支付';
  }

  render() {
    return (
      <View style={styles.content}>
        <View style={styles.content_top}>
          <View style={styles.content_top_amount}>
            <Text style={styles.content_top_amount_text}>
              ￥{this.props.amount.toFixed(2)}
            </Text>
          </View>
          <View style={styles.content_top_line}>
            <Text style={styles.content_top_line_left} />
            <Text style={styles.content_top_line_text}>支付方式</Text>
            <Text style={styles.content_top_line_right} />
          </View>
          <View style={styles.content_top_pay}>
            {
              this.props.pay_type.map((item, index) => {
                return (
                  <Button
                    key={index}
                    title={item}
                    titleStyle={[styles.content_top_pay_title,{color: index === this.state.bgState?'white':'#9DC4BC'}]}
                    buttonStyle={[
                      styles.content_top_pay_button,
                      {
                        marginBottom: index===0?10:null,
                        marginTop: index===1?10:null,
                        backgroundColor: index === this.state.bgState?'#9DC4BC':null,
                      }]}
                    TouchableComponent={TouchableOpacity}
                    onPress={() => {
                      if (this.state.bgState === 1) {
                        this.setState({
                          bgState: 0
                        },() => {
                          this.payType = '现金支付';
                        })
                      } else {
                        this.setState({
                          bgState: 1
                        },() => {
                          this.payType = '网上支付';
                        })
                      }
                    }}
                    type="outline"
                  />
                );
              })
            }
          </View>
        </View>
        <View style={styles.content_bottom}>
          <TouchableOpacity onPress={() => {this.props.onPress(this.payType)}}>
            <Text style={styles.content_bottom_text}>{this.props.sure_text}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'space-between'
  },
  content_top: {
    flex: 5,
  },
  content_top_amount: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content_top_amount_text: {
    fontSize: 30,
    color: '#FF4747'
  },
  content_top_line: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  content_top_line_left: {
    width: '35%',
    height: 2,
    backgroundColor: '#F4F4F4'
  },
  content_top_line_text: {
    fontSize: 16
  },
  content_top_line_right: {
    width: '35%',
    backgroundColor: '#F4F4F4',
    height: 2,
  },
  content_top_pay: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content_top_pay_button: {
    borderRadius: 50,
    borderColor: '#9DC4BC',
    borderWidth: 1,
    paddingRight: 30,
    paddingLeft: 30,
  },
  content_top_pay_title: {
    fontSize: 20
  },
  content_bottom: {
    flex: 1,
    backgroundColor: '#468F80',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content_bottom_text: {
    fontSize: 20,
    color: 'white'
  }
});
