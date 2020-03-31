/**
 * desc：  虚拟纯数字键盘
 * author：DestinyJun
 * date：  2020/3/30 20:44
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Vibration} from 'react-native';
import {Icon} from 'react-native-elements';

export class NumberKeyboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container_box}>
          {
            [1,2,3].map((number,index) => (
              <TouchableOpacity
                key={index}
                onPress={this.keyboardTouch}
                style={[styles.container_box_touch,index===1?styles.border_left_right:null]}>
                <Text style={styles.container_box_touch_text}>{number}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
        <View style={styles.container_box}>
          {
            [4,6,6].map((number,index) => (
              <TouchableOpacity
                key={index}
                onPress={this.keyboardTouch}
                style={[styles.container_box_touch,index===1?styles.border_left_right:null]}>
                <Text style={styles.container_box_touch_text}>{number}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
        <View style={styles.container_box}>
          {
            [7,8,9].map((number,index) => (
              <TouchableOpacity
                key={index}
                onPress={this.keyboardTouch}
                style={[styles.container_box_touch,index===1?styles.border_left_right:null]}>
                <Text style={styles.container_box_touch_text}>{number}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
        <View style={styles.container_box}>
          {
            ['x',0,'查询'].map((item,index) => (
              <TouchableOpacity
                key={index}
                onPress={this.keyboardTouch}
                style={[
                  styles.container_box_touch,
                  index===1?styles.border_left_right:null,
                  index===3?styles.bg_text_darkinfo:null
                ]}>
                {
                  item === 'x'?( <Icon name={'backspace'} type={'material'} color={'#3D3D3D'} iconStyle={[{transform: [{rotateY:'180deg'}]}]}/>):
                    (<Text style={styles.container_box_touch_text}>{item}</Text>)
                }
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    );
  }
  // 键盘触摸返回
  keyboardTouch = () => {
    Vibration.vibrate( 50,false);
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_box: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#EFEFEF',
    borderTopWidth: 1,
  },
  container_box_touch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_box_touch_text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3D3D3D'
  },
  border_left_right: {
    borderColor: '#EFEFEF',
    borderLeftWidth: 1,
    borderRightWidth: 1
  },
  bg_text_darkinfo: {
    backgroundColor: '#468F80'
  }

});
