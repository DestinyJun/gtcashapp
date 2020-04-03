export default class Api {
  // 登录
  // static LOGIN_URL = '/user/appLogin';
  static LOGIN_URL = '/user/login';

  // 根据用户名获取店铺
  static SHOP_LIST_URL = '/user/selectmerchatbyuser';

  // 根据商品编号查询商品
  static SEARCH_GOODS_CODE = '/supermarketmanagement/supermarketcashier/goods/select';


  //TODO 餐饮模块
  /**
   * 餐饮收银
   */

   // 第一次进去获取菜单
   static GET_MENU_TYPE = '/cateringmanagement/addgoods/getgoodstype';

   // 查询当前菜单的分类的数据
   static GET_DISHES_LIST = '/cateringcashier/getgoodslist';

   // 查询全部菜品的数据
   static GET_DISHES_ALL_LIST = '/cateringcashier/getallgoodsinfocash';
   // 餐饮付款
   static PAY_MONEY = '//cateringcashier/pay';
}
