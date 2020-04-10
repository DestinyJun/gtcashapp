/**
 * desc：  餐饮收银样式
 * author：moonshine
 * date：  2020/4/1 15:14
 */
import {StyleSheet} from 'react-native';
const style = {
    content: {
      width: '100%', height: '100%'
    },
    content_top: {
       flex: 11,
       flexDirection: 'row'
    },
    // 左边tab
    left_tab: {
      flex: 4,
      backgroundColor: '#F5FCFC',
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 10
    },
    // 选项卡的样式
    selectTab: {
       // width: '100%',
       height: 50,
       // backgroundColor: '#468F80',
       borderRadius: 4,
       alignItems:'center',
       justifyContent: 'center',
       borderWidth: 1,
       borderStyle: 'solid',
       marginBottom: 5
    },
    selectTabText: {
        fontSize: 18
    },
    // 右边的标题
    title: {
        color: '#B2B2B2',
        fontSize: 18,
        marginTop: 4,
        marginLeft: 10,
        marginBottom: 4
    },
    // 右边的列表内容
    right_content: {
        flex: 8,
        backgroundColor: '#F6F6F6',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#F0F1F1'
    },
    modal_contnet: {
        height: '100%',
        position: 'absolute',
        width: '100%',
        // zIndex: 9999
    },
    modal_header: {
      height: 50,
      flexDirection: 'row',
      paddingRight: 25,
      ...c_styles.flex_center,
      borderColor: '#EFEFEF',
      borderBottomWidth: 1
    },
    // 模态框
    modal_mask: {
      flex:1,
      backgroundColor: 'rgba(0,0,0,0.3)',
      // height: '90%',
      justifyContent: 'flex-end',
      bottom: '7%'
    },
    modal_mask_pay: {
      flex:1,
      backgroundColor: 'rgba(0,0,0,0.3)',
      // height: '90%',
      justifyContent: 'flex-end',
      // bottom: '7%'
    },
    buttom_price:{
      flex: 1,
      backgroundColor: '#fff',
      zIndex: 9999
    }
};
export const RepastScreenStyles = StyleSheet.create(style);
