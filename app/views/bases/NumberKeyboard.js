/**
 * desc：  虚拟纯数字键盘
 * author：DestinyJun
 * date：  2020/3/30 20:44
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Vibration} from 'react-native';
import {Icon} from 'react-native-elements';

export class NumberKeyboard extends Component {
  static defaultProps = {
    // 这里是设置props默认属性的值
    enterChange: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      placeholder: '输入自定义编号',
      color: '#7D7D7D',
      text: ''
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textInput}>
          <Text style={[styles.textInput_area,this.state.text?styles.textInput_area_h5: null]}>
            {this.state.text?this.state.text:this.state.placeholder}
          </Text>
          <TouchableOpacity
            style={styles.textInput_icon}
            onPress={() => {
              this.setState({text: ''});
              Vibration.vibrate( 50,false);}
            }>
            <Icon type={'font-awesome'} name={'times-circle'} color={'#999999'} size={20}/>
          </TouchableOpacity>
        </View>
        <View style={styles.keyboard}>
          <View style={styles.container_box}>
            {
              ['1','2','3'].map((number,index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    this.keyboardTouch(number)
                  }}
                  style={[styles.container_box_touch,index===1?styles.border_left_right:null]}>
                  <Text style={styles.container_box_touch_text}>{number}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
          <View style={styles.container_box}>
            {
              ['4','5','6'].map((number,index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    this.keyboardTouch(number)
                  }}
                  style={[styles.container_box_touch,index===1?styles.border_left_right:null]}>
                  <Text style={styles.container_box_touch_text}>{number}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
          <View style={styles.container_box}>
            {
              ['7','8','9'].map((number,index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    this.keyboardTouch(number)
                  }}
                  style={[styles.container_box_touch,index===1?styles.border_left_right:null]}>
                  <Text style={styles.container_box_touch_text}>{number}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
          <View style={styles.container_box}>
            {
              ['del','0','enter'].map((item,index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    this.keyboardTouch(item)
                  }}
                  style={[
                    styles.container_box_touch,
                    index===1?styles.border_left_right:null,
                    index===2?styles.bg_text_darkinfo:null
                  ]}>
                  {
                    item === 'del'?( <Icon name={'backspace'} type={'material'} color={'#3D3D3D'} iconStyle={[{transform: [{rotateY:'180deg'}]}]}/>):
                      (<Text style={[styles.container_box_touch_text,index===2?styles.text_darkinfo:null]}>{item === 'enter'?'查询':item}</Text>)
                  }
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
      </View>
    );
  }
  // 键盘触摸返回
  keyboardTouch = (value) => {
    Vibration.vibrate( 50,false);
    if (value === 'enter') {
      if (this.state.text) {
        this.props.enterChange(this.state.text);
      }
      return;
    }
    if (value === 'del') {
      this.setState({
        text: this.state.text.slice(0,this.state.text.length-1)
      });
      return;
    }
    if (this.state.text.length>20) {
      return;
    }
    this.setState((state,props) => {
      return {
        text: state.text + value
      }
    })
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    borderColor: '#F5F5F5',
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput_area: {
    fontSize: 18,
    flex: 5,
    color: '#7D7D7D'
  },
  textInput_area_h5: {
    color: '#2F2F2F',
    fontSize: 24,
    fontWeight: '700'
  },
  textInput_icon: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -15,
  },
  keyboard: {
    flex: 5
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
    backgroundColor: '#468F80',
  },
  text_darkinfo: {
    color: '#FFFFFF',
  }
});
