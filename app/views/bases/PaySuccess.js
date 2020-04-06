/**
 * desc：  支付成功组件
 * author：DestinyJun
 * date：  2020/4/6 13:19
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export class PaySuccess extends Component {
  static defaultProps = {
    onPress: null
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.content_text}>订单支付成功！是否打印小票？</Text>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.bottom_close} onPress={() => {this.props.onPress("close")}}>
            <Text style={styles.bottom_text}>关闭</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottom_print} onPress={() => {this.props.onPress("print")}}>
            <Text style={styles.bottom_text}>打印</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content_text: {
    fontSize: 18
  },
  bottom: {
    flex: 1,
    borderColor: '#E7E7E7',
    borderTopWidth: 1,
    flexDirection: 'row'
  },
  bottom_close: {
    flex: 1,
    borderColor: '#E7E7E7',
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
  ,bottom_print:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom_text: {
    color: '#59998C',
    fontSize: 20,
    fontWeight: '600'
  }
});
