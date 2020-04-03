import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icons} from "./Icons";
const PrintTicketUIStyle = StyleSheet.create({
    content:{
        height: '56%',
        backgroundColor: '#fff',
        position: 'relative',
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
        height: '70%',
        width: '100%',
        alignItems: 'center',
        justifyContent:'center'
    },
    amoount_text: {
        fontSize: 20,
        color: '#2E2E2E'
    },
    conten_sure_cllection: {

        height: '16%',
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    sure_collect_btn: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#E8E8E8',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sure_collect_text: {
        color:'#57998B',
        fontSize: 18,

    }
});

export class PrintTicketUI extends Component{
    constructor() {
        super();
    }
    render(){
        return (
            <View style={PrintTicketUIStyle.content}>
                <View style={PrintTicketUIStyle.title}>
                    <TouchableOpacity style={PrintTicketUIStyle.title_icon} onPress={this.props.closeModel}>
                        <Icons iconName={'angle-left'} size={30} color={'black'} />
                    </TouchableOpacity>
                    <Text style={PrintTicketUIStyle.title_text}>收款成功</Text>
                </View>
                <View style={PrintTicketUIStyle.conten_amount}>
                    <Text style={PrintTicketUIStyle.amoount_text}>{this.props.text}</Text>
                </View>
                <View style={PrintTicketUIStyle.conten_sure_cllection} >
                    <TouchableOpacity style={PrintTicketUIStyle.sure_collect_btn}   onPress={this.props.closeModel}>
                        <Text style={PrintTicketUIStyle.sure_collect_text}>关闭</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={PrintTicketUIStyle.sure_collect_btn}  onPress={this.props.printTicket}>
                        <Text style={PrintTicketUIStyle.sure_collect_text}>打印</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
