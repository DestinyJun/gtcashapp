import React,{Component} from 'react';
import { Alert, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default class WebsocketExm extends Component {
  sendSocket() {
    Alert.alert('OK');
    const ws = new WebSocket('ws://192.168.28.161:2046');
    ws.onopen = () => {
      // connection opened
      if (ws.readyState) {
        ws.send('我爱你'); // send a message
      }
    };
    ws.onmessage = (e) => {
      // a message was received
      console.log(e.data);
    };
    ws.onerror = (e) => {
      // an error occurred
      // console.log(e.message);
    };

    ws.onclose = (e) => {
      // connection closed
      // console.log(e.code, e.reason);
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.sendSocket} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>点击开始</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center'
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white'
  }
});
