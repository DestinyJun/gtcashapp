/**
 * desc：  超市样式
 * author：DestinyJun
 * date：  2020/3/23 22:09
 */
import {StyleSheet} from 'react-native';

export const MarketScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
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
  shop: {
    flex: 5,
    justifyContent: 'center',
    backgroundColor: '#FAFFFE',
    borderColor: '#468F80',
    borderTopWidth: 5,
  },
  shop_content: {
    flex: 7,
  },
  shop_bottom: {
    flex: 1,
    borderColor: 'rgba(236,239,238,0.3)',
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  shop_bottom_price: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shop_bottom_settle: {
    flex: 3,
    backgroundColor: '#468F80',
    alignItems: 'center',
    justifyContent: 'center'
  },
});