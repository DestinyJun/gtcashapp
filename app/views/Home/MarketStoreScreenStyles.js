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
});
