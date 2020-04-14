export default class Api {
  /**  **************登陆认证**************   **/
  // static LOGIN_URL = '/user/appLogin';
  static LOGIN_URL = '/user/login';

  // 根据用户名获取店铺
  static SHOP_LIST_URL = '/user/selectmerchatbyuser';

  /**  **************超市收银**************   **/
  // 根据商品编号查询商品
  static SEARCH_GOODS_CODE = '/supermarketmanagement/supermarketcashier/goods/select';

  // 确认支付成功
  static SURE_PAY_SUCCESS = '/supermarketmanagement/supermarketcashier/goods/newPay';

  /**  **************餐饮收银**************   **/
    // 第一次进去获取菜单
  static GET_MENU_TYPE = '/cateringmanagement/addgoods/getgoodstype';

  // 查询当前菜单的分类的数据
  static GET_DISHES_LIST = '/cateringcashier/getgoodslist';

  // 查询全部菜品的数据
  static GET_DISHES_ALL_LIST = '/cateringcashier/getallgoodsinfocash';
  // 餐饮付款
  static PAY_MONEY = '/cateringcashier/pay';

  /**  **************超市入库**************   **/
  // 根据商品码查询入库商品
  static STORE_SEARCH_CODE = '/supermarketmanagement/supermarketstorage';

  // 商品提交入库
  static STORE_GOODS_SUBMIT = '/supermarketmanagement/supermarketstorage/submit';

  // 查询商品分类
  static STORE_GOODS_TYPE = '/supermarketmanagement/supermrketstorage/goodstype/get';

  // 新增无条码商品
  static STORE_ADD_NO_CODE = '/supermarketmanagement/supermarketstorage/private/update';
}
