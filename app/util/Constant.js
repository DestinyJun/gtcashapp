/**
 * desc：
 * author：DestinyJun
 * date：  2020/3/23 22:33
 */
export const MENU_IMG_LIST = [
  require('../assets/images/超市入口01_1080.png'),
  require('../assets/images/餐饮入口04_1080.png'),
  require('../assets/images/入库管理02_1080.png'),
  require('../assets/images/查看报表03_1080.png'),
];
export const HEADER_IMAGE = {
  img: require('../assets/images/秀智1.jpg'),
};
export class Constant {
  // 首页导航菜单
  static MENU_LIST = [
    {
      title: '超市入口',
      color: '#629E92',
      router: 'MarketScreen',
    },
    {
      title: '餐饮入口',
      color: '#E9B24D',
      router: 'RepastScreen',
    },
    {
      title: '入库管理',
      color: '#5DA1FF',
      router: 'MarketStoreScreen',
    },
    {
      title: '查看报表',
      color: '#AF93C4',
      router: 'ChartScreen',
    },
  ];
}
export const HTML = `
<!DOCTYPE html>
<html>
<head>
  <title>echarts</title>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=320, user-scalable=no">
  <script src="https://libs.cdnjs.net/echarts/4.7.0/echarts.min.js"></script>
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
    }
    .line-box{
      width: 100vw;
      height: 100vh;
    }
  </style>
</head>
<body>
<div id="main" class="line-box" ></div>
</body>
</html>
`;
const toString = (obj) => {
  let result = JSON.stringify(obj, function (key, val) {
    // 对function进行特殊处理
    if (typeof val === 'function') {
      return `~ha~${val}~ha~`;
    }
    return val;
  });
  // 再进行还原
  do {
    result = result.replace('\"~ha~', '').replace('~ha~\"', '').replace(/\\n/g, '').replace(/\\\"/g, "\"");//最后一个replace将release模式中莫名生成的\"转换成"
  } while (result.indexOf('~ha~') >= 0);
  return result;
};
export const renderChart = (props,option) => {
  return `
      (function() {
        window.postMessage = function(data) {
          window.ReactNativeWebView.postMessage(data)
        }
        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption(${JSON.stringify(option)});
         setTimeout(() => {
          myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,  // 显示第几个series
            dataIndex: 6, // 显示第几个数据
          });
        },100);
       })();
        window.addEventListener("resize", function () {
          myChart.resize();
         });
    `;
};
