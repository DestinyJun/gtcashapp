/**
 * desc：  超市收银
 * author：DestinyJun
 * date：  2020/3/23 22:08
 */
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,Animated, Easing, ScrollView
} from 'react-native';
import {MarketScreenStyles} from './MarketScreenStyles';
// 自定义组件
import {NumberKeyboard} from '../bases/NumberKeyboard';
import {GoodsInfoCard} from '../bases/GoodsInfoCard';
import {Pricing} from '../bases/Pricing';
// 第三方组件
import {RNCamera} from 'react-native-camera';
import Modal from 'react-native-translucent-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
// 自定义工具
import {post} from '../../service/Interceptor';
import api from '../../service/Api';
import AsyncStorage from '@react-native-community/async-storage';
import {PaySuccess} from '../bases/PaySuccess';


export default class MarketScreen extends Component {
  constructor(props) {
    super(props);
    this.isScan = true;
    this.state = {
      totalPrice: 0,
      isModalVisible: false,
      moveAnim: new Animated.Value(0), // 扫动条动画
      contentState: 1,
      goods: [],
    };
    this.addGoodsList = [];
    this.searchGoodList = [];
    this.merchatCode = null;
    this.userId = null;
    this.props.navigation.setOptions({
      title: '超市收银',
      headerRight: () => {
        return (
          <TouchableOpacity
            style={[c_styles.pl_3, {width: 100}]}
            onPress={this.searchModalToggle}
          >
            <Text style={[c_styles.text_light, c_styles.h5]}>手动查询</Text>
          </TouchableOpacity>
        );
      },
    });
  }

