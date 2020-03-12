import {StyleSheet} from 'react-native';
const login_styles = StyleSheet.create({
  login:{
    flex:1,
    backgroundColor: 'white',
  },
  logo: {
    flex:1,
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
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'blue',
  },
  input_select: {
    height:50,
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
    width: '94%',
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
  input_username: {
    height:50,
    backgroundColor: 'yellow',
  },
  input_password:{
    height:50,
    backgroundColor: 'yellow',
  },
  button: {
    flex:1,
    backgroundColor: 'red',
  }
});
export default login_styles;

