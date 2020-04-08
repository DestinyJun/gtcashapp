/**
 * desc：  超市商品入库养样式
 * author：DestinyJun
 * date：  2020/4/6 14:20
 */
import {StyleSheet} from 'react-native';

export const MarketStoreScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFill,
    backgroundColor: 'black',
  },
  // 相机样式
  camera: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 3
  },
  camera_preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  camera_preview_mask: {
    flex: 1,
    ...StyleSheet.absoluteFill,
    zIndex: 999,
    justifyContent: 'space-between'
  },
  box_top: {
    width: '100%',
    height: '35%',
    backgroundColor: 'rgba(23,23,23,0.3)',
  },
  box_center: {
    width: '100%',
    height: '55%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  box_center_left: {
    height: '100%',
    width: '10%',
    backgroundColor: 'rgba(23,23,23,0.3)',
  },
  box_center_right: {
    height: '100%',
    width: '10%',
    backgroundColor: 'rgba(23,23,23,0.3)',
  },
  box_center_line: {
    flex: 0,
    height: 2,
    width: '80%',
    backgroundColor: '#02FECA',
  },
  box_bottom: {
    width: '100%',
    height: '10%',
    backgroundColor: 'rgba(23,23,23,0.3)',
    // alignSelf: 'stretch'
  },
  // 商品列表样式
  goods: {
    flex: 5,
    backgroundColor: '#FAFFFE',
    borderColor: '#468F80',
    borderTopWidth: 5,
  },
  goods_content: {
    flex: 7,
  },
  goods_bottom: {
    flex: 1,
    backgroundColor: '#468F80',
    ...c_styles.flex_center
  },
  // 头部弹窗菜单
  select_down: {
    position: 'absolute',
    right: 14,
    top: 70,
    width: 150,
    zIndex: 9999,
    borderRadius: 5,
    ...c_styles.bg_white,
    ...c_styles.pl_3,
    ...c_styles.pr_3,
  },
  select_down_list: {
    flex: 1,
    ...c_styles.pt_3,
    ...c_styles.pb_3,
    ...c_styles.flex_center,
  },
  select_down_text: {
    color: '#3C3C3C',
    ...c_styles.h6,
  },
  // 手动查询入库弹窗
  modal_mask: {
    flex:1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: '100%',
    justifyContent: 'flex-end'
  },
  modal_container: {
    ...c_styles.h_60,
    backgroundColor: '#FFFFFF',
  },
  modal_header: {
    height: 50,
    flexDirection: 'row',
    paddingRight: 25,
    ...c_styles.flex_center,
    borderColor: '#EFEFEF',
    borderBottomWidth: 1
  },
  modal_header_left: {
    height: '100%',
    width: 50,
    ...c_styles.flex_center,
  },
  modal_content: {
    flex: 1,
    borderColor: '#F5F5F5',
  },
  modal_content_btn: {
    position: 'absolute',
    height: 60,
    bottom: 0,
    ...c_styles.w_100,
    ...c_styles.bg_darkinfo,
    ...c_styles.flex_center
  },
  modal_content_list: {
    flex: 1,
    position: 'relative',
  },
});
