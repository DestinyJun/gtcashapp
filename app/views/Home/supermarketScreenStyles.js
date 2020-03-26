/**
 * desc：  超市样式
 * author：DestinyJun
 * date：  2020/3/23 22:09
 */
import {StyleSheet} from 'react-native';

export const supermarketScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  camera: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 3
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
  }
});
