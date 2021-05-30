const Mock = require('mockjs');
const PIC = require('../pages/camera/images/demo.png')


// 今日设备报警排行
Mock.mock(/\/api\/car\/carList/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    { id: 1, type: '类型名称', total: 3 },
    { id: 2, type: '类型名称', total: 3 },
    { id: 3, type: '类型名称', total: 3 },
    { id: 4, type: '类型名称', total: 3 },
    { id: 5, type: '类型名称', total: 3 },
    { id: 6, type: '类型名称', total: 3 },
    { id: 7, type: '类型名称', total: 3 },
    { id: 8, type: '类型名称', total: 3 },
    { id: 9, type: '类型名称', total: 3 },
    { id: 10, type: '类型名称', total: 3 },
    { id: 11, type: '类型名称', total: 3 },
    { id: 12, type: '类型名称', total: 3 },
    { id: 13, type: '类型名称', total: 3 },
  ]
});

// 监控覆盖统计
Mock.mock(/\/api\/car\/statistic/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    total: 60,
    online: 50,
    offline: 10,
    percent: 60,
  }
});

// 监控覆盖统计
Mock.mock(/\/api\/car\/supervision/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    percent: 60,
    list: [
      {
        name: '使用指数', value: 60
      },
      {
        name: '安全指数', value: 6
      },
      {
        name: '建设规范指数', value: 90
      },
      {
        name: '管理指数', value: 70
      },
    ]
  }
});

// 监控覆盖统计
Mock.mock(/\/api\/car\/attendance/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    {
      name: '出场车次', value: 60
    },
    {
      name: '合格车次', value: 46
    },
    {
      name: '不合格车次', value: 90
    },
  ]
});

// 车辆违规趋势
Mock.mock(/\/api\/car\/breakRaw/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    { total: 100, value: 60, time: '6:00' },
    { total: 70, value: 30, time: '8:00' },
    { total: 30, value: 10, time: '10:00' },
    { total: 50, value: 30, time: '12:00' },
    { total: 98, value: 23, time: '14:00' },
    { total: 85, value: 43, time: '16:00' },
    { total: 87, value: 54, time: '18:00' },
  ]
});

// 车辆违规趋势
Mock.mock(/\/api\/car\/deviceMonitor/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    total: 47,
    online: 24,
    offline: 23,
    percent: '32%'
  }
});

// 污染日历
Mock.mock(/\/api\/car\/calendar/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    { date: 1 },
    { date: 2 },
    { date: 3 },
    { date: 4 },
    { date: 5 },
    { date: 6 },
    { date: 7 },
    { date: 8 },
    { date: 9 },
    { date: 10 },
    { date: 11 },
    { date: 12 },
    { date: 13 },
    { date: 14, value: 100 },
    { date: 15 },
    { date: 16 },
    { date: 17 },
    { date: 18 },
    { date: 19, value: 280 },
    { date: 20 },
    { date: 21 },
    { date: 22 },
    { date: 23 },
    { date: 24 },
    { date: 25 },
    { date: 26 },
    { date: 27 },
    { date: 28 },
    { date: 29 },
    { date: 30 },
    { date: 31 },
  ]
});