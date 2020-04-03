import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {RepastScreenStyles} from "../Home/RepastScreenStyles";
import {Icons} from "./Icons";
import Modal from "react-native-modal";

const CollectionUIStyle = StyleSheet.create({
    content:{
        height: '56%',
        backgroundColor: '#fff'
    },
    title: {
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title_icon: {
        position:'absolute',
        left:'2%'
    },
    title_text: {
        fontSize: 18
    },
    conten_amount: {
        height: '20%',
        width: '100%',
        alignItems: 'center',
        justifyContent:'center'
    },
    amoount_text: {
        color: 'red',
        fontSize: 38,
        marginRight: '4%'
    },
    conten_line: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '2%',
        paddingRight: '2%',
        marginTop:'2%'
    },
    line:{
        width: '40%',
        backgroundColor:'#D3D3D3',
        height: 1,
    },
    conten_pay_type: {
        alignItems: 'center',
        marginTop:'4%',
        justifyContent: 'center',
        height: '36%'
    },
    pay_type_btn: {
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingTop: '3%',
        marginBottom: '3%',
        paddingBottom: '2%',
        borderColor: '#56988B',
        borderStyle: 'solid',
        borderWidth: 1.3,
        borderRadius: 25,
        fontSize: 18
    },
    conten_sure_cllection: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '14%',
        marginTop:'2%',
        backgroundColor: '#468F80'
    },
    sure_collect_text: {
        color:'#fff',
        fontSize: 18
    }
});

export class CollectionUI extends Component{

    constructor() {
        super();
    }

    render(){
        return (
            <View style={CollectionUIStyle.content}>
                <View style={CollectionUIStyle.title}>
                    <TouchableOpacity style={CollectionUIStyle.title_icon} onPress={this.closeModel}>
                        <Icons iconName={'angle-left'} size={30} color={'black'} />
                    </TouchableOpacity>
                    <Text style={CollectionUIStyle.title_text}>结算</Text>
                </View>
                <View style={CollectionUIStyle.conten_amount}>
                    <Text style={CollectionUIStyle.amoount_text}>￥{this.props.amount.toFixed(2)}</Text>
                </View>
                <View style={CollectionUIStyle.conten_line}>
                    <Text style={[CollectionUIStyle.line, {marginRight: '2%'}]} />
                    <Text>支付方式</Text>
                    <Text style={[CollectionUIStyle.line, {marginLeft: '2%'}]} />
                </View>
                <View  style={CollectionUIStyle.conten_pay_type}>
                    {
                        this.props.pay_type.map((v, index) => {
                            return (
                                <TouchableOpacity  onPress={this.props.payTypeClick.bind(this, index)} key={index}>
                                     <Text style={[CollectionUIStyle.pay_type_btn,{backgroundColor: v.bgcolor, color: v.tColor}]}>{v.label}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <TouchableOpacity style={CollectionUIStyle.conten_sure_cllection} onPress={this.props.sureColletion}>
                     <Text style={CollectionUIStyle.sure_collect_text}>{this.props.sure_text}</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
