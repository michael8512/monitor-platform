const Mock = require('mockjs');
const PIC = require('../pages/camera/images/demo.png')

// 监控覆盖统计
Mock.mock(/\/api\/model\/monitor/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    total: 60,
    normal: 50,
    alarm: 10,
  }
});

// 监控覆盖统计
Mock.mock(/\/api\/model\/distribution/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    { group: '组织1', value1: 43, value2: 45 },
    { group: '组织2', value1: 54, value2: 74 },
    { group: '组织3', value1: 43, value2: 45 },
    { group: '组织4', value1: 32, value2: 55 },
    { group: '组织5', value1: 21, value2: 45 },
    { group: '组织6', value1: 54, value2: 65 },
  ]
});