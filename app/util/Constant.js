/**
 * desc：
 * author：DestinyJun
 * date：  2020/3/23 22:33
 */
export const MENU_IMG_LIST = [
  require('../assets/images/超市入口01_1080.png'),
  require('../assets/images/餐饮入口04_1080.png'),
  require('../assets/images/入库管理02_1080.png'),
  require('../assets/images/查看报表03_1080.png'),
];
export const HEADER_IMAGE = {
  img:  require('../assets/images/秀智1.jpg'),
};
export class Constant {
  // 首页导航菜单
  static MENU_LIST = [
    {
      title: '超市入口',
      color: '#629E92',
      router: 'MarketScreen'
    },
    {
      title: '餐饮入口',
      color: '#E9B24D',
      router: 'RepastScreen'
    },
    {
      title: '入库管理',
      color: '#5DA1FF',
      router: 'MarketScreen'
    },
    {
      title: '查看报表',
      color: '#AF93C4',
      router: 'ChartScreen'
    }
  ]
}
