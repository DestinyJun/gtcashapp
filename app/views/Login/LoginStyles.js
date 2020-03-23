import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  login:{
    flex:1,
    backgroundColor: 'white',
    position: 'absolute',
  },
  logo: {
    flex:3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo_img:{
    height: 150,
    width: 150,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  logo_img_Image: {
    width: 80,
    height: 80
  },
  input: {
    flex: 3,
    justifyContent: 'flex-start',
  },
  input_user: {
    height: 120,
    backgroundColor: '#EFFAF0',
    borderRadius: 5
  },
  input_user_username: {

  },
  input_user_password:{
    borderTopColor: 'rgba(212,212,212,0.3)',
    borderTopWidth: 1,
  },
  input_user_text: {
    color: 'red',
  },
  input_select: {
    flex: 1,
    position: 'relative'
  },
  input_select_dropdown: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#F5F5F5',
  },
  input_select_text: {
    color: 'red',
    textAlign: 'center'
  },
  input_select_dropdown_list: {
    width: '91.5%',
    borderColor: 'rgba(201,201,201,0.8)',
    borderWidth: 1,
    borderRadius: 3,
  },
  input_select_dropdown_text: {
    color: 'green'
  },
  input_select_icon:{
    position: 'absolute',
    right: 10,
    fontSize: 20,
    top: '50%',
    marginTop: -10,
  },
  input_switch: {
    flex: 1,
    flexDirection: 'row'
  },
  input_switch_text: {
    textDecorationLine: 'underline',
    textDecorationColor: 'red',
    textDecorationStyle:'dashed',
    marginLeft: 'auto',
    textAlign: 'right',
  },
  button: {
    flex:2,
  },
  button_touch: {
    height: 60,
    backgroundColor: '#468F80',
    borderRadius: 50
  },
  button_touch_view: {
    justifyContent: 'center',
    alignItems: 'center'
  },
});

