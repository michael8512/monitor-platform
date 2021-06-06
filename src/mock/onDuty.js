
const Mock = require('mockjs');

// 视频监控汇总
Mock.mock(/\/api\/onDuty\/weather/, 'get', {
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
Mock.mock(/\/api\/onDuty\/deviceOverview/, 'get', {
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
Mock.mock(/\/api\/onDuty\/statics/, 'get', {
  status: "success",
  message: "成功!",
  code: 0,
  status: 200,
  data: {
    total: 67,
    online: 22,
    offline: 10,
    percent: '65%',
  }
});


// 项目列表
Mock.mock(/\/api\/onDuty\/dutyRate/, 'get', {
  status: "success",
  message: "成功!",
  code: 0,
  status: 200,
  data: {
    header: [
      { title: '岗位', id: 1 },
      { title: '在岗率', id: 2 },
      { title: '评价在岗时长', id: 3 },
    ],
    value: [
      { name: '岗位名称', type: '80%', value: '8h', id: 1 },
      { name: '岗位名称', type: '80%', value: '8h', id: 2 },
      { name: '岗位名称', type: '80%', value: '8h', id: 3 },
      { name: '岗位名称', type: '80%', value: '8h', id: 4 },
      { name: '岗位名称', type: '80%', value: '8h', id: 5 },
    ]
  }
});

// s实时检测
Mock.mock(/\/api\/onDuty\/message/, 'get', {
  status: "success",
  message: "成功!",
  code: 0,
  status: 200,
  data: [
    { id: 0, date: '11:30', value: '3号卸载平台开始维修' },
    { id: 1, date: '11:30', value: '6号卸载平台暂停使用' },
    { id: 2, date: '11:30', value: '3号卸载平台开始维修' },
    { id: 3, date: '11:30', value: '1号卸载平台出现黑屏问题' },
    { id: 4, date: '11:30', value: '9号卸载平台开始维修' },
    { id: 5, date: '11:30', value: '3号卸载平台开始维修' },
  ]
});

// 项目列表
Mock.mock(/\/api\/onDuty\/table/, 'get', {
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
// 项目列表
Mock.mock(/\/api\/onDuty\/deviceInfo/, 'get', {
  status: "success",
  message: "成功!",
  code: 0,
  status: 200,
  data: [
    { id: 0, key: 'total', value: 19, unit: '台', title: '设备总数' },
    { id: 1, key: 'online', value: 15, unit: '台', title: '在线数量' },
    { id: 2, key: 'offline', value: 10, unit: '台', title: '离线数量' },
    { id: 3, key: 'rate', value: 15, unit: '%', title: '统计在线率' },
  ]
});

// 项目分布
Mock.mock(/\/onDuty\/distribution/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    { type: 1, normal: 23, intelligence: 34 },
    { type: 2, normal: 65, intelligence: 21 },
    { type: 3, normal: 33, intelligence: 21 },
    { type: 4, normal: 54, intelligence: 21 },
    { type: 5, normal: 23, intelligence: 10 },
    { type: 6, normal: 53, intelligence: 12 },
  ]
});
