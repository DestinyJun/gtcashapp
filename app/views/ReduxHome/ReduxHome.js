import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { connect } from "react-redux";
import {ACTION_LIST_GET_LIST} from '../../redux/actionsTypes';
import {requestApi} from '../../service/requestApi';

class ReduxHome extends Component {

  constructor(props) {
    super(props)
  }


  render() {
    const { list } = this.props;

    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => this.props.getList()}>
          <Text>点击发送请求 </Text>
        </TouchableOpacity>
        {
          list.map((item, index) => <Text key={index}>{item.title}</Text>)
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

const mapStateToProps = (state) => {
  const { listReducer } = state;
  return {
    list: listReducer.data
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getList: () => {
      requestApi({
        dispatch,
        type: ACTION_LIST_GET_LIST,
        url: 'http://jsonplaceholder.typicode.com/posts',
        method: 'get',
      })
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxHome);
