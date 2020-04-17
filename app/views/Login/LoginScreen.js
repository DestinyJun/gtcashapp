import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar, ToastAndroid,
} from 'react-native';
import {LoginStyles as styles} from './LoginStyles';
// 第三方库
import SwitchSelector from 'react-native-switch-selector';
import {Card} from 'react-native-shadow-cards';
import {SelectInput} from '../bases/SelectInput';
import {Icon} from 'react-native-elements';
// 自定义工具
import {post} from '../../service/Interceptor';
import api from '../../service/Api';
import {LocalStorage} from '../../util';
import {startUpPageAtion} from '../../Redux/actionCreators';
import store from '../../Redux/store';


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
      select_icon_transform: false,
    };
  }

  render() {
    return (
      <View style={[styles.login, c_styles.w_100, c_styles.dim_height]}>
        <StatusBar animated={true} backgroundColor={'white'} barStyle={'dark-content'}/>
        <View style={styles.logo}>
          <Card cornerRadius={5} opacity={1} elevation={20} style={[styles.logo_img]}>
            <Image source={require('../../assets/images/收银台.png')} style={[styles.logo_img_Image]}/>
          </Card>
          <View style={[c_styles.pt_5]}>
            <Text style={[c_styles.text_darkinfo, c_styles.h5]}>服务区收银系统</Text>
          </View>
        </View>
        <View style={[styles.input, c_styles.pl_3, c_styles.pr_3]}>
          <View elevation={10} style={[styles.input_user, c_styles.mb_2]}>
            <View style={[c_styles.cell, c_styles.w_100, styles.input_user_user]}>
              <TextInput
                style={[c_styles.pl_5, styles.input_user_text, c_styles.cell, c_styles.h5]}
                placeholder={'请输入用户名...'}
                keyboardType={'email-address'}
                placeholderTextColor={'#90DACB'}
                onChangeText={(text) => {
                  this.login.user = text;
                }}
              />
            </View>
            <View style={[c_styles.cell, c_styles.w_100, styles.input_user_password]}>
              <TextInput
                style={[c_styles.pl_5, c_styles.cell, c_styles.h5]}
                placeholder={'请输入密码...'}
                placeholderTextColor={'#90DACB'}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.login.password = text;
                }}
              />
            </View>
          </View>
          <View style={[styles.input_select, c_styles.pt_5, c_styles.mb_2]}>
            <View>
              <SelectInput
                btnTitle={'请选择店铺...'}
                btnTitleSize={18}
                btnTitleColor={'#97DCCE'}
                containerStyles={styles.selectContainerStyles}
                activeOptionBgColor={'#468F80'}
                activeSelectOptionTextColor={'white'}
                selectOptionTextColor={'#468F80'}
                selectOptionStyles={styles.selectOptionStyles}
                selectContainerHeight={120}
                selectContainerBgColor={'#F0F0F0'}
                options={this.state.input_select_data}
                selectWillShow={this.selectWillShow}
                selectWillHide={this.selectWillHide}
                selectChange={this.selectOnSelect}
              />
              <Icon
                type={'font-awesome'}
                name={'angle-down'}
                color={'#97DCCE'}
                size={20}
                containerStyle={[
                  styles.input_select_icon,
                  this.state.select_icon_transform && c_styles.transform_90
              ]}/>
            </View>
          </View>
          <View style={[styles.input_switch, c_styles.pt_5]}>
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
              style={[c_styles.h5, c_styles.text_darkinfo, c_styles.ml_3, styles.input_switch_text]}>忘记密码？</Text>
          </View>
        </View>
        <View style={[styles.button, c_styles.pl_3, c_styles.pr_3, c_styles.pt_4]}>
          <TouchableOpacity
            style={[c_styles.w_100, styles.button_touch, c_styles.pr_3]}
            onPress={this.loginClick}
            title="登陆"
          >
            <View style={[c_styles.row, styles.button_touch_view]}>
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
        const arr = [];
        res.data.forEach((item) => {
          arr.push(Object.assign({},{name: item.merchatName,value: item.merchatCode}));
        });
        this.setState({
          input_select_data: arr
        });
      })
      .catch(err => {
        ToastAndroid.show(err.msg,1000)
      });
  };
  selectWillHide = () => {
    this.setState({
      select_icon_transform: false,
    });
  };
  selectOnSelect = (res) => {
    this.login.merchatCode = res.value;
  };
  loginClick = () => {
    post(api.LOGIN_URL, this.login)
      .then((res) => {
        LocalStorage.set('merchatCode', res.data.merchatCode);
        LocalStorage.set('userId', res.data.userId);
        LocalStorage.set('APPKEY', res.data.APPKEY);
        LocalStorage.set('serverId', res.data.serverId);
        const action = startUpPageAtion({
          isLoading: false,
          userToken: true,
        });
        store.dispatch(action);
      })
      .catch(err => {
        ToastAndroid.show(err.msg,1000)
      });
  };
};


