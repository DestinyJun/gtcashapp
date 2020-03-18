import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native'
global.c_styles = StyleSheet.create({
  text_danger:{
    color: 'red'
  },
  text_info: {
    color: '#17A2B8'
  },
  text_darkinfo: {
    color: '#468F80'
  },
  text_white: {
    color: '#FFFFFF'
  },
  text_center: {
    textAlign: 'center'
  },
  p_2:{
    paddingTop: '2%',
    paddingBottom: '2%',
    paddingLeft: '2%',
    paddingRight: '2%'
  },
  pt_1: {
    paddingTop: '1%'
  },
  pt_2: {
    paddingTop: '2%'
  },
  pt_3: {
    paddingTop: '3%'
  },
  pt_4: {
    paddingTop: '4%'
  },
  pt_5: {
    paddingTop: '5%'
  },
  pb_1: {
    paddingBottom: '1%'
  },
  pb_2: {
    paddingBottom: '2%'
  },
  pb_3: {
    paddingBottom: '3%'
  },
  pb_4: {
    paddingBottom: '4%'
  },
  pb_5: {
    paddingBottom: '5%'
  },
  pl_3:{
    paddingLeft: '3%'
  },
  pl_4:{
    paddingLeft: '4%'
  },
  pl_5:{
    paddingLeft: '5%'
  },
  pr_3:{
    paddingRight: '3%'
  },
  pr_4:{
    paddingRight: '4%'
  },
  pr_5:{
    paddingRight: '5%'
  },
  ml_1:{
    marginLeft: '1%'
  },
  ml_3:{
    marginLeft: '3%'
  },
  mr_1:{
    marginRight: '1%'
  },
  mr_3:{
    marginRight: '3%'
  },
  mt_2: {
    marginTop: '2%'
  },
  mt_3: {
    marginTop: '3%'
  },
  mt_5: {
    marginTop: '5%'
  },
  h5:{
    fontSize: 18
  },
  h6:{
    fontSize: 16
  },
  h_50: {
    height: '50%'
  },
  w_50:{
    width: '50%'
  },
  w_100:{
    width: '100%'
  },
  dim_height: {
    height: Dimensions.get('window').height
  },
  bg_primary:{
    backgroundColor: '#007BFF'
  },
  row: {
    flex: 1,
    flexDirection: 'row',

  },
  cell: {
    flex: 1,
  },
  transform_90: {
    transform: [{rotate:'180deg'}]
  }
});
// export default c_styles
