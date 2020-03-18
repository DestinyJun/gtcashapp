import React, {Component} from 'react';
import {Text, View, Image, TouchableHighlight,TextInput} from 'react-native';
import {Card} from 'react-native-shadow-cards';
// 样式文件
import login_styles from './LoginStyles';
// 第三方库
import ModalDropdown from 'react-native-modal-dropdown';
import SwitchSelector from "react-native-switch-selector";
import Icon from 'react-native-vector-icons/FontAwesome';
// 自定义工具
import {post} from '../../service/Interceptor';
import api from '../../service/Api'
import {localStorage} from '../../util'

// 自定义常量
// const debounce = require('lodash.debounce');
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.login ={
      user: String,
      password: String,
      merchatCode: '',
    };
    this.state = {
      input_select_data: null,
      input_select_defaultValue: '请选择店铺...',
      input_select_value: '请选择店铺...',
      select_icon_transform: false,
      gender: null
    };
  }
  render() {
    return (
      <View style={[login_styles.login,c_styles.w_100,c_styles.dim_height]}>
        <View style={login_styles.logo}>
          <Card cornerRadius={5} opacity={1} elevation={20} style={[login_styles.logo_img]}>
            <Image source={require('../../assets/images/收银台.png')} style={[login_styles.logo_img_Image]}/>
          </Card>
          <View style={[c_styles.pt_5]}>
            <Text style={[c_styles.text_darkinfo,c_styles.h5]}>服务区收银系统</Text>
          </View>
        </View>
        <View style={[login_styles.input,c_styles.pl_3,c_styles.pr_3]}>
          <View elevation={10} style={[login_styles.input_user]}>
            <View style={[c_styles.cell,c_styles.w_100,login_styles.input_user_user]}>
              <TextInput
                style={[c_styles.pl_5,login_styles.input_user_text,c_styles.cell,c_styles.h5]}
                placeholder={'请输入用户名...'}
                placeholderTextColor={'#90DACB'}
                onChangeText={(text)=>{this.login.user = text}}
              />
            </View>
            <View style={[c_styles.cell,c_styles.w_100,login_styles.input_user_password]}>
              <TextInput
                style={[c_styles.pl_5,login_styles.input_user_text,c_styles.cell,c_styles.h5]}
                placeholder={'请输入密码...'}
                placeholderTextColor={'#90DACB'}
                password={true}
                onChangeText={(text)=>{this.login.password = text}}
              />
            </View>
          </View>
          <View style={[login_styles.input_select,c_styles.pt_5]}>
            <View>
             {/* <ModalDropdown
                style={[login_styles.input_select_dropdown,c_styles.mt_2]}
                textStyle={[login_styles.input_select_text,c_styles.pt_3,c_styles.pb_3,c_styles.h6,c_styles.text_darkinfo]}
                dropdownStyle={[login_styles.input_select_dropdown_list]}
                options={this.state.select_input_data}
                defaultIndex={-1}
                defaultValue={this.state.input_select_defaultValue}
                renderButtonText={(rowData) => this._input_select_renderButtonText(rowData)}
                onDropdownWillShow={this._input_select_willShow.bind(this)}
                onDropdownWillHide={this._input_select_willHide.bind(this)}
                renderRow={this._input_select_renderRow.bind(this)}
                onSelect={(idx, value) => this._input_select_onSelect(idx, value)}/>
              <Icon name={'angle-down'} style={[
                login_styles.input_select_icon,c_styles.text_darkinfo,
                this.state.select_icon_transform && c_styles.transform_90
              ]}/>*/}
            </View>
          </View>
          <View style={[login_styles.input_switch,c_styles.pt_5]}>
            <SwitchSelector
              style={[{width: 60}]}
              initial={0}
              onPress={value => console.log(value)}
              textColor={'#FE8A99'}
              selectedColor={'red'}
              buttonMargin={3}
              borderColor={'#FE8A99'}
              borderRadius={50}
              backgroundColor={'#FE8A99'}
              height={20}
              textContainerStyle={[{width:50}]}
              selectedTextContainerStyle={[{width:50}]}
              options={[
                { label: '否', value: 0,activeColor: '#FFFFFF'},
                { label: '是', value: 1,activeColor: '#FFFFFF'},
              ]}
            />
            <Text style={[c_styles.h5,c_styles.text_darkinfo,c_styles.ml_3]}>记住我</Text>
            <Text style={[c_styles.h5,c_styles.text_darkinfo,c_styles.ml_3,login_styles.input_switch_text]}>忘记密码？</Text>
          </View>
        </View>
        <View style={[login_styles.button,c_styles.pl_3,c_styles.pr_3,c_styles.pt_4]}>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor={'#468F80'}
            style={[c_styles.w_100,login_styles.button_touch,c_styles.pr_3]}
            onPress={this._buttonLogin.bind(this)}
            title="登陆"
          >
            <View style={[c_styles.row,login_styles.button_touch_view]}>
              <Text style={[c_styles.text_white,c_styles.h5,c_styles.mr_3]}>登</Text>
              <Text style={[c_styles.text_white,c_styles.h5]}>陆</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  _input_select_willShow() {
    post(api.SHOP_LIST_URL,{user: this.login.user})
      .then((res) => {
        this.setState({
          select_input_data: res.data,
          input_select_defaultValue: '请选择店铺...',
        });
      })
      .catch(err => {})
  }
  _input_select_willHide() {
    this.setState({
      select_input_data: null,
      input_select_defaultValue: '请选择店铺...',
      select_icon_transform: false
    });
  }
  _input_select_onSelect(idx, value) {
    this.setState({
      input_select_value: value
    });
    this.login.merchatCode = value.merchatCode;
  }
  _input_select_renderButtonText(rowData) {
    const {merchatName, merchatCode} = rowData;
    return `${merchatName}`;
  }
  _input_select_renderRow(rowData, rowID, highlighted) {
    return (
      <TouchableHighlight underlayColor='cornflowerblue'>
        <View style={[
          login_styles.input_select_dropdown_text,
          c_styles.p_2
          ]}>
          <Text style={[highlighted?c_styles.text_darkinfo:{color: '#2A2A2A'}]}>
            {`${rowData.merchatName}`}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
  _buttonLogin() {
    post(api.LOGIN_URL,this.login)
      .then((res) => {
        console.log(res);
        localStorage.set('merchatCode', res.data.merchatCode);
        localStorage.set('userId', res.data.userId);
        localStorage.set('serverId', res.data.serverId);
        localStorage.set('APPKEY', res.data.APPKEY);
      })
      .catch(e=>console.log(e))
  }
  _test() {
    localStorage.get('APPKEY')
      .then(res => console.log(res))
  }
};


