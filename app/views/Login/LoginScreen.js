import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ToastAndroid,
  DeviceEventEmitter
} from 'react-native';
import {Card} from 'react-native-shadow-cards';
// 样式文件
import {LoginStyles} from './LoginStyles';
// 第三方库
import ModalDropdown from 'react-native-modal-dropdown';
import SwitchSelector from 'react-native-switch-selector';
import Icon from 'react-native-vector-icons/FontAwesome';
// 自定义工具
import {post} from '../../service/Interceptor';
import api from '../../service/Api';
import {LocalStorage} from '../../util';
import {startUpPageAtion} from "../ReduxHome/actionCreators";
import store from "../ReduxHome/store";

// 自定义常量
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.login = {
      user: String,
      password: String,
      merchatCode: '',
    };
    this.state = {
      input_select_data: null,
      input_select_defaultValue: '请选择店铺...',
      input_select_value: null,
      select_icon_transform: false,
      gender: null,
    };
  }
  render() {
    return (
      <View style={[LoginStyles.login, c_styles.w_100, c_styles.dim_height]}>
        <StatusBar animated={true} backgroundColor={'white'} barStyle={'dark-content'}/>
        <View style={LoginStyles.logo}>
          <Card cornerRadius={5} opacity={1} elevation={20} style={[LoginStyles.logo_img]}>
            <Image source={require('../../assets/images/收银台.png')} style={[LoginStyles.logo_img_Image]}/>
          </Card>
          <View style={[c_styles.pt_5]}>
            <Text style={[c_styles.text_darkinfo, c_styles.h5]}>服务区收银系统</Text>
          </View>
        </View>
        <View style={[LoginStyles.input, c_styles.pl_3, c_styles.pr_3]}>
          <View elevation={10} style={[LoginStyles.input_user, c_styles.mb_2]}>
            <View style={[c_styles.cell, c_styles.w_100, LoginStyles.input_user_user]}>
              <TextInput
                style={[c_styles.pl_5, LoginStyles.input_user_text, c_styles.cell, c_styles.h5]}
                placeholder={'请输入用户名...'}
                keyboardType={'email-address'}
                placeholderTextColor={'#90DACB'}
                onChangeText={(text) => {
                  this.login.user = text;
                }}
              />
            </View>
            <View style={[c_styles.cell, c_styles.w_100, LoginStyles.input_user_password]}>
              <TextInput
                style={[c_styles.pl_5,c_styles.cell, c_styles.h5]}
                placeholder={'请输入密码...'}
                placeholderTextColor={'#90DACB'}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.login.password = text;
                }}
              />
            </View>
          </View>
          <View style={[LoginStyles.input_select, c_styles.pt_5, c_styles.mb_2]}>
            <View>
              <ModalDropdown
                ref={ref => {
                  this.modelDown = ref;
                }}
                style={[LoginStyles.input_select_dropdown, c_styles.mt_2]}
                textStyle={[LoginStyles.input_select_text, c_styles.pt_3, c_styles.pb_3, c_styles.h6, c_styles.text_darkinfo]}
                dropdownStyle={[LoginStyles.input_select_dropdown_list]}
                options={this.state.input_select_data}
                defaultValue={this.state.input_select_defaultValue}
                renderButtonText={(rowData) => this.selectRenderButtonText(rowData)}
                onDropdownWillShow={this.selectWillShow}
                onDropdownWillHide={this.selectWillHide}
                renderRow={this.selectRenderRow}
                onSelect={(idx, value) => this.selectOnSelect(idx, value)}
              />
              <Icon name={'angle-down'} style={[
                LoginStyles.input_select_icon, c_styles.text_darkinfo,
                this.state.select_icon_transform && c_styles.transform_90,
              ]}/>
            </View>
          </View>
          <View style={[LoginStyles.input_switch, c_styles.pt_5]}>
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
              textContainerStyle={[{width: 50}]}
              selectedTextContainerStyle={[{width: 50}]}
              options={[
                {label: '否', value: 0, activeColor: '#FFFFFF'},
                {label: '是', value: 1, activeColor: '#FFFFFF'},
              ]}
            />
            <Text style={[c_styles.h5, c_styles.text_darkinfo, c_styles.ml_3]}>记住我</Text>
            <Text
              style={[c_styles.h5, c_styles.text_darkinfo, c_styles.ml_3, LoginStyles.input_switch_text]}>忘记密码？</Text>
          </View>
        </View>
        <View style={[LoginStyles.button, c_styles.pl_3, c_styles.pr_3, c_styles.pt_4]}>
          <TouchableOpacity
            style={[c_styles.w_100, LoginStyles.button_touch, c_styles.pr_3]}
            onPress={this.loginClick}
            title="登陆"
          >
            <View style={[c_styles.row, LoginStyles.button_touch_view]}>
              <Text style={[c_styles.text_light, c_styles.h5, c_styles.mr_1]}>登</Text>
              <Text style={[c_styles.text_light, c_styles.h5, c_styles.ml_1]}>陆</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  selectWillShow = () => {
    this.setState({
      select_icon_transform: true,
    });
    post(api.SHOP_LIST_URL, {user: this.login.user})
      .then((res) => {
        this.setState({
          input_select_data: res,
          input_select_defaultValue: '请选择店铺...',
        });
      })
      .catch(err => {
        this.setState({
          select_input_data: null,
          input_select_defaultValue: '暂无店铺信息...',
          select_icon_transform: false,
        });
        this.modelDown.hide();
        ToastAndroid.showWithGravity(err.msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
      });
  };
  selectWillHide = () => {
    this.setState({
      select_input_data: null,
      input_select_defaultValue: '请选择店铺...',
      select_icon_transform: false,
    });
  };
  selectOnSelect = (idx, value) => {
    this.setState({
      input_select_value: value,
    });
    this.login.merchatCode = value.merchatCode;
  };
  selectRenderButtonText = (rowData) => {
    const {merchatName, merchatCode} = rowData;
    return `${merchatName}`;
  };
  selectRenderRow = (rowData, rowID, highlighted) => {
    return (
      <TouchableOpacity style={LoginStyles.input_select_dropdown_text}>
        <Text style={[highlighted ? c_styles.text_darkinfo : {color: '#2A2A2A'}]}>
          {`${rowData.merchatName}`}
        </Text>
      </TouchableOpacity>
    );
  };
  loginClick = () => {
    post(api.LOGIN_URL, this.login)
      .then((res) => {
        LocalStorage.set('merchatCode', res.merchatCode);
        LocalStorage.set('userId', res.userId);
        LocalStorage.set('APPKEY', res.APPKEY);
        // DeviceEventEmitter.emit('loginChange',true);
          const  action = startUpPageAtion({
              isLoading: false,
              userToken: true
          });
          store.dispatch(action);
      })
      .catch(e => {
        console.log(e);
        ToastAndroid.showWithGravity(e.msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
      });
  };
};


