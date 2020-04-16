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
  img:  require('../assets/images/秀智1.jpg'),
};
export class Constant {
  // 首页导航菜单
  static MENU_LIST = [
    {
      title: '超市入口',
      color: '#629E92',
      router: 'MarketScreen'
    },
    {
      title: '餐饮入口',
      color: '#E9B24D',
      router: 'RepastScreen'
    },
    {
      title: '入库管理',
      color: '#5DA1FF',
      router: 'MarketStoreScreen'
    },
    {
      title: '查看报表',
      color: '#AF93C4',
      router: 'ChartScreen'
    }
  ]
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
<script>
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('main'));
  // 指定图表的配置项和数据
  var option = {
    grid: {
      top: '11%',
      left: '1%',
      right: '4%',
      bottom: '8%',
      containLabel: true,
    },
    tooltip: {
      show: true,
      backgroundColor: '#FFFFFF',
      textStyle: {
        color: '#6A6A6A'
      },
      formatter: '{b}:00<br />{a}:{c}'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18','20','22'],
      axisLabel: {
        // margin: 30,
        color: '#575757'
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#DDEAE7'
        }
      },
    },
    yAxis: [{
      type: 'value',
      position: 'left',
      axisLabel: {
        color: '#575757'
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#DDEAE7'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#fff',
          width: 2
        }
      }
    }],
    series: [
      {
        name: '销售金额：',
        type: 'line',
        smooth: true, //是否平滑曲线显示
        showAllSymbol: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          color: "#609E91", // 线条颜色
        },
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#434343',
          }
        },
        itemStyle: {
          color: "#468F80",
          borderColor: "#468F80",
          borderWidth: 3
        },
        areaStyle: {
          normal: {
            color: '#DFF5E2',
          }
        },
        data: [393, 438, 485, 631, 689, 824, 987, 1000, 1100, 1200,800,600]
      }]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
</script>
</body>
</html>
`;
