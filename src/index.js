import times from 'lodash/times';
import echarts from 'echarts';
import { getNextSeconds, generateRandomData } from './random_data';

const container = document.getElementById('root');
const myChart = echarts.init(container);

const xData = getNextSeconds(4000);
const MEASUREMENTS_COUNT = 4;
const datas = times(MEASUREMENTS_COUNT, i => ({ name: `Medicion ${i + 1}`, data: generateRandomData(xData) }));
const dataset = datas.reduce((acc, { name, data }) => ({ ...acc, [name]: data }), { timestamp: xData });
const legendNames = datas.map(({ name }) => name);

const getSerieFromData = ({ name }) => ({
  name,
  type: 'line',
  smooth: true,
  symbol: 'none',
  sampling: 'average',
  itemStyle: {
    color: '#' + Math.random().toString(16).substr(-6)
  },
  encode: {
    x: 'timestamp',
    y: name
  }
});

const series = datas.map(getSerieFromData);

const option = {
  tooltip: {
    trigger: 'axis',
    position: function (pt) {
      return [pt[0], '10%'];
    },
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    data: legendNames,
    orient: 'vertical',
    left: 'left',
    top: 'middle',
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      restore: {},
      saveAsImage: {}
    }
  },
  dataset: {
    source: dataset,
    dimensions: ['timestamp', ...legendNames]
  },
  xAxis:
  {
    type: 'time',
    boundaryGap: false,
    min: 'dataMin',
    max: 'dataMax'
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%']
  },
  dataZoom: [{
    type: 'inside',
    start: 0,
    end: 10
  }, {
    start: 0,
    end: 10,
    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
    handleSize: '80%',
    handleStyle: {
      color: '#fff',
      shadowBlur: 3,
      shadowColor: 'rgba(0, 0, 0, 0.6)',
      shadowOffsetX: 2,
      shadowOffsetY: 2
    }
  }],
  series
};

// use configuration item and data specified to show chart
myChart.setOption(option);

window.onresize = () => myChart.resize();
