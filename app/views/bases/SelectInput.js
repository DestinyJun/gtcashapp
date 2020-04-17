/**
 * desc：  下拉组件
 * author：DestinyJun
 * date：  2020/4/11 13:13
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView,TouchableWithoutFeedback} from 'react-native';
import Modal from 'react-native-translucent-modal';

export class SelectInput extends Component {
  static defaultProps = {
    containerStyles: {
      height: 30,
    }, // 下拉选框容器样式
    btnTitle: '按钮实例', // 按钮文字内容
    btnTitleSize: 16, // 按钮文字尺寸
    btnTitleColor: 'yellow',// 按钮文字颜色
    selectOptionStyles: {}, // 下拉选框选项的样式
    activeOptionBgColor: null, // 激活选项的背景色
    activeSelectOptionTextColor: null, // 激活选项的文字颜色
    selectOptionTextColor: '#001629',// 下拉选项文字颜色
    selectContainerHeight: 100, // 下拉框容器高度
    selectContainerBgColor: null, // 下拉框容器背景色
    options: [], // 下拉选项数据
    selectChange: null, // 下拉选择回调事件
    selectWillShow: null,// 模态框显示之前调用
    selectWillHide: null,// 模态框隐藏之后调用
  };

  constructor(props) {
    super(props);
    this.state = {
      top: 0,
      left: 0,
      modalShow: false,
      width: 100,
      active: null,
      btnTitle: null,
      prevPropsBtnTitle: null,
    };
  }

  static getDerivedStateFromProps(props,state) {
    if (props.btnTitle !== state.prevPropsBtnTitle) {
      return {
        btnTitle: props.btnTitle,
        prevPropsBtnTitle: props.btnTitle
      }
    }
    return null;
  }

  render() {
    return (
      <View style={[styles.container]}>
        <TouchableOpacity style={[styles.button,this.props.containerStyles]} ref={(ref) => this.touch = ref} onPress={this.btnPress}>
          <Text style={[{fontSize: this.props.btnTitleSize, color: this.props.btnTitleColor}]}>{this.state.btnTitle}</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType={'fade'}
          onRequestClose={() => {
            this.setState({modalShow: false},() => {
              this.props.selectWillHide? this.props.selectWillHide(): null
            });
          }}
          visible={this.state.modalShow}>
          <TouchableWithoutFeedback onPress={() => {
            this.props.selectWillHide? this.props.selectWillHide():null;
            this.setState({modalShow: false});
          }}>
            <View style={[{height: '100%',width: '100%'}]}>
              <View style={[styles.select_container, {
                top: this.state.top,
                width: this.state.width,
                left: this.state.left,
                height: this.props.selectContainerHeight,
                backgroundColor: this.props.selectContainerBgColor
              }]}>
                <ScrollView style={[{flex: 1, zIndex: 3}]}>
                  {
                    this.props.options?this.props.options.map((val,index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.select_button,
                            this.props.selectOptionStyles,
                            {backgroundColor: this.state.active === index?this.props.activeOptionBgColor: this.props.selectOptionStyles.backgroundColor}
                          ]}
                          onPress={() => {
                            this.setState({
                              active: index,
                              modalShow: false,
                              btnTitle: val.name
                            },() => {
                              this.props.selectWillHide? this.props.selectWillHide():null;
                            });
                            this.props.selectChange(val);
                          }}
                        >
                          <Text style={[{
                            color: this.state.active === index?this.props.activeSelectOptionTextColor: this.props.selectOptionTextColor
                          }]}>{val.name}</Text>
                        </TouchableOpacity>
                      )
                    }):(
                      <TouchableOpacity
                        style={[
                          styles.select_button,
                          this.props.selectOptionStyles,
                          {backgroundColor: this.props.activeOptionBgColor}
                        ]}
                        onPress={() => {
                          this.setState({
                            modalShow: false,
                            btnTitle: '暂无数据'
                          },() => {
                            this.props.selectWillHide? this.props.selectWillHide():null;
                          });
                          this.props.selectChange(null);
                        }}
                      >
                        <Text style={[{
                          color: this.props.activeSelectOptionTextColor
                        }]}>暂无数据</Text>
                      </TouchableOpacity>
                    )
                  }
                </ScrollView>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }

  btnPress = () => {
    this.props.selectWillShow?this.props.selectWillShow():null;
    this.touch.measure((x, y, width, height, pageX, pageY) => {
      this.setState({
        modalShow: true,
        top: pageY + height,
        left: pageX,
        width: width
      });
    });
  };
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 2,
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  select_container: {
    position: 'absolute',
    borderColor: '#F1F1F1',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  select_button: {
    zIndex: 2,
  },
});
