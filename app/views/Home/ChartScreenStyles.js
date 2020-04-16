/**
 * desc：  ChartScreen样式表
 * author：DestinyJun
 * date：  2020/4/3 14:12
 */
import {StyleSheet} from 'react-native';

export const ChartScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12
  },
  header: {
    flex: 1,
    ...c_styles.bg_white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...c_styles.pl_3,
  },
  header_right: {
    flexDirection: 'row',
    ...c_styles.flex_center,
    ...c_styles.pr_3,
  },
  chart: {
    flex: 5,
    borderColor: '#F5F5F5',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    ...c_styles.bg_white,
    ...c_styles.pl_3,
    ...c_styles.pr_3,
  },
  chart_title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...c_styles.pt_5,
    ...c_styles.pb_5,
  },
  chart_title_right: {
    flexDirection: 'row',
  },
  chart_content: {
    // flex: 1,
    height: 200,
    ...c_styles.bg_danger,
  },
  count: {
    height: 70,
    borderColor: '#EFEFEF',
    borderTopWidth: 1,
    ...c_styles.bg_white,
    flexDirection: 'row',
    ...c_styles.pt_2,
    ...c_styles.pb_2,
  },
  count_order: {
    flex: 1,
    ...c_styles.flex_center,
  },
  count_sale: {
    flex: 1,
    ...c_styles.flex_center,
    borderColor: '#EFEFEF',
    borderLeftWidth: 1
  },
  rank: {
    flex: 5,
    ...c_styles.mt_3,
    ...c_styles.bg_white,
    ...c_styles.pl_3,
    ...c_styles.pr_3,
  },
  rank_title: {
    ...c_styles.pt_4,
    ...c_styles.pb_4,
  },
  rank_content: {
    flex: 1,
  }
});
