/**
 * desc：  ProFileScreen屏幕样式
 * author：DestinyJun
 * date：  2020/3/23 22:07
 */
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  header: {
    flex: 4,
    ...c_styles.flex_center,
    ...c_styles.bg_white,
    ...c_styles.m_3,
  },
  header_img: {
    width: 120,
    height: 120,
    borderRadius: 120
  },
  list: {
    flex: 6,
  },
  list_box: {
    ...c_styles.bg_white,
    ...c_styles.p_2,
    ...c_styles.m_3,
    borderRadius: 5
  },
  list_item: {
    borderColor: '#ECF4F2',
    borderWidth: 1,
    borderRadius: 8,
    ...c_styles.pl_3,
    ...c_styles.pr_3,
  },
  list_password: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    ...c_styles.p_5,
    borderColor: '#ECF4F2',
    borderBottomWidth: 1,
  },
  list_update: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    ...c_styles.p_5
  }
});
