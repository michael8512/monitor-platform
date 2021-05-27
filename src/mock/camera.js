const Mock = require('mockjs');
const PIC = require('../pages/camera/images/demo.png')
// 视频监控汇总
Mock.mock(/\/api\/camera\/statistic/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    total: 67,
    cover: 22,
    percent: '65%',
  }
});

// 设备状态统计
Mock.mock(/\/api\/camera\/status/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: {
    total: 67,
    cover: 22,
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
Mock.mock(/\/api\/camera\/projectList/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    { name: '智慧工地', total: 60, online: 12, id: 1 },
    { name: '智慧工地', total: 78, online: 12, id: 2 },
    { name: '智慧工地', total: 24, online: 12, id: 3 },
    { name: '智慧工地', total: 65, online: 12, id: 4 },
    { name: '智慧工地', total: 45, online: 12, id: 5 },
  ]
});

// 安全帽预警
Mock.mock(/\/api\/camera\/hatAlarm/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    { date: '5-20', value: 40 },
    { date: '5-21', value: 60 },
    { date: '5-22', value: 22 },
    { date: '5-23', value: 85 },
    { date: '5-24', value: 50 },
    { date: '5-25', value: 40 },
  ]
});

// 安全帽预警
Mock.mock(/\/api\/camera\/processList/, 'get', {
  status: "success",
  message: "成功!",
  code: null,
  success: true,
  data: [
    { id: 1, name: '地基开工', picUrl: PIC },
    { id: 2, name: '地基完工', picUrl: PIC },
    { id: 3, name: '一楼封顶', picUrl: PIC },
  ]
});