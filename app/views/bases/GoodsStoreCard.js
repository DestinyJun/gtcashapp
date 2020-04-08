/**
 * desc：  入库商品信息组件
 * author：DestinyJun
 * date：  2020/4/6 20:23
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export class GoodsStoreCard extends Component {
  static defaultProps = {
    option: {
      goodsName: '商品名称', // 商品名称
      goodsCode: '商品编号', // 商品编号
      nowSize: 1, // 商品库存
      company: '单位', // 商品单位
      unitPrice: 1, // 商品单价
      purchasePrice: 1, // 商品进价
      number: 0, // 入库数量
    },
    change: null, // 回调
    goodsIndex: 0, // 下标
    showAmount: true
  };
  constructor(props) {
    super(props);
    this.state = {
      number: 0, // 入库数量
      prevPropNumbers: null,
    };
  }
  static getDerivedStateFromProps(props, state) {
    // 反模式
    if (props.option.number !== state.prevPropNumbers) {
      return {
        number: props.option.number,
        // 保存初始化的props，从而进行比对赛选，避免原因setState和forceUpdate触发本生命周期导致不断的props赋值给state
        prevPropNumbers: props.option.number,
      };
    }
    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.title_head} numberOfLines={1}>
            {this.props.option.goodsName}
            <Text style={styles.title_sub}>
              ({this.props.option.goodsCode})
            </Text>
          </Text>
        </View>
        <View style={styles.info}>
          <View style={styles.info_left}>
            <View style={styles.info_card}>
              <Text style={styles.info_btnText}>库存</Text>
              <Text>{this.props.option.nowSize}</Text>
            </View>
            <View style={styles.info_card}>
              <Text style={styles.info_btnText}>单价</Text>
              <Text>￥ {parseFloat(this.props.option.unitPrice).toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.info_center}>
            <View style={styles.info_card}>
              <Text style={styles.info_btnText}>单位</Text>
              <Text>{this.props.option.company}</Text>
            </View>
            <View style={styles.info_card}>
              <Text style={styles.info_btnText}>进价</Text>
              <Text>￥ {parseFloat(this.props.option.purchasePrice).toFixed(2)}</Text>
            </View>
          </View>
          {
            this.props.showAmount?(
              <View style={styles.info_right}>
                <Text style={[styles.info_font_size]}>入库数量</Text>
                <View style={styles.info_right_operate}>
                  <TouchableOpacity
                    onPress={this.operateMinus}
                    style={styles.info_touch}>
                    <Icon name={'minus-circle'} color={'#468F80'} size={22}/>
                  </TouchableOpacity>
                  <Text style={[styles.info_font_size,styles.info_font_color]}>{this.state.number}</Text>
                  <TouchableOpacity
                    onPress={this.operateAdd}
                    style={styles.info_touch}>
                    <Icon name={'plus-circle'} color={'#468F80'} size={22}/>
                  </TouchableOpacity>
                </View>
              </View>
            ): null
          }
        </View>
      </View>
    );
  }
  operateMinus = () => {
    if (this.props.isClear) {
      this.setState({
          number: this.state.number - 1,
        },
        () => {
          if (this.state.number === 0) {
            this.setState(
              {
                show: true,
              });
          }
          if (this.props.change) {
            this.props.change({
              index: this.props.goodsIndex,
              number: this.state.number,
            });
          }
        },
      );
      return;
    }
    this.setState((state, props) => {
      if (state.number === 0) {
        if (this.props.change) {
          this.props.change({
            index: this.props.goodsIndex,
            number: this.state.number,
          });
        }
        return {
          number: 0,
        };
      } else {
        if (this.props.change) {
          this.props.change({
            index: this.props.goodsIndex,
            number: this.state.number,
          });
        }
        return {
          number: state.number - 1,
        };
      }
    });
  };
  operateAdd = () => {
    this.setState(
      {number: this.state.number + 1},
      () => {
        if (this.props.change) {
          this.props.change({
            index: this.props.goodsIndex,
            number: this.state.number,
          });
        }
      },
    );
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 12,
    paddingLeft: 12,
  },
  title_head: {
    fontSize: 20,
  },
  title_sub: {
    fontSize: 14,
    color: '#8C8C8C'
  },
  info: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 12,
    paddingLeft: 12,
    borderColor: '#ECEFEE',
    borderBottomWidth: 1
  },
  info_left: {
    flex: 1,
  },
  info_center: {
    flex: 1,
    justifyContent: 'center',
  },
  info_right: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#6DA79B',
    borderLeftWidth: 1,
  },
  info_right_operate: {
    flexDirection: 'row'
  },
  // 公共样式
  info_card: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
    height: 40,
  },
  info_btnText: {
    borderColor: '#6DA79B',
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 10,
    paddingLeft: 10,
    color: '#6DA79B',
    marginRight: 5
  },
  info_font_size: {
    fontSize: 20
  },
  info_font_color: {
    color: '#6DA79B'
  },
  info_touch: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
