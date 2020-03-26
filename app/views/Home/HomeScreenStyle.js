/**
 * desc：  HomeScreen的样式
 * author：DestinyJun
 * date：  2020/3/23 9:16
 */
import {Dimensions, StyleSheet} from 'react-native';

export const HomeScreenStyle = StyleSheet.create({
  home: {
    flex: 1,
    overflow: 'hidden'
  },
  home_card: {
    height: Dimensions.get('window').height * 0.16,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  home_card_view: {
    flex: 1,
    height: "100%",
    borderRadius: 10,
    // borderWidth: 1,
    borderColor: '#E7F0EF',
    flexDirection: 'row'
  },
  home_card_view_list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
