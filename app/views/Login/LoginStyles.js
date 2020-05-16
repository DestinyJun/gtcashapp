import {StyleSheet} from 'react-native';
export const LoginStyles = StyleSheet.create({
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
  input_select: {
    flex: 1,
    position: 'relative'
  },
  selectOptionStyles: {
    backgroundColor: 'white',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 5,
    borderColor: '#F3F3F3',
    borderTopWidth: 1
  },
  selectContainerStyles: {
    backgroundColor: '#EFFAF0',
    height: 60,
    alignItems: 'center',
  },
  input_select_dropdown_text: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  input_select_icon:{
    position: 'absolute',
    right: 10,
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
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button_touch: {
    height: 50,
    borderRadius: 5
  },
  button_touch_view: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal_broken: {
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modal_broken_content: {
    flexDirection: 'row'
  },
  modalSelectContainerStyles: {
    height: 60,
    alignItems: 'center',
    borderColor: '#CED4DA',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15
  },
});

