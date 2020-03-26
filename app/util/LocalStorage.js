import AsyncStorage from '@react-native-community/async-storage';
export class LocalStorage {
  /**
   * 新增键值对
   * @param key:string  键
   * @param value:string 值
   */
  static async set(key,value){
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 查询需要的值
   * @param key: string 需要查询的key
   */
  static async get(key){
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return  value;
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 更新
   * @param key: string 需要修改的键
   * @param value: string 需要修改的值
   */
  static async update(key, value) {
    try {
      await AsyncStorage.setItem(key,value);
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 删除
   * @param key
   * @returns {*}
   */
  static async delete(key) {
    try {
      await AsyncStorage.removeItem(key)
    } catch (e) {
      console.log(e);
    }
  }

  /**
  * 清除所有Storage
  */
  static async clear() {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log(e);
    }
  }
}
