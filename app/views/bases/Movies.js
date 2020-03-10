import React,{Component} from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';
const REQUEST_URL = "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";
export default class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,  //这里放你自己定义的state变量及初始值
    };
    this.fetchData = this.fetchData.bind(this);
  }
  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
        this.setState({
          movies: responseData.movies,
        });
      });
  }
  componentDidMount() {
    this.fetchData();
  }
  render() {
    if (!this.state.movies) {
      return this.renderLoadingView();
    }
    const movie = this.state.movies[0];
    return this.renderMovie(movie);
  }
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          正在加载电影数据……
        </Text>
      </View>
    );
  }
  renderMovie(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  thumbnail: {
    width: 53,
    height: 81
  }
});
