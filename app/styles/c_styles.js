import {StyleSheet, Dimensions} from 'react-native';
global.c_styles = StyleSheet.create({
  text_danger:{
    color: 'red'
  },
  text_info: {
    color: '#17A2B8'
  },
  text_secondary: {
    color: '#A0A2A7'
  },
  text_darkinfo: {
    color: '#468F80'
  },
  text_light: {
    color: '#F8F9FA'
  },
  text_white:{
    color: '#FFFFFF'
  },
  text_center: {
    textAlign: 'center'
  },
  bg_primary:{
    backgroundColor: '#007BFF'
  },
  bg_secondary:{
    backgroundColor: '#6C757D'
  },
  bg_success:{
    backgroundColor: '#28A745'
  },
  bg_danger:{
    backgroundColor: '#DC3545'
  },
  bg_warning:{
    backgroundColor: '#FFC107'
  },
  bg_info:{
    backgroundColor: '#17A2B8'
  },
  bg_light:{
    backgroundColor: '#F8F9FA'
  },
  bg_dark:{
    backgroundColor: '#343A40'
  },
  bg_white:{
    backgroundColor: '#FFFFFF'
  },
  bg_transparent:{
    backgroundColor: 'transparent'
  },
  bg_darkinfo:{
    backgroundColor: '#468F80'
  },
  flex_center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  justify_end: {
    justifyContent: 'flex-end'
  },
  p_1: {
    padding: '1%',
  },
  p_3: {
    padding: '3%',
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
  pl_1:{
    paddingLeft: '1%'
  },
  pl_2:{
    paddingLeft: '2%'
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
  m_1: {
    margin: '1%',
  },
  ml_1:{
    marginLeft: '1%'
  },
  ml_3:{
    marginLeft: '3%'
  },
  ml_5:{
    marginLeft: '5%'
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
  mb_2: {
    marginBottom: '2%'
  },
  mb_3: {
    marginBottom: '3%'
  },
  p_clear: {
    padding: 0
  },
  m_clear: {
    margin: 0
  },
  h1:{
    fontSize: 40
  },
  h2:{
    fontSize: 30
  },
  h3:{
    fontSize: 25
  },
  h4:{
    fontSize: 20,
    fontWeight: '600'
  },
  h5:{
    fontSize: 18
  },
  h6:{
    fontSize: 16
  },
  h_small:{
    fontSize: 12
  },
  h_50: {
    height: '50%'
  },
  h_100: {
    height: '100%'
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
