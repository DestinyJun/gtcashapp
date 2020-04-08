/**
 * desc：  超市商品入库
 * author：DestinyJun
 * date：  2020/4/6 14:19
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Animated, Easing, ScrollView, ToastAndroid} from 'react-native';
import {MarketStoreScreenStyles as styles} from './MarketStoreScreenStyles'
import AsyncStorage from '@react-native-community/async-storage';
// 第三方组件库
import {Icon} from 'react-native-elements';
import {RNCamera} from 'react-native-camera';
import Modal from 'react-native-translucent-modal';
// 自定义组件
import {GoodsStoreCard} from '../bases/GoodsStoreCard';
import {NumberKeyboard} from '../bases/NumberKeyboard';
import {PaySuccess} from '../bases/PaySuccess';
import {post} from '../../service/Interceptor';
import api from '../../service/Api';

export class MarketStoreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goods: [],
      moveAnim: new Animated.Value(0), // 扫动条动画
      selectDownShow: false,
      modalShow: false,
      modalHeaderTitle: '手动查询商品',
      modalContentState: 1
    };
    this.isScan = true;
    this.addGoodsList = [];
    this.searchGoodList = [];
    this.props.navigation.setOptions({
      title: '超市入库',
      headerRightContainerStyle: {},
      headerRight: () => {
        return (
          <View style={c_styles.cell}>
            <TouchableOpacity
              style={[c_styles.cell,c_styles.flex_center,c_styles.pl_3,c_styles.pr_3]}
              onPress={() => {this.setState({selectDownShow: !this.state.selectDownShow})}}>
              <Icon name='dehaze' type='material' color='#FFFFFF' size={30}/>
            </TouchableOpacity>
          </View>
        );
      },
    });
    this.successModalOption = {
      content: '入库成功！', // 提示内容
      leftBtnTitle: '取消入库', // 底部左按钮标题
      rightBtnTitle: '继续入库',// 底部右按钮标题
    };
    this.merchatCode = null;
    this.userId = null;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.camera]}>
           {/*<RNCamera
            ref={ref => {this.camera = ref}}
            style={styles.camera_preview}
            type={'back'}
            flashMode={RNCamera.Constants.FlashMode.on}
            onBarCodeRead={this.onBarCodeRead}
          >
            <View style={styles.camera_preview_mask}>
              <View style={styles.box_top} />
              <View style={styles.box_center}>
                <View style={styles.box_center_left} />
                <Animated.View style={[styles.box_center_line,{transform: [{translateY: this.state.moveAnim}]}]}/>
                <View style={styles.box_center_right} />
              </View>
              <View style={styles.box_bottom} />
            </View>
          </RNCamera>*/}
        </View>
        <View style={styles.goods}>
          {
            this.state.goods.length === 0?
            (<View style={[c_styles.cell,c_styles.flex_center]}>
              <Text style={[c_styles.h4,c_styles.text_darkinfo]}>请扫码或手动添加商品！</Text>
            </View>) :
            (<View style={c_styles.cell}>
              <View style={[styles.goods_content]}>
                <ScrollView style={[{flex: 1}]} alwaysBounceVertical={true}>
                  {
                    this.state.goods.map((item, index) => {
                      return (<GoodsStoreCard change={this.test} key={index} goodsIndex={index} option={item}/>);
                    })
                  }
                </ScrollView>
              </View>
              <View style={[styles.goods_bottom]}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({contentState: 3,isModalVisible: true});
                  }}
                  style={[{flex: 1}, c_styles.w_100, c_styles.flex_center]}>
                  <Text style={[c_styles.h4, c_styles.text_light]}>提交入库</Text>
                </TouchableOpacity>
              </View>
            </View>)
          }
        </View>
        {/*手动查询入库*/}
        <Modal animationType={'fade'} transparent={true} visible={this.state.modalShow} onRequestClose={this.modalToggle}>
          <View style={styles.modal_mask}>
            <View style={styles.modal_container}>
              <View style={styles.modal_header}>
                <TouchableOpacity style={[styles.modal_header_left]} onPress={this.modalToggle}>
                  <Icon type={'font-awesome'} name={'angle-left'} size={35} color={'#1A1A1A'}/>
                </TouchableOpacity>
                <Text style={[c_styles.h4, c_styles.cell, c_styles.text_center]}>
                  {this.state.modalHeaderTitle}
                </Text>
              </View>
              <View style={styles.modal_content}>
                {
                  this.state.modalContentState === 1 ? (<NumberKeyboard enterChange={this.searchModalInputChange}/>) :
                  this.state.modalContentState === 2 ? (
                    <View  style={c_styles.cell}>
                      {
                        this.searchGoodList.length === 0 ?
                          (<View style={[c_styles.cell,c_styles.flex_center]}>
                            <Text style={c_styles.h4}>查询无结果!</Text>
                            <TouchableOpacity style={[styles.modal_content_btn]} onPress={this.modalToggle}>
                              <Text style={[c_styles.h4, c_styles.text_white]}>关闭</Text>
                            </TouchableOpacity>
                          </View>) :
                          (<View style={styles.modal_content_list}>
                            <ScrollView style={[c_styles.cell, {marginBottom: 70}]} alwaysBounceVertical={true}>
                              {
                                this.searchGoodList.map((item, index) => {
                                  return (<GoodsStoreCard option={item} goodsIndex={index} key={index} change={this.selectGoodsChange}/>);
                                })
                              }
                            </ScrollView>
                            <TouchableOpacity style={[styles.modal_content_btn]} onPress={this.addGoodsOperate}>
                              <Text style={[c_styles.h4, c_styles.text_white]}>确认添加</Text>
                            </TouchableOpacity>
                          </View>)
                      }
                      </View>
                  ):(<PaySuccess option={this.successModalOption} onPress={this.modalToggle} />)
                }
              </View>
            </View>
          </View>
        </Modal>
        {/*顶部菜单栏*/}
        {
          this.state.selectDownShow?(
            <View style={styles.select_down}>
              <TouchableOpacity
                style={styles.select_down_list}
                onPress={() => this.setState({
                  modalShow: !this.state.modalShow,
                  selectDownShow: !this.state.selectDownShow
                })}
              >
                <Text style={styles.select_down_text}>手动查询</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.select_down_list,{borderColor: '#EAEAEA',borderBottomWidth: 1,borderTopWidth: 1}]}
                onPress={() => this.setState({
                  selectDownShow: !this.state.selectDownShow
                })}
              >
                <Text style={styles.select_down_text}>新增有条码商品</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.select_down_list}
                onPress={() => this.setState({
                  selectDownShow: !this.state.selectDownShow
                })}
              >
                <Text style={styles.select_down_text}>新增无条码商品</Text>
              </TouchableOpacity>
            </View>
          ): null
        }
      </View>
    );
  }
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
  // 模态框切换
  modalToggle = () => {
    this.setState({
      modalShow: !this.state.modalShow,
      modalContentState: 1,
    })
  };
  // 手动查询商品
  searchModalInputChange = (value) => {
    this.searchGoodsCode(value)
      .then((arr) => {
        this.addGoodsList = [...arr];
        this.searchGoodList = [...arr];
        this.setState({
          modalContentState: 2,
        });
      })
      .catch(err => {
        ToastAndroid.show(err.msg, 1000);
      })
  };
  // 操作入库数量
  selectGoodsChange = (item) => {
    let select = {...item};
    this.searchGoodList.forEach((value,index) => {
      if (index === select.index) {
        if (select.number > 0) {
          this.addGoodsList.splice(index,1,Object.assign(value,{number: select.number}));
        } else{
          this.addGoodsList.splice(index,1);
        }
      }
    });
  };
  // 手动添加入库商品
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
    this.setState({goods: arr});
    this.modalToggle();
  };
  // 根据商品编号搜索商品编号
  searchGoodsCode = async (value) => {
    return post(api.STORE_SEARCH_CODE, {merchatCode: this.merchatCode, goodsCode: value})
      .then((val) => {
        const arr = [];
        for (const value of val) {
          arr.push(Object.assign({}, value, {number: 1}));
        }
        return Promise.resolve(arr);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };
  // 测试
  test= (value) => {
    console.log(value);
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
