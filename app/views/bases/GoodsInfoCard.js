/**
 * desc：  商品信息卡片组件
 * author：DestinyJun
 * date：  2020/3/26 11:48
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class GoodsInfoCard extends Component {
  static defaultProps = {
    // 这里是设置props默认属性的值
    queue: 1,
    title: null,
    price: null,
    code: null,
    unit: null,
    numbers: 0,
    change: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      numbers: this.props.numbers,
      show: false
    };
  }

  render() {
    if (this.state.show) {
      return null;
    }
    return (
      <View style={[styles.container]}>
        {
          this.props.queue > 0 ? (<View style={[styles.number, c_styles.flex_center]}>
            <Text style={[c_styles.text_darkinfo, c_styles.h5]}>
              {this.props.queue}
            </Text>
          </View>) : null
        }
        <View style={[styles.content]}>
          <View style={[styles.content_title, c_styles.pl_2]}>
            <Text numberOfLines={1} style={c_styles.h6}>
              {this.props.title}500ml
              <Text style={[c_styles.h_small, c_styles.text_secondary]}>({this.props.code})</Text>
            </Text>
          </View>
          <View style={[styles.content_price, c_styles.pl_2]}>
            <Text style={styles.content_price_text}>单价</Text><Text>￥{this.props.price}</Text>
          </View>
        </View>
        <View style={[styles.operate]}>
          <View style={[styles.operate_minus]}>
            <TouchableOpacity
              onPress={this.operateMinus}
              style={[c_styles.cell, c_styles.w_100, c_styles.flex_center]}>
              <Icon name={'minus-circle'} style={[c_styles.text_darkinfo, c_styles.h4]}/>
            </TouchableOpacity>
          </View>
          <View style={[styles.operate_number, c_styles.flex_center]}>
            <Text style={c_styles.h5}>{this.state.numbers}</Text>
          </View>
          <View style={[styles.operate_add]}>
            <TouchableOpacity
              onPress={this.operateAdd}
              style={[c_styles.cell, c_styles.w_100, c_styles.flex_center]}>
              <Icon name={'plus-circle'} style={[c_styles.text_darkinfo, c_styles.h4]}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  operateMinus = () => {
    this.setState({
        numbers: this.state.numbers - 1,
      },
      () => {
        if (this.state.numbers === 0) {
          this.setState(
            {
              show: true,
            })
        }
        this.props.change({index: this.props.queue - 1, numbers: this.state.numbers});
      },
    );
  };
  operateAdd = () => {
    this.setState(
      {numbers: this.state.numbers + 1},
      () => {
        this.props.change({index: this.props.queue - 1, numbers: this.state.numbers});
      },
    );
  };
}
const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    borderColor: '#F1F4F3',
    borderBottomWidth: 1,
  },
  number: {
    flex: 2,
    borderColor: '#F0F4F3',
    borderRightWidth: 1,
  },
  content: {
    flex: 18,
  },
  content_title: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  content_price: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content_price_text: {
    borderColor: '#468F80',
    borderWidth: 1,
    borderRadius: 10,
    paddingRight: 10,
    paddingLeft: 10,
    marginRight: 5,
    fontSize: 12,
    color: '#468F80',
  },
  operate: {
    flex: 6,
    flexDirection: 'row',
  },
  operate_add: {
    flex: 1,
  },
  operate_number: {
    flex: 1,
  },
  operate_minus: {
    flex: 1,
  },
});
