import React, {Component} from 'react';
import {Text, View, Image, TouchableHighlight,TextInput} from 'react-native';
import {Card} from 'react-native-shadow-cards';
import ModalDropdown from 'react-native-modal-dropdown';
import login_styles from './login_styles';
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from '../bases/PickerExm_styles';

const DEMO_OPTIONS_1 = [
  {name: '店铺1',value: 1},
  {name: '店铺2',value: 2},
  {name: '店铺3',value: 3},
  {name: '店铺4',value: 4},
  {name: '店铺5',value: 5}
  ];
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown_4_options: null,
      dropdown_4_defaultValue: '请选择店铺...',
      dropdown_4_select: '请选择店铺...',
      select_icon_transform: false
    };
  }
  render() {
    return (
      <View style={login_styles.login}>
        <View style={login_styles.logo}>
          <Card cornerRadius={5} opacity={1} elevation={20} style={[login_styles.logo_img]}>
            <Image source={require('../../assets/images/收银台.png')} style={[login_styles.logo_img_Image]}/>
          </Card>
          <View style={[c_styles.pt_5]}>
            <Text style={[c_styles.text_468F80,c_styles.h5]}>服务区收银系统</Text>
          </View>
        </View>
        <View style={[login_styles.input,c_styles.pl_3,c_styles.pr_3]}>
          <View style={[c_styles.row]}>
            <View style={[c_styles.cell,login_styles.input_select]}>
              <ModalDropdown
                style={[login_styles.input_select_dropdown]}
                textStyle={[login_styles.input_select_text,c_styles.pt_3,c_styles.pb_3,c_styles.h6,c_styles.text_468F80]}
                dropdownStyle={[login_styles.input_select_dropdown_list]}
                options={this.state.dropdown_4_options}
                defaultIndex={-1}
                defaultValue={this.state.dropdown_4_defaultValue}
                renderButtonText={(rowData) => this._input_select_renderButtonText(rowData)}
                onDropdownWillShow={this._input_select_willShow.bind(this)}
                onDropdownWillHide={this._input_select_willHide.bind(this)}
                renderRow={this._input_select_renderRow.bind(this)}
                onSelect={(idx, value) => this._input_select_onSelect(idx, value)}/>
              <Icon name={'angle-down'} style={[
                login_styles.input_select_icon,c_styles.text_468F80,
                this.state.select_icon_transform && c_styles.transform_90
              ]}/>
            </View>
          </View>
          <View style={[c_styles.row]}>
            <View style={[c_styles.cell,c_styles.w_100,login_styles.input_username]}>
              <TextInput placeholder={'请输入用户名'}/>
            </View>
            <View style={[c_styles.cell,c_styles.w_100,login_styles.input_password]}>
              <TextInput placeholder={'请输入密码'}/>
            </View>
          </View>
          <View style={[c_styles.row]}>

          </View>
        </View>
        <View style={login_styles.button}></View>
      </View>
    );
  }
  _input_select_willShow() {
    console.log();
    /*setTimeout(() => this.setState({
      dropdown_4_options: DEMO_OPTIONS_1,
      dropdown_4_defaultValue: 'loaded',
    }), 50);*/
    this.setState({
      dropdown_4_options: DEMO_OPTIONS_1,
      dropdown_4_defaultValue: 'loaded',
      select_icon_transform: true
    })
  }
  _input_select_willHide() {
    this.setState({
      dropdown_4_options: null,
      dropdown_4_defaultValue: 'loading',
      select_icon_transform: false
    });
  }
  _input_select_onSelect(idx, value) {
    // BUG: alert in a modal will auto dismiss and causes crash after reload and touch. @sohobloo 2016-12-1
    //alert(`idx=${idx}, value='${value}'`);
    this.setState({
      dropdown_4_select: value
    });
    console.debug(`idx=${idx}, value='${value}'`);
  }
  _input_select_renderButtonText(rowData) {
    const {name, value} = rowData;
    return `${name}`;
  }
  _input_select_renderRow(rowData, rowID, highlighted) {
    return (
      <TouchableHighlight underlayColor='cornflowerblue'>
        <View style={[
          login_styles.input_select_dropdown_text,
          c_styles.p_2
          ]}>
          <Text style={[highlighted?c_styles.text_468F80:{color: '#2A2A2A'}]}>
            {`${rowData.name}`}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