  render() {
    return (
      <View style={MarketScreenStyles.container}>
        <View style={[MarketScreenStyles.camera]}>
           {/* <RNCamera
            ref={ref => {this.camera = ref}}
            style={MarketScreenStyles.camera_preview}
            type={'back'}
            flashMode={RNCamera.Constants.FlashMode.on}
            onBarCodeRead={this.onBarCodeRead}
          >
            <View style={MarketScreenStyles.camera_preview_mask}>
              <View style={MarketScreenStyles.box_top} />
              <View style={MarketScreenStyles.box_center}>
                <View style={MarketScreenStyles.box_center_left} />
                <Animated.View style={[MarketScreenStyles.box_center_line,{transform: [{translateY: this.state.moveAnim}]}]}/>
                <View style={MarketScreenStyles.box_center_right} />
              </View>
              <View style={MarketScreenStyles.box_bottom} />
            </View>
          </RNCamera>*/}
        </View>
        <View style={[MarketScreenStyles.shop]}>
          {
            this.state.goods.length === 0?
              (<View style={[c_styles.cell,c_styles.flex_center]}>
                <Text style={[c_styles.h4,c_styles.text_darkinfo]}>请扫码或手动添加商品！</Text>
              </View>) :
              (<View style={c_styles.cell}>
                <View style={[MarketScreenStyles.shop_content]}>
                  <ScrollView
                    style={[{flex: 1}]}
                    alwaysBounceVertical={true}
                  >
                    {
                      this.state.goods.map((item, index) => {
                        return (
                          <GoodsInfoCard
                            key={index}
                            queue={index + 1} title={item.goodsName}
                            price={item.unitPrice} code={item.goodsCode}
                            unit={item.company} numbers={item.numbers}
                            change={this.totalPriceOperate}
                          />
                        );
                      })
                    }
                  </ScrollView>
                </View>
                <View style={[MarketScreenStyles.shop_bottom]}>
                  <View style={MarketScreenStyles.shop_bottom_price}>
                    <Text style={[c_styles.h5, c_styles.ml_5]}>
                      合计金额：<Text style={c_styles.text_danger}>￥{this.state.totalPrice}</Text>
                    </Text>
                  </View>
                  <View style={MarketScreenStyles.shop_bottom_settle}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({contentState: 3,isModalVisible: true});
                      }}
                      style={[{flex: 1}, c_styles.w_100, c_styles.flex_center]}>
                      <Text style={[c_styles.h5, c_styles.text_light]}>结算</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>)
          }
        </View>
        {/* 查询商品模态框*/}
        <Modal
          animationType={'fade'} transparent={true}
          visible={this.state.isModalVisible}
          onRequestClose={() => {
            this.setState({contentState: 1,isModalVisible: !this.state.isModalVisible});
            this.addGoodsList = [];
          }}
          style={[c_styles.justify_end, c_styles.m_clear]}
        >
          <View style={[c_styles.h_100,c_styles.justify_end,{backgroundColor: 'rgba(0,0,0,0.3)'}]}>
            <View style={[c_styles.h_60, c_styles.bg_white]}>
              <View style={MarketScreenStyles.search_modal_header}>
                <TouchableOpacity style={[MarketScreenStyles.search_modal_header_left]} onPress={this.searchModalToggle}>
                  <Icon name={'angle-left'} size={35} color={'#1A1A1A'}/>
                </TouchableOpacity>
                <Text style={[c_styles.h4, c_styles.cell, c_styles.text_center]}>
                  {
                    this.state.contentState === 1 ? '手动查询商品' :
                      this.state.contentState === 2 ? '查询结果' :
                        this.state.contentState === 3 ? '结算' : '收款成功'
                  }
                </Text>
              </View>
              <View style={MarketScreenStyles.search_modal_content}>
                {
                  this.state.contentState === 1 ? (<NumberKeyboard enterChange={this.searchModalInputChange}/>) :
                    this.state.contentState === 2 ? (
                        <View  style={c_styles.cell}>
                          {
                            this.searchGoodList.length === 0 ?
                              (<View style={[c_styles.cell,c_styles.flex_center]}>
                                <Text style={c_styles.h4}>查询无结果!</Text>
                                <TouchableOpacity style={[MarketScreenStyles.search_modal_add_btn]} onPress={this.searchModalToggle}>
                                  <Text style={[c_styles.h4, c_styles.text_white]}>关闭</Text>
                                </TouchableOpacity>
                              </View>) :
                              (<View style={MarketScreenStyles.search_modal_shop_list}>
                                <ScrollView style={[c_styles.cell, {marginBottom: 70}]} alwaysBounceVertical={true}>
                                  {
                                    this.searchGoodList.map((item, index) => {
                                      return (
                                        <GoodsInfoCard
                                          key={index}
                                          queue={index + 1} title={item.goodsName}
                                          price={item.unitPrice} code={item.goodsCode}
                                          unit={item.company} numbers={item.numbers}
                                          change={this.selectGoodsChange}
                                        />
                                      );
                                    })
                                  }
                                </ScrollView>
                                <TouchableOpacity style={[MarketScreenStyles.search_modal_add_btn]} onPress={this.addGoodsOperate}>
                                  <Text style={[c_styles.h4, c_styles.text_white]}>确认添加</Text>
                                </TouchableOpacity>
                              </View>)
                          }
                        </View>
                      ) :
                      this.state.contentState === 3 ? (<Pricing amount={this.state.totalPrice} onPress={this.paySure}/>) :
                        (<PaySuccess onPress={()=>{this.setState({isModalVisible: false},()=> {this.setState({contentState: 1})})}} />)
                }
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  // 总价操作
  totalPriceOperate = () => {
    let price = 0;
    this.state.goods.forEach((val) => {
      price+=(parseFloat(val.numbers) * parseFloat(val.unitPrice));
    });
    this.setState({
      totalPrice: price
    })
  };
  // 选择商品操作
  selectGoodsChange = (item) => {
    let select = {...item};
    this.searchGoodList.forEach((value,index) => {
      if (index === select.index) {
        if (select.numbers > 0) {
          this.addGoodsList.splice(index,1,Object.assign(value,{numbers: select.numbers}));
        } else{
          this.addGoodsList.splice(index,1);
        }
      }
    });
  };
  // 手动添加购物商品
  addGoodsOperate = () => {
    let arr = [...this.state.goods];
    this.addGoodsList.forEach((item)=> {
      const code = arr.findIndex((element) => element.goodsCode === item.goodsCode);
      if (code < 0) {
        arr.push(item);
      } else {
        arr[code].numbers++;
      }
    });
    this.setState({
      goods: arr
    },() => {
      this.totalPriceOperate();
    });
    this.searchModalToggle();
  };
  //  扫码添加购物商品
  onBarCodeRead = (result) => {
    if (this.isScan) {
      this.isScan = false;
      this.searchGoodsCode(result.data)
        .then((res) => {
          const arr = this.state.goods;
          res.forEach((item)=> {
            const code = this.state.goods.findIndex((element) => element.goodsCode === item.goodsCode);
            if (code < 0) {
              arr.push(item);
            } else {
              arr[code].numbers++;
            }
          });
        this.setState({
          goods: arr
        },() => {
          this.totalPriceOperate();
        });
        })
        .catch(err=> {})
      ;
      this.timer = setTimeout(() => {
        this.isScan = true;
      }, 2000);
    }
  };
  // 搜索商品弹窗切换
  searchModalToggle = () => {
    this.setState({contentState: 1,isModalVisible: !this.state.isModalVisible});
    this.addGoodsList = [];
  };
  // 手动查询商品
  searchModalInputChange = (value) => {
    this.searchGoodsCode(value)
      .then((arr) => {
        this.addGoodsList = [...arr];
        this.searchGoodList = [...arr];
        this.setState({
          contentState: 2,
        });
      })
      .catch((err) => console.log(err))
  };
  // 根据商品编号搜索商品编号
  searchGoodsCode = async (value) => {
    return post(api.SEARCH_GOODS_CODE, {merchatCode: this.merchatCode, code: value})
      .then((val) => {
        const arr = [];
        for (const value of val) {
          arr.push(Object.assign({}, value, {numbers: 1}));
        }
        return arr;
      })
      .catch((err) => {
        return err;
      });
  };
  // 二维码动画
  startAnimation = () => {
    this.state.moveAnim.setValue(0);
    Animated.timing(
      this.state.moveAnim,
      {
        toValue: 120,
        duration: 5000,
        easing: Easing.linear,
      },
    ).start(() => this.startAnimation());
  };
  // 结算操作
  paySure = async (val) => {
    const payList = {
      merchatCode: this.merchatCode,
      userId: this.merchatCode,
      payType: val,
      accountsReceivable: 0.00,
      sales: this.state.totalPrice,
      data: []
    };
    post(api.SURE_PAY_SUCCESS, payList)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  };
  // 生命周期钩子
  componentDidMount() {
    this.startAnimation();
    // 初始化本地参数
    AsyncStorage.getItem('merchatCode').then((res) => {
      this.merchatCode = res ;
    });
    AsyncStorage.getItem('userCode').then((res) => {
      this.userId = res ;
    });
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
}
