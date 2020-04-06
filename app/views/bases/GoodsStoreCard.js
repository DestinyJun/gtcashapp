/**
 * desc：  入库商品信息组件
 * author：DestinyJun
 * date：  2020/4/6 20:23
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export class GoodsStoreCard extends Component {
  static defaultProps = {
    data: {
      goodsName: '商品名称', // 商品名称
      goodsCode: '商品编号', // 商品编号
      stock: 1, // 商品库存
      company: '单位', // 商品单位
      unitPrice: 1, // 商品单价
      purchasePrice: 1, // 商品进价
      amount: 1, // 入库数量
    },
    showAmount: true
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.title_head} numberOfLines={1}>
            {this.props.data.goodsName}
            <Text style={styles.title_sub}>
              ({this.props.data.goodsCode})
            </Text>
          </Text>
        </View>
        <View style={styles.info}>
          <View style={styles.info_left}>
            <View style={styles.info_card}>
              <Text style={styles.info_btnText}>库存</Text>
              <Text>{this.props.data.stock}</Text>
            </View>
            <View style={styles.info_card}>
              <Text style={styles.info_btnText}>单价</Text>
              <Text>￥ {this.props.data.unitPrice.toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.info_center}>
            <View style={styles.info_card}>
              <Text style={styles.info_btnText}>单位</Text>
              <Text>{this.props.data.company}</Text>
            </View>
            <View style={styles.info_card}>
              <Text style={styles.info_btnText}>进价</Text>
              <Text>￥ {this.props.data.purchasePrice.toFixed(2)}</Text>
            </View>
          </View>
          {
            this.props.showAmount?(
              <View style={styles.info_right}>
                <Text style={[styles.info_font_size]}>入库数量</Text>
                <Text style={[styles.info_font_size,styles.info_font_color]}>{this.props.data.amount}</Text>
              </View>
            ): null
          }
        </View>
      </View>
    );
  }
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
  },
  info_right: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#6DA79B',
    borderLeftWidth: 1
  },
  // 公共样式
  info_card: {
    flexDirection:'row',
    alignItems: 'center',
    marginBottom: 15
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
  }
});
