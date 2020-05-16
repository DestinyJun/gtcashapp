import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar, ToastAndroid,
} from 'react-native';
import {LoginStyles as styles} from './LoginStyles';
// 第三方库
import SwitchSelector from 'react-native-switch-selector';
import {Card} from 'react-native-shadow-cards';
import {SelectInput} from '../bases/SelectInput';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-translucent-modal';
// 自定义工具
import {post,get} from '../../service/Interceptor';
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
      thisUserId: '-1', // 本次交班的code
      thisShiftCode: null, // 上次交班的code
      nextShiftCode: null // 本次交班的code
    };
    this.state = {
      input_select_data: [],
      select_icon_transform: false,
      modalBroken: false,
      modalShift: false,
      modalShiftOptions: [
        { value: 0, name: '请选择班别...' }
      ]
    };
    this.timer = null;
  }
  render() {
    return (
      <View style={[styles.login, c_styles.w_100, c_styles.dim_height]}>
        {/*<StatusBar animated={true} backgroundColor={'white'} barStyle={'dark-content'}/>*/}
        {/*顶部LOGO*/}
        <View style={styles.logo}>
          <Card cornerRadius={5} opacity={1} elevation={20} style={[styles.logo_img]}>
            <Image source={require('../../assets/images/收银台.png')} style={[styles.logo_img_Image]}/>
          </Card>
          <View style={[c_styles.pt_5]}>
            <Text style={[c_styles.text_darkinfo, c_styles.h5]}>服务区收银系统</Text>
          </View>
        </View>
        {/*输入表单组*/}
        <View style={[styles.input, c_styles.pl_3, c_styles.pr_3]}>
          {/*用户名及密码*/}
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
          {/*选择店铺*/}
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
          {/*记住我*/}
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
        {/*登陆按钮*/}
        <View style={[styles.button, c_styles.pl_3, c_styles.pr_3, c_styles.pt_4,c_styles.w_100]}>
          <TouchableOpacity
            style={[styles.button_touch, c_styles.pr_3,c_styles.pl_3,c_styles.bg_darkinfo]}
            onPress={() => {
              this.setState({
                modalBroken: true
              });
            }}
          >
            <View style={[c_styles.row, styles.button_touch_view]}>
              <Text style={[c_styles.text_light, c_styles.h5]}>断线重连</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button_touch, c_styles.pr_3,c_styles.pl_3,c_styles.bg_danger]}
            onPress={this.loginClick}
          >
            <View style={[c_styles.row, styles.button_touch_view]}>
              <Text style={[c_styles.text_light, c_styles.h5]}>交班登陆</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* 短线重连弹窗 */}
        <Modal
          transparent={true}
          animationType={'fade'}
          onRequestClose={() => {
            console.log('关闭了');
          }}
          visible={this.state.modalBroken}>
          <View style={[styles.modal_broken,c_styles.w_100,c_styles.h_100]}>
            <View style={[c_styles.bg_white,c_styles.pl_3,c_styles.pr_3,c_styles.pb_3,{borderRadius: 5}]}>
              <View>
                <Text style={[c_styles.h4,c_styles.text_darkinfo,c_styles.text_center,c_styles.pt_2,c_styles.pb_2]}>交班登陆</Text>
              </View>
              <View style={[styles.modal_broken_content]}>
                <View style={[{flex: 1,justifyContent: 'center'}]}>
                  <Text style={[c_styles.h5,{color: '#515457'}]}>选择班别：</Text>
                </View>
                <View style={[{flex: 3, position:'relative'}]}>
                  <SelectInput
                    btnTitle={'请选择班别...'}
                    btnTitleSize={18}
                    btnTitleColor={'#7E8388'}
                    btnIcon={() => (<Icon type={'font-awesome'} name={'unsorted'} color={'#343A40'} size={18} />)}
                    containerStyles={styles.modalSelectContainerStyles}
                    activeOptionBgColor={'#468F80'}
                    activeSelectOptionTextColor={'white'}
                    selectOptionTextColor={'#468F80'}
                    selectOptionStyles={styles.selectOptionStyles}
                    selectContainerHeight={120}
                    selectContainerBgColor={'#F0F0F0'}
                    options={this.state.modalShiftOptions}
                    selectChange={this.modalSelectChange.bind(this,'broken')}
                  />
                </View>
              </View>
              <View style={[{flexDirection: 'row',justifyContent: 'space-around'},c_styles.pt_3]}>
                <TouchableOpacity
                  style={[styles.button_touch, c_styles.pr_3,c_styles.pl_3,c_styles.bg_danger]}
                  onPress={() => {
                    this.setState({
                      modalBroken: false
                    });
                  }}>
                  <View style={[c_styles.row, styles.button_touch_view]}>
                    <Text style={[c_styles.text_light, c_styles.h5]}>关闭</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button_touch, c_styles.pr_3,c_styles.pl_3,c_styles.bg_darkinfo]}
                  onPress={() => {
                    this.setState({
                      modalBroken: false
                    });
                    this.loginClick('broken');
                  }}>
                  <View style={[c_styles.row, styles.button_touch_view]}>
                    <Text style={[c_styles.text_light, c_styles.h5]}>登陆</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  componentDidMount(): void {}
  componentWillUnmount(): void {}

  selectWillShow = async () => {
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
  selectOnSelect = (item) => {
    if (item !== null) {
      this.login.merchatCode = item.value;
      get(`/user/getShiftName`, { merchatCode: item.value })
        .then((res) => {
          const arr = [
            { value: null, name: '请选择班别...' }
          ];
          res.data.map((item) => {
            arr.push(Object.assign({}, { value: item.shiftCode, name: item.shiftName }))
          });
          this.setState({
            modalShiftOptions: arr
          })
        })
    }
  };
  modalSelectChange (flag,item) {
    if (flag === 'broken') {
      this.login.thisShiftCode = item.value;
      return;
    }
    if (flag === 'select') {
      this.d_shiftMemberOptions = [
        { text: '无交班登陆', value: '-1' }
      ];
      this.login.thisShiftCode = item;
      this.post(`/user/getSuccessor`, { merchatCode: this.login.merchatCode, shiftCode: item.value })
        .then((res) => {
          console.log(res);
          res.data.map((item) => {
            // this.d_shiftMemberOptions.push(Object.assign({}, { value: item.thisUserId, text: item.thisUserName }))
          })
        })
    }
    else {
      this.login.nextShiftCode = item
    }
  };
  loginClick = (flag) => {
    if (flag === 'broken') {
      const login = Object.assign({}, {
        user: this.login.user,
        password: this.login.password,
        shiftCode: this.login.thisShiftCode,
        merchatCode: this.login.merchatCode
      });
      post(`/user/shift/brokenLineLogin`, login)
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
    }
    else {
      post(`/user/shift/login`, this.login)
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
    }
  };
}


