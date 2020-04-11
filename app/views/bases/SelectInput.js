/**
 * desc：  下拉组件
 * author：DestinyJun
 * date：  2020/4/11 13:13
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, findNodeHandle,UIManager} from 'react-native';
import Modal from 'react-native-translucent-modal';

export class SelectInput extends Component {
  static defaultProps = {
    containerStyles: {
      height: 30,
    },
    btnTitle: '按钮实例',
    btnTitleSize: 16,
    btnTitleColor: 'yellow',
  };

  constructor(props) {
    super(props);
    this.state = {
      top: 0,
      left: 0,
      modalShow: false,
      width: 100,
    };
  }

  render() {
    return (
      <View style={[styles.container, this.props.containerStyles]}>
        <TouchableOpacity style={[styles.button]} ref={(ref) => this.touch = ref} onPress={this.btnPress}>
          <Text
            style={[{fontSize: this.props.btnTitleSize, color: this.props.btnTitleColor}]}>{this.props.btnTitle}</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType={'fade'}
          onRequestClose={() => {
            this.setState({modalShow: false});
          }}
          visible={this.state.modalShow}>
          <View style={[styles.select_container, {top: this.state.top, width: this.state.width,left: this.state.left}]}>
            <ScrollView style={[{flex: 1, zIndex: 3}]}>
              <TouchableOpacity style={[styles.select_button]}>
                <Text>选项一</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.select_button]}>
                <Text>选项二</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.select_button]} onPress={() => {
                console.log(1);
              }}>
                <Text>选项三</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.select_button]} onPress={() => {
                console.log(1);
              }}>
                <Text>选项四</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }

  btnPress = () => {
    console.log(findNodeHandle(this.touch));
    this.touch.measure((x, y, width, height, pageX, pageY) => {
      console.log(x, y, width, height, pageX, pageY);
      this.setState({
        modalShow: true,
        top: pageY + 60,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 5,
    paddingRight: 5,
  },
  select_container: {
    height: 100,
    position: 'absolute',
  },
  select_button: {
    backgroundColor: 'red',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 5,
    zIndex: 2,
  },
});
