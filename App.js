import React, {Component} from 'react';
import {Text, View,StyleSheet} from 'react-native';
import Bananas from './app/views/Bananas';
import Blink from './app/views/Blink';
import Color from './app/views/Color';
import TextInANest from './app/views/TextInANest';
import FixedDimensionsBasics from './app/views/FixedDimensionsBasics';
import FlexExm from './app/views/FlexExm';
import PizzaTranslator from './app/views/PizzaTranslator';
import ButtonPress from './app/views/ButtonPress';
import Touchables from './app/views/Touchables';

export default class HelloWorldApp extends Component {
  render() {
    return (
      <View style={styles.box}>
        {/*<Blink/>*/}
        {/*<Color/>*/}
        {/*<TextInANest/>*/}
        {/*<FixedDimensionsBasics/>*/}
        {/*<FlexExm/>*/}
        {/*<PizzaTranslator/>*/}
        {/*<ButtonPress/>*/}
        <Touchables/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  box:{
    flex:1,
    flexDirection: 'row'
  }
});
