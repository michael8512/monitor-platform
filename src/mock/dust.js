
const Mock = require('mockjs');

// 视频监控汇总
Mock.mock(/\/api\/dust\/weather/, 'get', {
  status: "success",
  message: "成功!",
  code: 0,
  status: 200,
  data: [
    { 
      id: 0,
      name: 'PM2.5',
      value: 40,
      unit: 'ug/m³'
    },
    { 
      id: 2,
      name: 'PM10',
      value: 43,
      unit: 'ug/m³'
    },
    { 
      id: 3,
      name: '空气质量',
      value: '优',
      unit: ''
    },
    { 
      id: 4,
      name: '温度',
      value: 25,
      unit: '℃'
    },
    { 
      id: 5,
      name: '空气质量',
      value: '优',
      unit: ''
    },
    { 
      id: 6,
      name: '温度',
      value: 25,
      unit: '℃'
    },
    { 
      id: 7,
      name: 'AQI指数',
      value: '',
      unit: ''
    },
  ]
});
// 视频监控汇总
Mock.mock(/\/api\/dust\/overTimes/, 'get', {
  status: "success",
  message: "成功!",
  code: 0,
  status: 200,
  data: [
    { 
      id: 0,
      name: '今日',
      value: 45,
      type: 'day'
    },
    { 
      id: 2,
      name: '本周',
      value: 50,
      type: 'week'
    },
    { 
      id: 3,
      name: '本月',
      value: 65,
      type: 'month'
    },
  ]
});

// 设备状态统计
Mock.mock(/\/api\/dust\/statics/, 'get', {
  status: "success",
  message: "成功!",
  code: 0,
  status: 200,
  data: {
    total: 67,
    online: 22,
    offline: 3,
    percent: '65%',
  }
});


// 设备分布情况
Mock.mock(/\/api\/camera\/distribution/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    { name: '辖区一', total: 60 },
    { name: '辖区二', total: 78 },
    { name: '辖区三', total: 24 },
    { name: '辖区四', total: 65 },
    { name: '辖区五', total: 45 },
    { name: '辖区六', total: 85 },
  ]
});

// 项目列表
Mock.mock(/\/api\/dust\/tableTop/, 'get', {
  status: "success",
  message: "成功!",
  code: 0,
  status: 200,
  data: {
    header: [
      { title: '所属项目', id: 1 },
      { title: '设备名称', id: 2 },
      { title: 'PM2.5', id: 3 },
      { title: 'PM10', id: 4 },
    ],
    value: [
      { name: '智慧工地', type: '类型', value: 12,PM10: 23,id: 1 },
      { name: '智慧工地', type: '类型', value: 12,PM10: 23,id: 2 },
      { name: '智慧工地', type: '类型', value: 12,PM10: 23,id: 3 },
      { name: '智慧工地', type: '类型', value: 12,PM10: 23,id: 4 },
      { name: '智慧工地', type: '类型', value: 12,PM10: 23,id: 5 },
    ]
  }
});

// s实时检测
Mock.mock(/\/api\/dust\/monitor/, 'get', {
  status: "success",
  message: "成功!",
  code: 0,
  status: 200,
  data: [
    { date: '1', value: 40 },
    { date: '2', value: 60 },
    { date: '3', value: 22 },
    { date: '4', value: 85 },
    { date: '5', value: 50 },
    { date: '6', value: 40 },
    { date: '7', value: 40 },
    { date: '8', value: 60 },
    { date: '9', value: 22 },
    { date: '10', value: 85 },
    { date: '11', value: 50 },
    { date: '12', value: 40 },
  ]
});

// 项目列表
Mock.mock(/\/api\/dust\/table/, 'get', {
  status: "success",
  message: "成功!",
  code: 0,
  status: 200,
  data: {
    header: [
      { title: '项目名称', id: 1 },
      { title: '项目类型', id: 2 },
      { title: '超标次数', id: 3 },
    ],
    value: [
      { name: '智慧工地', type: '类型', value: 12, id: 1 },
      { name: '智慧工地', type: '类型', value: 12, id: 2 },
      { name: '智慧工地', type: '类型', value: 12, id: 3 },
      { name: '智慧工地', type: '类型', value: 12, id: 4 },
      { name: '智慧工地', type: '类型', value: 12, id: 5 },
    ]
  }
});
