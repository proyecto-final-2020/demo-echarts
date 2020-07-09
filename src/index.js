import { times, map } from 'lodash';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/legend';

import { getNextDates, generateRandomData } from './random_data';

var myChart = echarts.init(document.getElementById('root'));

const xData = getNextDates(4000);
const y1 = generateRandomData(xData);
const y2 = generateRandomData(xData);
const MEASUREMENTS_COUNT = 4;
const datas = times(MEASUREMENTS_COUNT, i => ({ name: `Medicion ${i + 1}`, data: generateRandomData(xData) }));

const legendNames = map(datas, 'name');

const getSerieFromData = ({ name, data }) => ({
  name,
  data,
  type: 'line',
  smooth: true,
  symbol: 'none',
  sampling: 'average',
  itemStyle: {
    color: '#'+Math.random().toString(16).substr(-6)
  }
});

const series = map(datas, getSerieFromData);

const option = {
  tooltip: {
    trigger: 'axis',
    position: function (pt) {
      return [pt[0], '10%'];
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
  xAxis:
  {
    type: 'category',
    boundaryGap: false,
    data: xData
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
