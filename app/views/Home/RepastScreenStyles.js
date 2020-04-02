/**
 * desc：  餐饮收银样式
 * author：moonshine
 * date：  2020/4/1 15:14
 */
import {StyleSheet} from 'react-native';
const style = {
    // 左边tab
    leftTab: {
        width: '30%',
        height: '92%',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#F5FCFC'
    },
    // 选项卡的样式
    selectTab: {
       width: '100%',
       height: 60,
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
        fontSize: 16
    },
    // 右边的列表内容
    rightContent: {
        width: '70%',
        right: 0,
        position: 'absolute',
        backgroundColor: '#F6F6F6',
        height: '92%',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#F0F1F1'
    },
    //
    bottom_price: {
        height: '8%',
        width: '100%',
        // position: 'absolute',
        // bottom: 0,
        backgroundColor: '#fff'
    }
};
export const RepastScreenStyles = StyleSheet.create(style);