const Mock = require('mockjs');
const PIC = require('../pages/camera/images/demo.png')

// 监控覆盖统计
Mock.mock(/\/api\/education\/statistic/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    percent: 60,
    total: 67,
    arrived: 50,
    offline: 10,
  }
});


// 监控覆盖统计
Mock.mock(/\/api\/education\/leaveList/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    { projectName: '项目一', total: 100, finished: 75, unfinished: 25 },
    { projectName: '项目二', total: 64, finished: 55, unfinished: 9 },
  
  ]
});

// 监控覆盖统计
Mock.mock(/\/api\/education\/other/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    personData: {
      vr: 6,
      total: 6,
      attendence: 6,
      off: 6
    },
    safetyData: {
      training: 6,
      total: 7,
    },
    otherData: {
      training: 6,
      other: 8
    }

  }
});