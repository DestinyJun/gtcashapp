/**
 * desc：  无条码商品页样式
 * author：DestinyJun
 * date：  2020/4/8 17:21
 */
import {StyleSheet} from 'react-native';

export const AddNoCodeGoodsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    ...c_styles.pt_3,
    justifyContent: 'space-between'
  },
  list: {
    ...c_styles.bg_white,
    ...c_styles.pl_3,
    ...c_styles.pr_3,
  },
  list_content: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#F4F4F4',
    borderBottomWidth: 1,
  },
  list_content_text: {
    ...c_styles.h4,
    width: '40%'
  },
  list_content_input: {
    height: 60,
    fontSize: 20,
    color: '#2B2B2B'
  },
  bottom: {
    ...c_styles.bg_darkinfo,
    ...c_styles.flex_center,
    ...c_styles.pt_5,
    ...c_styles.pb_5,
  }
});
