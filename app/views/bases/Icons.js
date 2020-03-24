/**
 * desc：图标badge组件
 * author：DestinyJun
 * date：  2020/3/22 16:54
 */
import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export class Icons extends Component {
  static defaultProps = {
    name: 'XiaoHong'
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.iconBox,{ width: this.props.size}]}>
        <Icon name={this.props.iconName} color={this.props.color} size={this.props.size}/>
        {/*{this.props.badgeCount > 0 && (
          <View
            style={styles.iconBox_badge}
          >
            <Text style={styles.iconBox_badge_text}>
              {this.props.badgeCount}
            </Text>
          </View>
        )}*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 15,
  },
  iconBox_badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 6,
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBox_badge_text: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold'
  }
});
